import type { NowState } from "./types";

/**
 * ── THE MOST IMPORTANT FILE ON THE SITE ──────────────────────────────────────
 * This is the part visitors check to see whether anything is still alive here.
 * Edit it often. `updated` drives the "LAST UPDATED" stamp everywhere.
 * Three blocks, two lines each. If it needs more, it belongs in a chapter.
 */
export const now: NowState = {
  updated: "September 2026",
  chapter: "Chapter 07 — still being written",
  question: "What happens when engineering meets financial infrastructure?",

  blocks: [
    {
      label: "Building",
      lines: [
        "LEA — rent guarantee infrastructure for Nairobi landlords",
        "Small fintech experiments that test one assumption each",
      ],
    },
    {
      label: "Learning",
      lines: [
        "Data Science at the University of Nairobi",
        "How underwriting actually prices risk",
      ],
    },
    {
      label: "Exploring",
      lines: [
        "Alternative data — rent, airtime, till receipts",
        "Payment rails and where money quietly gets stuck",
      ],
    },
  ],
};
