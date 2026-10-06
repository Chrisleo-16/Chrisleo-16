import type { Postmortem } from "./types";

/**
 * THINGS THAT DIDN'T WORK.
 *
 * Four of them, on purpose. Each is a place where reality corrected a belief,
 * in three beats: what I assumed, what happened, what changed.
 * If an entry doesn't end in a changed behaviour, it doesn't belong here.
 */
export const postmortems: Postmortem[] = [
  {
    id: "01",
    title: "The callback that arrived twice",
    where: "LEA · M-Pesa reconciliation",
    assumed: "A payment confirmation arrives once, in order, after the push I initiated.",
    happened:
      "Callbacks arrived twice, early, or not at all. A tenant was briefly credited for two months' rent on one transaction.",
    changed:
      "Every payment event is idempotent and keyed on the provider's reference. The ledger is append-only; the balance is derived, never stored.",
  },
  {
    id: "02",
    title: "Rent is not one number",
    where: "LEA · schema",
    assumed: "A tenant pays their rent. One amount, one transaction, one month.",
    happened:
      "People paid in three instalments, from a relative's phone, two days into the next month. My schema had one amount-paid column.",
    changed:
      "I stopped modelling intentions and started modelling events. What a payment means is a question you ask the data, not a field you write to it.",
  },
  {
    id: "03",
    title: "The confident percentage",
    where: "Uhakiki AI",
    assumed: "A credibility score would help reviewers make faster judgements.",
    happened:
      "It replaced their judgement instead. People stopped reading the evidence the moment a number appeared.",
    changed:
      "Evidence leads, the score is secondary or absent. I don't ship a model output that looks more certain than it is.",
  },
  {
    id: "04",
    title: "It worked, and nobody came",
    where: "ComSaP",
    assumed: "A community with a messy group chat wants a structured place to talk.",
    happened:
      "They didn't. Communities don't migrate for a better interface — they migrate for a reason the interface can't supply.",
    changed:
      "Before building, I ask what breaks if this doesn't exist. 'Nothing' is a complete answer and I'm allowed to stop there.",
  },
];
