import type { Chapter } from "./types";

/**
 * The journey. One paragraph per chapter — the question opens it, the turn
 * closes it. If a chapter needs a second paragraph, it's probably a note.
 * Check the `period` years; they're a reconstruction, not a calendar.
 */
export const chapters: Chapter[] = [
  {
    id: "01",
    title: "Learning to Build",
    period: "2022 — 2023",
    question: "Can I make a computer do what I'm imagining?",
    body: [
      "Tutorials, a text editor, and the thrill of a button finally doing something. What stuck wasn't the syntax — it was realising that a system I'd described in my head could exist by the evening.",
    ],
    turn: "I got good enough at building that the hard question stopped being how.",
  },
  {
    id: "02",
    title: "From Code to Problems",
    period: "2023",
    question: "If I can build anything, why is most of what I build useless?",
    body: [
      "I shipped things nobody asked for. Clean architecture, decent interfaces, zero users. The implementation turned out to be the cheap part; knowing which problem is real is the expensive one.",
    ],
    turn: "I stopped starting from a technology and started starting from a friction.",
    related: ["jua-link"],
  },
  {
    id: "03",
    title: "Automating the Boring Things",
    period: "2024",
    question: "How much of what people do by hand is just an unwritten API call?",
    body: [
      "I went looking for repetition: reconciliation spreadsheets, copy-pasting between WhatsApp and a ledger, phone calls to confirm a payment a webhook already knew about. Most of the time the answer wasn't a product. It was a script and a cron job.",
    ],
    turn: "Automation taught me to read a business as a set of handoffs — which is also how you find the ones that leak money.",
    related: ["jua-link", "terramavuno-nielekeze"],
  },
  {
    id: "04",
    title: "Building in the Real World",
    period: "2024 — 2025",
    question: "What does software look like when it has to survive tenants, landlords and month-end?",
    body: [
      "LEA wasn't a project with a demo user. It was a building with real tenants paying real rent. What mattered was what happens when an M-Pesa callback arrives twice, or when the manager decides a phone call is faster.",
    ],
    turn: "Real users are a compiler for your assumptions. Mine did not pass.",
    related: ["lea-residency"],
  },
  {
    id: "05",
    title: "Technology Meets Finance",
    period: "2025",
    question: "Why is the money the hardest part of every system I build?",
    body: [
      "Every project eventually collapsed into a payments problem. Then LEA sharpened it: the landlord's real problem was never a dashboard. It was that rent might not arrive, and nothing in this market absorbs that risk.",
    ],
    turn: "I stopped building tools for a market and started trying to understand the market itself.",
    related: ["lea-residency", "usage-metering"],
  },
  {
    id: "06",
    title: "Learning to Read the Data",
    period: "2025 — 2026",
    question: "What can you know about someone that the formal system never recorded?",
    body: [
      "I kept hitting the ceiling of what intuition could tell me. In a market where most people have no credit file, the signal is elsewhere — rent history, till receipts, airtime — and turning that into an honest decision is the problem I want to be good at.",
    ],
    turn: "Data stopped being a subject and started being an instrument.",
  },
  {
    id: "07",
    title: "What's Next",
    period: "2026 —",
    question: "What happens when engineering meets financial infrastructure?",
    body: [
      "I don't know yet, and that's the actual state of things. The rent guarantee thesis needs real underwriting, not a good story. The data has to say something before the product can.",
    ],
    open: true,
  },
];
