import type { NowState } from "./types";

/**
 * ── THE MOST IMPORTANT FILE ON THE SITE ──────────────────────────────────────
 * This is the part visitors check to see whether anything is still alive here.
 * Edit it often. `updated` drives the "LAST UPDATED" stamp everywhere.
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
        "AI systems that do real work instead of demoing well",
      ],
    },
    {
      label: "Learning",
      lines: [
        "Data Science at the University of Nairobi",
        "How underwriting actually prices risk",
        "Statistics I skipped by being good at code",
      ],
    },
    {
      label: "Exploring",
      lines: [
        "Alternative data — rent, airtime, till receipts, utility history",
        "Payment rails and where money quietly gets stuck",
        "Agentic workflows that survive contact with real users",
      ],
    },
    {
      label: "Thinking about",
      lines: [
        "How software solves problems that don't look like software problems",
        "Why the operations layer is where most products actually fail",
      ],
    },
    {
      label: "Trying to understand",
      lines: [
        "What happens when you put engineering, data, finance and a business in the same room and refuse to pick one.",
      ],
    },
  ],
};
