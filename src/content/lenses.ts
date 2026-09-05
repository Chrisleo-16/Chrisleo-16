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
  | "lea"
  | "broke"
  | "lab"
  | "community"
  | "tools"
  | "why"
  | "writing"
  | "contact";

export const DEFAULT_ORDER: SectionKey[] = [
  "now",
  "journey",
  "builds",
  "lea",
  "broke",
  "lab",
  "community",
  "tools",
  "why",
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
    intro:
      "Then read it as a story. The builds are only evidence — the argument is in the chapters.",
    order: [
      "journey",
      "why",
      "now",
      "lab",
      "writing",
      "builds",
      "lea",
      "broke",
      "community",
      "tools",
      "contact",
    ],
    spotlight: ["journey", "why", "now", "lab", "writing"],
    notes: {
      journey:
        "Start here. Seven chapters, each opening with the question that started it and closing with the thing that changed my mind.",
      lab: "The offcuts. Small questions answered over a weekend and mostly thrown away.",
      writing: "How I think, in about four minutes a piece.",
      builds: "Four systems. Read the question at the top of each and skip the rest if you like.",
    },
  },
  {
    key: "hire",
    label: "Hire",
    full: "Looking to hire",
    intro:
      "Then here are the two strongest, what I build with, and the fastest route to the CV. The rest of the archive stays where it is if you want it.",
    // A short path on purpose: two builds, the toolkit, then straight to the footer.
    focus: ["builds", "tools"],
    maxBuilds: 2,
    spotlight: ["builds", "tools"],
    notes: {
      builds:
        "Two of four. A live property and payments platform that has been running long enough to change shape twice, and a decision system built so that an AI model is never allowed to produce the verdict.",
      tools: "What I actually reach for, and what each set of tools is for.",
    },
    action: { label: "Download CV (PDF)", href: "/files/leo-chrisben-evans-cv.pdf", external: true },
  },
  {
    key: "build",
    label: "Build",
    full: "Want to build together",
    intro:
      "Then skip the history. Here's what's open, what I'm testing, and where I think the interesting problem is.",
    order: [
      "now",
      "lab",
      "lea",
      "builds",
      "writing",
      "why",
      "journey",
      "broke",
      "tools",
      "community",
      "contact",
    ],
    spotlight: ["now", "lab", "lea", "writing", "contact"],
    notes: {
      now: "The live state — what's being built, what I'm reading, and the question I can't put down.",
      lab: "Open questions with cheap answers. Several of these want a second person.",
      lea: "The one I'm actually betting on, including the part of it that isn't built yet.",
      builds: "Four systems, and the single thread running through all of them.",
      contact: "Easiest way in: tell me what you're stuck on.",
    },
  },
  {
    key: "work",
    label: "Work",
    full: "Interested in my work",
    intro: "Then go straight to the builds. Each one is a decision trail, not a screenshot.",
    order: [
      "builds",
      "lea",
      "lab",
      "broke",
      "tools",
      "journey",
      "writing",
      "why",
      "now",
      "community",
      "contact",
    ],
    spotlight: ["builds", "lea", "lab", "broke", "tools"],
    notes: {
      builds:
        "Eight numbered parts each: the question, the idea, the build, the architecture, the hard part, the lesson, where it led, and what you can go and inspect.",
      lea: "The one with the full evolution chain — property management through to a financial question.",
      lab: "Smaller technical experiments, with the outcome stated honestly.",
    },
    action: { label: "GitHub", href: "https://github.com/Chrisleo-16", external: true },
  },
  {
    key: "lea",
    label: "LEA",
    full: "Here for LEA",
    intro:
      "Then the important part isn't what LEA is. It's why it stopped being a property app four times over.",
    order: [
      "lea",
      "builds",
      "broke",
      "now",
      "journey",
      "lab",
      "writing",
      "why",
      "tools",
      "community",
      "contact",
    ],
    spotlight: ["lea", "broke", "now", "journey"],
    notes: {
      lea: "The whole arc: the early idea, what real payment behaviour did to it, the pivot, and the direction I'm investigating now.",
      builds: "LEA in full, plus the three builds it sent me off to make.",
      broke: "The specific failures that moved it — duplicate callbacks, partial rent, the Wi-Fi detour.",
      now: "Where the thesis stands today, and what still has to be proven.",
      journey: "Chapters 04 and 05 are the LEA years.",
    },
  },
];

export const getLens = (key: string | null) =>
  key ? (lenses.find((l) => l.key === key) ?? null) : null;
