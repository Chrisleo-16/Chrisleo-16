import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./_prompt";

/**
 * "Ask the archive" — a Vercel function that holds the Anthropic key so the
 * browser never sees it. Stateless: conversation history comes in with each
 * request and lives in the visitor's sessionStorage, nowhere else.
 *
 * Context comes from three places, in order of trust:
 *   1. the curated prompt in `_prompt.ts` (the truth, written in his voice)
 *   2. a live list of public repos from the GitHub API (cached for an hour)
 *   3. web search, restricted to his GitHub and this site, as a last resort
 */

export const maxDuration = 30;

const MODEL = "claude-opus-5-5";
const GITHUB_USER = "Chrisleo-16";
const SITE = "leochrisbenevans.vercel.app";
const REPO_TTL_MS = 60 * 60 * 1000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

let repoCache: { at: number; text: string } | null = null;

/** Public repos by last push. Empty string if GitHub is unreachable. */
async function githubContext(): Promise<string> {
  if (repoCache && Date.now() - repoCache.at < REPO_TTL_MS) return repoCache.text;
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "chrisben-archive",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=20&type=owner`,
      { headers, signal: AbortSignal.timeout(4000) },
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const repos = (await res.json()) as Repo[];
    const text = repos
      .filter((r) => !r.fork)
      .map(
        (r) =>
          `- ${r.name}${r.language ? ` (${r.language})` : ""}${r.archived ? " [archived]" : ""}: ` +
          `${r.description ?? "no description"} · last push ${r.pushed_at.slice(0, 10)} · ${r.html_url}`,
      )
      .join("\n");
    repoCache = { at: Date.now(), text };
    return text;
  } catch (e) {
    console.error("GitHub fetch failed:", e instanceof Error ? e.message : e);
    return repoCache?.text ?? "";
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json().catch(() => null)) as { messages?: unknown } | null;
    const incoming = body?.messages;
    if (!Array.isArray(incoming)) return json({ error: "messages must be an array" }, 400);

    // Only the last few turns are needed, and it keeps the prompt cheap.
    const messages: Anthropic.Beta.BetaMessageParam[] = incoming
      .slice(-10)
      .map((m: { role?: unknown; content?: unknown }) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: String(m.content ?? "").slice(0, 2000),
      }))
      .filter((m) => m.content.length > 0);

    // The API requires the conversation to open with a user turn.
    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length) return json({ error: "nothing to answer" }, 400);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");
    const client = new Anthropic({ apiKey });
    const repos = await githubContext();

    const system: Anthropic.Beta.BetaTextBlockParam[] = [
      // Stable prefix first so it caches; the live repo list goes after the breakpoint.
      { type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } },
      {
        type: "text",
        text:
          "LIVE CONTEXT\n" +
          (repos
            ? `His public GitHub repos (github.com/${GITHUB_USER}), newest push first:\n${repos}\n\n`
            : "(GitHub could not be reached right now; rely on the archive above.)\n\n") +
          `You also have a web_search tool limited to github.com and ${SITE}. Use it only when the ` +
          "question is about something neither the archive nor the repo list covers, and at most " +
          "twice. Never search for anything else, and never answer about a different person with " +
          "a similar name. When search finds nothing relevant, say the archive doesn't cover it.",
      },
    ];

    let response: Anthropic.Beta.BetaMessage | undefined;
    // Server-side search can hand control back mid-turn; resume a couple of times at most.
    for (let turn = 0; turn < 3; turn++) {
      response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 1024,
        // Chat replies are short; low effort keeps the panel snappy.
        output_config: { effort: "low" },
        // If a safety classifier declines, the API re-runs on a fallback model.
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system,
        tools: [
          {
            type: "web_search_20260209",
            name: "web_search",
            max_uses: 2,
            allowed_domains: ["github.com", SITE],
          },
        ],
        messages,
      });
      if (response.stop_reason !== "pause_turn") break;
      messages.push({ role: "assistant", content: response.content });
    }
    if (!response) throw new Error("No response from Claude");

    if (response.stop_reason === "refusal") {
      return json({
        reply: "That one's outside what the archive will talk about. Ask me about the builds instead.",
      });
    }

    const reply = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    if (!reply) throw new Error("Empty reply from Claude");

    return json({ reply });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) {
      return json({ error: "Too many questions at once. Give it a second." }, 429);
    }
    if (e instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth error — check ANTHROPIC_API_KEY:", e.message);
      return json({ error: "The archive's key is not accepted." }, 500);
    }
    if (e instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", e.status, e.message);
      return json({ error: "The archive is offline." }, 502);
    }
    console.error("Archive error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
}
