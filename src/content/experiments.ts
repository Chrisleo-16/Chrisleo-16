import type { Experiment } from "./types";

/**
 * DRAFT — THE LAB.
 *
 * The bar here is deliberately low: an experiment only has to have been a real
 * question. Most of these should not become products, and saying so is the point.
 * Newest first. Keep the IDs monotonic — the counter on the site reads this file.
 */
export const experiments: Experiment[] = [
  {
    id: "023",
    question: "Can rent history alone predict whether next month's rent arrives on time?",
    note: "Twelve months of anonymised LEA payment events, a logistic baseline, no other features. It beats a coin flip and nothing else. Useful mostly as proof that I need more than one signal — which is the actual finding.",
    outcome: "running",
    date: "2026-08",
    tags: ["alt-data", "python", "underwriting"],
  },
  {
    id: "022",
    question: "What happens if an n8n workflow becomes an agent instead of a flowchart?",
    note: "Rebuilt a fixed six-step ops workflow as a tool-calling loop. It handled the edge cases the flowchart couldn't and invented two failure modes the flowchart never had. Kept the tools, threw away the autonomy.",
    outcome: "inconclusive",
    date: "2026-07",
    tags: ["agents", "n8n", "automation"],
  },
  {
    id: "021",
    question: "Can a till receipt tell you more about a small business than its bank statement?",
    note: "Parsed a month of M-Pesa till confirmations into a daily revenue series. The shape of a week is extremely legible — Fridays, month-end, school terms. Formal statements flatten all of that out.",
    outcome: "shipped",
    date: "2026-06",
    tags: ["alt-data", "payments", "python"],
  },
  {
    id: "020",
    question: "How cheap can a meeting-to-actions pipeline actually get?",
    note: "Upload, transcribe, diarise, summarise, extract commitments. Works. The transcription cost per hour is the whole business model, and at Kenyan price points it doesn't close yet.",
    outcome: "abandoned",
    date: "2026-04",
    tags: ["ai", "transcription", "pipelines"],
  },
  {
    id: "019",
    question: "Is vector search worth it for a corpus of 400 documents?",
    note: "Stood up Milvus, embedded everything, built the retrieval layer. Then tested it against Postgres full-text search. At this size, full-text won on latency and lost almost nothing on relevance. Deleted the cluster.",
    outcome: "abandoned",
    date: "2026-03",
    tags: ["vector-db", "milvus", "retrieval"],
  },
  {
    id: "018",
    question: "Can a QR code replace the registration desk at a campus event?",
    note: "Built for a Chiromo Tech Club event. It worked at the desk and failed in the queue — nobody has signal in the corridor. Now caches locally and syncs after.",
    outcome: "shipped",
    date: "2026-02",
    tags: ["events", "offline-first", "community"],
  },
  {
    id: "017",
    question: "Can I automate the thing I do every Sunday night?",
    note: "A scheduled job that pulls the week's payment events, diffs them against expected rent and posts a single summary. Ninety minutes of work replaced by a message. The prototype for how I now think about all internal tooling.",
    outcome: "shipped",
    date: "2026-01",
    tags: ["automation", "ops", "cron"],
  },
  {
    id: "016",
    question: "Does an SMS fallback actually change collection rates?",
    note: "Africa's Talking behind the reminder system, for tenants who never open the app. Too small a sample to claim a number, but the qualitative answer is yes — the channel matters more than the message.",
    outcome: "inconclusive",
    date: "2025-11",
    tags: ["sms", "africas-talking", "payments"],
  },
  {
    id: "015",
    question: "What does a payment look like if you draw every state it can be in?",
    note: "Not code. A wall of paper. Pending, pushed, timed-out, partial, duplicated, reversed, orphaned, reconciled. Nineteen states. This drawing is why the LEA ledger got rewritten.",
    outcome: "shipped",
    date: "2025-09",
    tags: ["payments", "modelling", "paper"],
  },
];

export const experimentCount = experiments.length;
export const latestExperiment = experiments[0];
