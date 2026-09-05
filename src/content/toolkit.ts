import type { ToolGroup } from "./types";

/**
 * THE TOOLS I USE TO THINK.
 *
 * Grouped by what they let me think about, not by "frontend / backend".
 * No logos, no proficiency bars — the technologies support the story, they
 * are not the story.
 */
export const toolkit: ToolGroup[] = [
  {
    key: "build",
    label: "Build",
    purpose: "Turning an idea into something a person can actually use this week.",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python", "Flask", "Tailwind", "Kotlin"],
  },
  {
    key: "data",
    label: "Data",
    purpose: "Asking a question precisely enough that the answer can disagree with me.",
    items: ["Python", "pandas", "SQL", "PostgreSQL", "MySQL", "MongoDB", "Statistics", "REST APIs"],
  },
  {
    key: "intelligence",
    label: "Intelligence",
    purpose: "Getting a model to do real work, and knowing when it shouldn't be trusted with it.",
    items: ["Claude API", "LLM workflows", "Agents & tool use", "Transcription", "Computer vision", "Milvus", "n8n"],
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    purpose: "The unglamorous layer where money moves and things are supposed to stay up.",
    items: ["Supabase", "M-Pesa Daraja", "PayHero", "Africa's Talking", "Vercel", "Netlify", "PythonAnywhere", "Auth & RLS"],
  },
  {
    key: "explore",
    label: "Explore",
    purpose: "The subjects I keep reading about even when no project requires it.",
    items: ["Fintech", "Underwriting", "Alternative data", "Markets", "Real estate", "Product design", "Entrepreneurship"],
  },
];
