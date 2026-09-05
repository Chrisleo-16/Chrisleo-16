import type { Chapter } from "./types";

/**
 * DRAFT — these chapters are written from your projects and your brief.
 * The shape is right; the voice should be yours. Check the `period` years
 * especially — they're my best reconstruction, not your calendar.
 */
export const chapters: Chapter[] = [
  {
    id: "01",
    title: "Learning to Build",
    period: "2022 — 2023",
    question: "Can I make a computer do what I'm imagining?",
    body: [
      "I started the way most people start: tutorials, a text editor, and the specific thrill of a button finally doing something. For a while the reward loop was purely mechanical — it works, therefore I understand it.",
      "What actually stuck wasn't the syntax. It was realising that a system I described in my head could exist by the evening. That's a strange amount of leverage to hand a nineteen-year-old.",
    ],
    turn: "I got good enough at building that the hard question stopped being how.",
  },
  {
    id: "02",
    title: "From Code to Problems",
    period: "2023",
    question: "If I can build anything, why is most of what I build useless?",
    body: [
      "I shipped things nobody asked for. Clean architecture, decent interfaces, zero users. It took a few of those before the pattern got embarrassing enough to look at directly.",
      "The thing I'd been treating as the interesting part — the implementation — turned out to be the cheap part. The expensive part is knowing which problem is real. Nobody teaches that, and it isn't in the docs.",
    ],
    turn: "I stopped starting from a technology and started starting from a friction.",
    related: ["jua-link"],
  },
  {
    id: "03",
    title: "Automating the Boring Things",
    period: "2024",
    question: "How much of what people do by hand is actually just an unwritten API call?",
    body: [
      "This is when I went looking for repetition. Reconciliation spreadsheets. Copy-pasting between a WhatsApp group and a ledger book. Someone phoning someone to confirm a payment that a webhook already knew about.",
      "APIs, workflow automation, LLM pipelines, transcription, integrations — I treated them all as one question: where is a human being used as glue? Most of the time the answer wasn't a product. It was a script and a cron job.",
    ],
    turn: "Automation taught me to read a business as a set of handoffs, which is also how you find the ones that leak money.",
    related: ["jua-link", "terramavuno-nielekeze"],
  },
  {
    id: "04",
    title: "Building in the Real World",
    period: "2024 — 2025",
    question: "What does software look like when it has to survive tenants, landlords and month-end?",
    body: [
      "LEA broke the pattern. It wasn't a project with a demo user — it was a residential building with actual people in it, paying actual rent, complaining about actual water pressure.",
      "Suddenly the interface was the least interesting part. What mattered was what happens when an M-Pesa callback arrives twice, when a tenant pays the right amount from the wrong number, when a property manager decides the system is slower than a phone call and just goes back to the phone call.",
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
      "Every project I'd touched had eventually collapsed into a payments problem. Property. Chamas. Retail. VPN plans. It stopped looking like a coincidence and started looking like the actual subject.",
      "Then LEA gave me the sharper version of it. The landlord's real problem was never a dashboard. It was that rent might not arrive, and there is no instrument in this market that absorbs that risk. That's not a software gap. That's a financial infrastructure gap that happens to need software.",
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
      "I'm studying Data Science at the University of Nairobi, mostly because I kept hitting the ceiling of what intuition could tell me. I could describe a pattern. I couldn't say how confident I was in it.",
      "The part I care about is alternative data. In a market where most people have no credit file, the signal is somewhere else entirely — rent history, till receipts, airtime, utility payments, the boring exhaust of ordinary life. Turning that into a decision, honestly and without pretending to more certainty than you have, is the problem I want to be good at.",
    ],
    turn: "Data stopped being a subject and started being an instrument.",
  },
  {
    id: "07",
    title: "What's Next",
    period: "2026 —",
    question: "What happens when engineering meets financial infrastructure?",
    body: [
      "I don't know yet. That's not modesty, it's the actual state of things.",
      "What I can see from here: the rent guarantee thesis needs real underwriting, not a good story. The data has to say something before the product can. And I'd like to keep the habit of building the thing that answers the question rather than the thing that looks like an answer.",
    ],
    open: true,
  },
];
