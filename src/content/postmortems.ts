import type { Postmortem } from "./types";

/**
 * DRAFT — THINGS THAT DIDN'T WORK.
 *
 * Not self-deprecation. Each entry is a place where reality corrected a belief,
 * written in the same four beats: where, what I assumed, what happened, what changed.
 * If an entry doesn't end in a changed behaviour, it doesn't belong here.
 */
export const postmortems: Postmortem[] = [
  {
    id: "01",
    title: "The callback that arrived twice",
    where: "LEA · M-Pesa reconciliation",
    assumed: "A payment confirmation arrives once, in order, after the push I initiated.",
    happened:
      "Callbacks arrived twice, arrived before the confirmation, or never arrived and had to be recovered by polling. A tenant was briefly credited for paying rent two months running on the same transaction.",
    changed:
      "Every payment event is now idempotent and keyed on the provider's own reference. The ledger is append-only and the balance is derived, never stored.",
  },
  {
    id: "02",
    title: "Rent is not one number",
    where: "LEA · schema",
    assumed: "A tenant pays their rent. One amount, one transaction, one month.",
    happened:
      "People paid in three instalments. From a relative's phone. Two days into the next month. My schema had a single amount-paid column and no honest way to represent any of it.",
    changed:
      "I stopped modelling intentions and started modelling events. What a payment means is now a question you ask the data, not a field you write to it.",
  },
  {
    id: "03",
    title: "Wi-Fi as a revenue line",
    where: "LEA · product",
    assumed:
      "Since we already handled rent payments, selling building Wi-Fi through the same rails was an obvious adjacent product.",
    happened:
      "It was an operations business wearing a software costume — hardware, uptime, angry people at 9pm. It also competed for attention with the thing that actually mattered.",
    changed:
      "Cut it. I now ask what an idea costs in attention, not just in engineering, and adjacency is not a reason on its own.",
  },
  {
    id: "04",
    title: "Row-level security learned the hard way",
    where: "LEA · Supabase auth",
    assumed: "Filtering by tenant ID in the query is the same thing as securing the row.",
    happened:
      "It absolutely is not. A client-side filter is a suggestion. Found on a staging build before it mattered, which is the only reason this entry is calm.",
    changed:
      "Policies live in the database now. I write the RLS policy before the query, and I test the negative case first.",
  },
  {
    id: "05",
    title: "The confident percentage",
    where: "Uhakiki AI",
    assumed: "A credibility score would help reviewers make faster judgements.",
    happened:
      "It replaced their judgement instead. In testing, people stopped reading the highlighted evidence the moment a number appeared — including on a passage I had written myself, which it flagged.",
    changed:
      "Evidence leads, the score is secondary or absent. I don't ship a model output that looks more certain than it is.",
  },
  {
    id: "06",
    title: "It worked, and nobody came",
    where: "ComSaP",
    assumed: "A community with a messy group chat wants a structured place to talk.",
    happened:
      "They didn't. The product worked exactly as designed. Communities don't migrate for a better interface — they migrate for a reason the interface can't supply, and I didn't have one.",
    changed:
      "Before building, I ask what breaks if this doesn't exist. 'Nothing' is a complete answer and I'm allowed to stop there.",
  },
  {
    id: "07",
    title: "Expiry is a property of a batch",
    where: "PharmX",
    assumed: "Each product has an expiry date.",
    happened:
      "Each delivery has its own expiry date. Two boxes of the same drug expire months apart. The alerts were confidently wrong for weeks and the pharmacist stopped trusting them.",
    changed:
      "I spend time watching the work before designing the schema. Most of my worst modelling errors were visible from behind the counter.",
  },
  {
    id: "08",
    title: "Reminders as a free channel",
    where: "Chama Cloud",
    assumed: "More reminders, more contributions.",
    happened: "Daily reminders got muted inside a week, which silently disabled the feature for everyone.",
    changed:
      "Notifications are a budget you spend, not a channel you own. Fewer, timed to when someone can actually act.",
  },
];
