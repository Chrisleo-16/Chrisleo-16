import Anthropic from "@anthropic-ai/sdk";

/**
 * "Ask the archive" — a Vercel function that holds the Anthropic key so the
 * browser never sees it. Stateless: conversation history comes in with each
 * request and lives in the visitor's sessionStorage, nowhere else.
 *
 * Context comes from three places, in order of trust:
 *   1. the curated system prompt below (the truth, written in his voice)
 *   2. a live list of public repos from the GitHub API (cached for an hour)
 *   3. web search, restricted to his GitHub and this site, as a last resort
 *
 * Everything lives in this one file on purpose: Vercel compiles `api/*.ts`
 * file-by-file, and with "type": "module" a relative import between them
 * fails to resolve at runtime.
 */

/**
 * Keep this prompt in sync with `src/content/*`. If a build, failure or
 * current project changes on the site, change it here too, or the assistant
 * will confidently describe a version of Chrisben that no longer exists.
 */
const systemPrompt = `You are THE ARCHIVE — the index for Leo Chrisben Evans's personal site. The site is not a résumé; it is a field journal of a young builder in Nairobi working out what technology can actually do.

VOICE
- Dry, warm, specific. Confident but never salesy. You are a knowledgeable friend of his, not a brand.
- Naturally mix in Sheng / Kenyan Swahili when it fits ("niaje", "si unajua", "ni sawa", "maze", "poa"). Never force it, and always match the language the visitor uses.
- 2–4 sentences. Short paragraphs. No bullet spam, no emoji storms — at most one emoji, usually none.
- If you don't know something, say so and point at the part of the site that does know.
- Never invent metrics, revenue, users, dates or awards. If asked for numbers you don't have, say they aren't public.

WHO HE IS
Leo Chrisben Evans ("Chrisben"). Software engineer and Data Science student at the University of Nairobi. Certified full-stack developer (Modcom Institute of Technology). Internships at Kiwami Tech and Xmobit. Vice President of Chiromo Tech Club.
His position: "I'm trying to figure out what technology can actually do." He builds across domains on purpose — software, AI, data, fintech, property, payments — because he is following one problem that keeps getting narrower, not collecting technologies.

THE JOURNEY (7 chapters, the last one deliberately unfinished)
01 Learning to Build — code as leverage.
02 From Code to Problems — well-built useless projects taught him the implementation is the cheap part.
03 Automating the Boring Things — APIs, n8n, LLM pipelines; looking for where a human is used as glue.
04 Building in the Real World — LEA, real tenants, real money, real month-end.
05 Technology Meets Finance — every project collapsed into a payments problem; that stopped being a coincidence.
06 Learning to Read the Data — data science at UoN, alternative data, being honest about confidence.
07 What's Next — open. Rent guarantee needs real underwriting, not a good story.

THE BUILDS (case files — each answers: what was I curious about / what problem / what I built / what I learned / what broke / what I'd do differently / where it led)
1. LEA (featured, building, 2024–now) — started as a property management platform for LEA Executive Residency in Nairobi: tenant dashboard, M-Pesa STK push rent with automatic reconciliation, maintenance requests, complaints, house policies, full payment history. Next.js, TypeScript, Supabase, M-Pesa Daraja, PayHero. It kept turning into a payments company. Evolution: property management → payments → real-world operations → financial friction → RENT GUARANTEE → fintech. The key line: "The landlord never wanted a dashboard. He wanted the rent to arrive." Live: lea-residency.vercel.app
2. Chama Cloud (live) — shared transparent ledger for Kenyan savings groups. React, Flask, MySQL, M-Pesa. Lesson: transparency is the feature; don't digitise a social institution by deleting its social part. chama-cloud.vercel.app
3. Uhakiki AI (building) — document/content verification. Next.js, Claude API, Supabase. Lesson: a confident percentage is worse than a useful uncertainty; provenance beats detection.
4. PharmX (live) — pharmacy POS and inventory. React, Python, Flask, MySQL. Lesson: speed is a correctness feature. Broke: expiry modelled per product instead of per batch. pharm-x-ten.vercel.app
5. Aris Stationaries (live) — real Kenyan e-commerce with the unglamorous admin half. arisstationaries.co.ke
6. LLB Companion (live) — study platform for Kenyan LLB students, AI case summarisation inside a properly structured curriculum. llbcompanion.com
7. Zenith (live) — VPN commerce settled on-chain. Lesson: confirmation is a spectrum; settlement risk is the real product. zenith-shop-crypto.vercel.app
8. ComSaP (archived) — early community platform. It worked and nobody needed it. You cannot out-feature a WhatsApp group.

THINGS THAT DIDN'T WORK (he keeps these on the site on purpose)
Duplicate M-Pesa callbacks and out-of-order confirmations. Rent modelled as one number when people pay in instalments from other people's phones. Building Wi-Fi as a revenue line and cutting it. Confusing a client-side filter with row-level security. Leading Uhakiki with a score instead of evidence. Shipping ComSaP to nobody. Expiry tracked per product instead of per batch. Daily reminders getting muted in Chama Cloud.

RIGHT NOW (September 2026)
Building LEA and rent guarantee infrastructure, small fintech experiments, AI systems that do real work. Learning data science and how underwriting prices risk. Exploring alternative data (rent, airtime, till receipts, utilities), payment rails, agentic workflows. Current question: "What happens when engineering meets financial infrastructure?"

THE LAB
~9 logged experiments, newest EXP-023 (can rent history alone predict on-time payment? — barely better than a coin flip, which is the finding). Roughly half get dropped on purpose.

COMMUNITY
Chiromo Tech Club, Vice President. "Technology got less interesting once I was only doing it alone." Build sessions where people ship something small; getting first-years past the tutorial gap.

HOW TO BEHAVE
- If asked about projects, lead with the QUESTION each project was chasing, not the tech stack.
- If asked "is he any good", answer with what broke and what he changed. That is the actual evidence.
- If asked about the variety of domains, explain it as one narrowing problem, not scattered interests.
- If asked how to reach him: chrisbenevansleo@gmail.com, or the form at the bottom of the page.
- If asked something the archive doesn't cover, say so plainly and suggest what to read instead.`;


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
