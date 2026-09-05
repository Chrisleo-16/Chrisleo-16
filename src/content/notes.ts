import type { Note } from "./types";

/**
 * DRAFT — NOTES FROM BUILDING.
 *
 * Not a blog. Short pieces that make how I think legible. Write them after
 * something breaks, not when there's nothing to say.
 *
 * Body formatting: prefix a line with "> " for a pull quote and "## " for a
 * sub-heading. Everything else is a paragraph.
 */
export const notes: Note[] = [
  {
    slug: "apis-are-not-features",
    title: "Why I stopped thinking of APIs as features",
    date: "2026-08-19",
    reading: "4 min",
    tags: ["payments", "systems", "modelling"],
    standfirst:
      "For two years I treated an integration as a box to tick. Then a payment provider taught me that an API is a description of somebody else's reality, and mine had to bend around it.",
    body: [
      "The first time I integrated M-Pesa I wrote it on a Tuesday and called it done. Push a request, get a callback, mark the invoice paid. Three functions. It was on the roadmap as one line: *M-Pesa integration*.",
      "That line was wrong in a way that took a year to fully see.",
      "> An API is not a feature you add. It is a second system with its own opinions, its own idea of time, and its own failure modes — and you have just agreed to live with all of them.",
      "## What a callback actually is",
      "A callback is not an event. It's a claim about an event, made by a system you don't control, over a network that will occasionally deliver it twice, out of order, or not at all. The moment I wrote it down that way, my code looked obviously wrong. I had been treating a claim as a fact.",
      "The fix wasn't clever. Make every payment event idempotent, key it on the provider's own reference, never destroy anything, and derive the balance instead of storing it. All of that is boring. All of it is the actual product.",
      "## The part that changed how I plan",
      "Now, when someone says 'we'll just integrate X', I hear a question instead of a task: what does X believe about the world, and what happens when it's wrong? Sometimes the answer is small. With money, it never is.",
      "It also changed how I read other people's systems. Most of the complexity in a mature payments codebase isn't complexity — it's scar tissue. Somebody met reality there.",
    ],
  },

  {
    slug: "payments-taught-me-more-than-tutorials",
    title: "Payments taught me more than any tutorial did",
    date: "2026-07-02",
    reading: "5 min",
    tags: ["payments", "learning", "fintech"],
    standfirst:
      "Tutorials give you a problem that has already been solved. Money gives you a problem that is still happening, to someone, right now.",
    body: [
      "The gap between a tutorial project and a real one isn't difficulty. It's consequence. Nothing in a tutorial is *someone's rent*.",
      "When I was learning, I did what everyone does — built the clone, followed the course, felt competent. The competence was real but it was shallow, because every problem I'd solved had been pre-shaped to have a solution. Reality doesn't pre-shape anything.",
      "## Money makes the edge cases mandatory",
      "You can ship a social app with a broken edge case and most people will never find it. You cannot ship a payment system that loses one transaction in three hundred. That single constraint drags in everything else: idempotency, auditability, reconciliation, partial states, and the discipline to build the failure path before the happy path.",
      "> Payments are the fastest way I know to find out whether you actually understand the system you built, because the feedback is immediate, specific and someone is upset.",
      "## It also teaches you the business",
      "The second thing payments gave me was commercial literacy I couldn't have got from a course. Settlement timing changes what a business can afford to do. Fees change what's worth selling. When a landlord tells you rent is 'usually fine, just late', that sentence contains an entire financial product.",
      "I don't think I chose fintech. I think I kept following the hardest part of every project I built, and it kept being the money.",
    ],
  },

  {
    slug: "operational-problems-in-software-clothing",
    title: "Some software problems are operational problems wearing a costume",
    date: "2026-05-28",
    reading: "4 min",
    tags: ["product", "operations", "lea"],
    standfirst:
      "The property manager didn't need a better dashboard. She needed the thing to take less than the forty seconds a phone call takes.",
    body: [
      "The most useful hour I spent on LEA involved no code. I sat and watched how the building was actually run.",
      "What I saw was not a technology gap. It was a chain of handoffs held together by one person's memory. Rent arrives as a text. Someone reads it, matches a name, writes it down. A tenant complains in a group. Someone remembers to tell someone. It worked — and it worked entirely because of that person.",
      "## Software can only replace a handoff it understands",
      "My first version replaced the screens, not the handoffs. It was faster in theory and slower in practice, because the manager had to translate between how she worked and how the app thought she should. Given the choice between the two, she picked the phone. Correctly.",
      "> If your system is slower than the workaround, it does not exist. Features don't fix that. Fewer steps do.",
      "## How I test an idea now",
      "I try to describe the operation as it exists — every handoff, every person, every point where information gets copied by hand. Then I ask which single handoff, if it disappeared, would change the day. That's usually the product. Everything else is a screen.",
      "The uncomfortable version of this: a lot of what looks like a software opportunity is really a badly run process, and the honest answer is a spreadsheet and a different Tuesday.",
    ],
  },

  {
    slug: "what-data-science-changed",
    title: "I'm studying data science. Here's what I already see differently.",
    date: "2026-04-11",
    reading: "4 min",
    tags: ["data", "learning", "alt-data"],
    standfirst:
      "I could always spot a pattern. What I couldn't do was say how much I should believe it.",
    body: [
      "I came to data science from the wrong direction — not from statistics, but from having built enough systems to be suspicious of my own conclusions. I'd look at a chart of payments and *know* what it meant. I was often right. I had no idea how often.",
      "## Confidence is the actual subject",
      "The thing I underestimated is that most of the discipline isn't about finding signal. It's about being honest regarding how much signal you have. An engineer's instinct is to ship the model; the statistical instinct is to ask what would have to be true for this to be noise.",
      "That reframing has been worth more to me than any technique. It's the same muscle as writing a postmortem: separating what happened from what I assumed.",
      "> Anyone can produce a number. The skill is knowing what the number is allowed to be used for.",
      "## Why alternative data",
      "Kenya is a good place to be interested in this. Most people here have no formal credit file, so by the standards of a traditional system they are invisible. They are not invisible — they pay rent, buy airtime, run a till, settle a utility bill. The record exists; it just isn't in the place the system looks.",
      "Turning that into a decision is where it gets serious. Alternative data is also how you build a system that quietly discriminates, if you're careless with it. I'd rather learn the statistics properly than find that out later, from someone it happened to.",
    ],
  },

  {
    slug: "why-i-keep-changing-what-im-building",
    title: "Why I keep changing what I'm building",
    date: "2026-02-20",
    reading: "3 min",
    tags: ["direction", "career", "thinking"],
    standfirst:
      "From outside, it reads as a lack of focus. From inside, it's the same question getting narrower every time.",
    body: [
      "Property management. Payments. Savings groups. AI verification. Rent guarantee. Written as a list, it looks scattered. I understand why people read it that way.",
      "But I didn't choose those. Each one handed me the next. The property platform surfaced a payments problem. The payments problem surfaced a timing problem. The timing problem turned out to be a risk problem, and risk is a data problem, which is why I'm now sitting in a statistics lecture.",
      "> I'm not collecting domains. I'm following one problem that keeps getting more specific.",
      "## The cost of admitting this",
      "There's a version of a portfolio where I'd hide all of it — present a straight line, call myself a fintech engineer, delete the parts that didn't survive. It would look more focused. It would also be a worse description of how I actually work, and it would make the next change look like failure instead of the method.",
      "So the changes are on the site on purpose. If you want to know whether I can hold a direction, the honest evidence isn't that I've never changed one. It's that every change has a reason attached, and the reasons keep pointing the same way.",
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
