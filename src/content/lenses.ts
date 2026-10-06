/**
 * ── VIEW THROUGH A LENS ──────────────────────────────────────────────────────
 *
 * One piece of navigation, not a personalisation engine. Choosing a lens does
 * not build a different site: it reorders the same sections, marks the ones
 * that answer your question, and swaps a few section notes.
 *
 * Two shapes are available:
 *   `order` — reorder everything. Nothing is lost; anything a lens forgets to
 *             mention is appended in its default position.
 *   `focus` — render ONLY these sections. A deliberate short path, for a reader
 *             who has just told us they don't want the whole archive.
 *
 * To add a lens: add an entry here. Nothing else needs to change.
 */

export type SectionKey =
  | "now"
  | "journey"
  | "builds"
  | "broke"
  | "lab"
  | "tools"
  | "writing"
  | "contact";

export const DEFAULT_ORDER: SectionKey[] = [
  "now",
  "journey",
  "builds",
  "broke",
  "lab",
  "tools",
  "writing",
  "contact",
];

export interface Lens {
  key: string;
  /** Shown in the bar. One word. */
  label: string;
  /** The question it answers, in the visitor's words. */
  full: string;
  /** A single sentence of orientation. Never a greeting. */
  intro: string;
  /** Reorder the archive. Missing sections are appended, never dropped. */
  order?: SectionKey[];
  /** Render only these, in this order. Overrides `order`. */
  focus?: SectionKey[];
  /** Cap the builds section — a short path shows only the strongest. */
  maxBuilds?: number;
  /** Sections that answer this question directly — marked, not isolated. */
  spotlight: SectionKey[];
  /** Section notes rewritten for this reader. */
  notes?: Partial<Record<SectionKey, string>>;
  /** One contextual link, where there is genuinely a useful one. */
  action?: { label: string; href: string; external?: boolean };
}

export const lenses: Lens[] = [
  {
    key: "curious",
    label: "Curious",
    full: "Just curious",
    intro: "Then read it as a story. The builds are only evidence — the argument is in the chapters.",
    order: ["journey", "now", "lab", "writing", "builds", "broke", "tools", "contact"],
    spotlight: ["journey", "now", "lab", "writing"],
    notes: {
      journey: "Start here. Each chapter opens with a question and closes with what changed my mind.",
      lab: "Small questions answered over a weekend and mostly thrown away.",
      builds: "Four systems. Read the question at the top of each and skip the rest if you like.",
    },
  },
  {
    key: "hire",
    label: "Hire",
    full: "Looking to hire",
    intro: "Then here are the two strongest builds, what I build with, and the CV.",
    // A short path on purpose: two builds, the toolkit, then straight to the footer.
    focus: ["builds", "tools"],
    maxBuilds: 2,
    spotlight: ["builds", "tools"],
    notes: {
      builds:
        "Two of four. A live property and payments platform, and a decision system where the AI model is never allowed to produce the verdict.",
      tools: "What I actually reach for, and what each set is for.",
    },
    action: { label: "Download CV (PDF)", href: "/files/leo-chrisben-evans-cv.pdf", external: true },
  },
  {
    key: "build",
    label: "Build",
    full: "Want to build together",
    intro: "Then skip the history. Here's what's open and what I'm testing.",
    order: ["now", "lab", "builds", "writing", "journey", "broke", "tools", "contact"],
    spotlight: ["now", "lab", "builds", "contact"],
    notes: {
      now: "What's being built, and the question I can't put down.",
      lab: "Open questions with cheap answers. Several of these want a second person.",
      contact: "Easiest way in: tell me what you're stuck on.",
    },
  },
  {
    key: "work",
    label: "Work",
    full: "Interested in my work",
    intro: "Then go straight to the builds. Each one is a decision trail, not a screenshot.",
    order: ["builds", "lab", "broke", "tools", "journey", "writing", "now", "contact"],
    spotlight: ["builds", "lab", "broke", "tools"],
    notes: {
      builds: "Each opens with the question that caused it. The full case file is one click in.",
      lab: "Smaller technical experiments, with the outcome stated honestly.",
    },
    action: { label: "GitHub", href: "https://github.com/Chrisleo-16", external: true },
  },
];

export const getLens = (key: string | null) =>
  key ? (lenses.find((l) => l.key === key) ?? null) : null;
