/**
 * The archive's schema.
 *
 * Every visible word on this site comes from `src/content/*`. Components render
 * structure; these files hold the story. Adding a build, an experiment or a note
 * means adding an object here — nothing else.
 */

export type Link = { label: string; href: string };

/** A chapter of the journey. Chapters can be left deliberately unfinished. */
export interface Chapter {
  id: string;           // "01"
  title: string;
  period: string;       // "2023 — 2024"
  /** The question that opened this chapter. */
  question: string;
  body: string[];       // paragraphs
  /** What changed by the end of it — the hinge into the next chapter. */
  turn?: string;
  open?: boolean;       // renders as still being written
  related?: string[];   // build slugs
}

/**
 * Conceptual filters. Deliberately not frameworks — the question is what kind
 * of problem a build is, not which library it imports.
 */
export type Theme = "ai" | "data" | "infrastructure" | "fintech" | "real-world" | "experiments";

/**
 * What a visitor can actually go and check, as opposed to what I claim.
 * `running` means there is a URL. `verified` means there are tests you can run.
 * `partial` is for things I haven't finished documenting, and saying so is the point.
 */
export type EvidenceKind = "running" | "built" | "documented" | "verified" | "partial";

export interface Evidence {
  kind: EvidenceKind;
  /** One short line — what specifically you can inspect. */
  note: string;
  href?: string;
}

export type BuildState = "live" | "building" | "prototype" | "scaffold";

/** A step in a vertical flow diagram. */
export interface FlowStep {
  label: string;
  note?: string;
}

/** A case file. Not a project card — evidence of how a problem was thought about. */
export interface CaseFile {
  slug: string;
  index: string;        // "01" — position in the story, not the calendar
  name: string;
  /** Second name, where the repo and the product disagree. */
  aka?: string;
  period: string;
  state: BuildState;
  themes: Theme[];
  /** Technology is supporting information. It goes at the bottom, small. */
  stack: string[];
  links: { source: string; live?: string; docs?: string };
  evidence: Evidence[];
  /** Two or three facts revealed on hover. Keep it to metadata. */
  hover: { k: string; v: string }[];
  /** Visual character. Same design system, different texture. */
  accent: "ledger" | "map" | "meter" | "signal";
  featured?: boolean;

  // ── The front page row ──
  /** One line, under twenty words. What it is and who it's for. */
  tagline: string;

  // ── The card ──
  /** One sentence. The problem or curiosity that caused this to exist. */
  question: string;
  /** What the system actually is. */
  built: string;
  /** One lesson, derived from this build and not transferable boilerplate. */
  taught: string;

  // ── The case file ──
  /** 02 — what I first thought would solve it. */
  idea: string;
  /** 04 — architecture and the decisions worth defending. */
  hood: {
    intro: string;
    flow?: FlowStep[];
    flowCaption?: string;
    decisions: { title: string; body: string }[];
  };
  /** 05 — what was genuinely difficult. */
  hardPart: string;
  /** 06 — paragraphs. */
  learned: string[];
  /** 07 — where it led. */
  ledTo: string;

  /** Cross-links to the other case files, with the idea that connects them. */
  connects?: { slug: string; via: string }[];

  /** LEA only, for now: the visible record of changing direction. */
  evolution?: {
    chain: FlowStep[];
    stages: { label: string; body: string }[];
  };
}

export type ExperimentOutcome = "shipped" | "abandoned" | "running" | "inconclusive";

/** Something small. A weekend, an API, a question that didn't need a product. */
export interface Experiment {
  id: string;           // "017"
  question: string;     // the whole point of the entry
  note: string;         // what actually happened, 1–3 sentences
  outcome: ExperimentOutcome;
  date: string;         // "2026-04"
  tags: string[];
  link?: string;
}

/** A wrong turn, written down on purpose. */
export interface Postmortem {
  id: string;
  title: string;
  where: string;        // which build it happened in
  assumed: string;      // What I assumed
  happened: string;     // What actually happened
  changed: string;      // What changed
}

/** Notes from building. Short, specific, opinionated. */
export interface Note {
  slug: string;
  title: string;
  date: string;         // "2026-06-14"
  reading: string;      // "4 min"
  standfirst: string;
  /**
   * Paragraphs. Prefix a line with "> " for a pull quote and "## " for a
   * sub-heading. Everything else renders as body copy.
   */
  body: string[];
  tags: string[];
}

/** Tools grouped by what they let me think about, not by category. */
export interface ToolGroup {
  key: string;
  label: string;
  purpose: string;
  items: string[];
}

/** The live status block. This is the part of the site meant to change often. */
export interface NowState {
  updated: string;        // "September 2026"
  chapter: string;
  question: string;
  blocks: { label: string; lines: string[] }[];
}
