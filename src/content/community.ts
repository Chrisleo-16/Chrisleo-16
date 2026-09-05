import type { CommunityEntry } from "./types";

/**
 * DRAFT — fill in the real numbers and events. The framing is the point:
 * building systems → building products → building communities.
 */
export const community: CommunityEntry = {
  org: "Chiromo Tech Club",
  role: "Vice President",
  period: "2025 — now",
  premise: "Technology got less interesting once I was only doing it alone.",
  body: [
    "For a long time the loop was: notice a problem, disappear, build something, show a screenshot. It worked, and it was narrow. Everything I learned had to be learned by me, in order, at my own speed.",
    "Chiromo Tech Club broke that. Running a club is not a technical problem — it's attendance, momentum, people who are brilliant and busy, and the fact that nobody owes you their Saturday. You cannot solve it by shipping. You solve it by making a room worth walking into.",
    "It also gave me the fastest feedback I've ever had on my own thinking. Explaining why a payment reconciles the way it does to somebody who has never touched an API forces you to find out whether you actually understand it.",
  ],
  doing: [
    "Running build sessions where people ship something small rather than watch a talk",
    "Getting first-years past the gap between a tutorial and a real project",
    "Bringing what I break in production back to the room as material",
    "Organising events — which is where the QR registration experiment came from",
  ],
};
