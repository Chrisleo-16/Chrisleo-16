import type { CaseFile } from "./types";

/**
 * Four builds, written from the repositories rather than from memory.
 *
 * Every technical claim below was checked against the source: the file it lives
 * in, the migration that creates it, the test that asserts it. Where a repo says
 * a thing is unfinished, this says so too — see the `evidence` array on each
 * entry, which is the difference between what I claim and what you can inspect.
 *
 * Ordered by the story, not by date: the one that keeps changing, the one with
 * the strongest single idea, the infrastructure underneath both, and the small
 * honest one. Change `index` and the array order together.
 */

export const builds: CaseFile[] = [
  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "lea-residency",
    index: "01",
    name: "LEA Residency",
    period: "2024 — now",
    state: "live",
    themes: ["real-world", "fintech", "infrastructure", "data"],
    accent: "ledger",
    featured: true,
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL / RLS",
      "M-Pesa STK Push",
      "PayHero PesaLink",
      "Africa's Talking",
      "Sentry",
      "PWA",
    ],
    links: {
      source: "https://github.com/Chrisleo-16/LEA-Residency",
      live: "https://lea-residency.vercel.app/",
    },
    evidence: [
      { kind: "running", note: "Deployed and reachable", href: "https://lea-residency.vercel.app/" },
      { kind: "built", note: "37 migrations, ~60 API routes, 7 engine modules" },
      { kind: "documented", note: "System overview, production readme, payment spec" },
      { kind: "partial", note: "The rent-guarantee direction is a question, not a shipped feature" },
    ],
    hover: [
      { k: "Type", v: "Real-world platform" },
      { k: "For", v: "One building + open listings" },
      { k: "Status", v: "Live, still changing" },
    ],

    tagline:
      "Property and M-Pesa rent platform running a real Nairobi building, plus a listings marketplace for other landlords.",
    question:
      "Why does a building still run on phone calls, a WhatsApp group and a hardcover ledger — and what happens to software once you actually put it inside one?",
    built:
      "A property platform for one Nairobi residency that doubles as a listings marketplace for other landlords. M-Pesa rent with automatic reconciliation, maintenance with a status trail, tenant chat, and an offline queue so a payment survives a dead network.",
    taught:
      "The interface was never the product; the operations were. Every genuinely hard problem in LEA turned out to be about money arriving, or not arriving, and who is accountable for the difference.",

    idea:
      "A tenant portal. Screens to replace the group chat — pay here, complain here, read the house rules here. I thought the work was the interface, and that once the screens existed the building would use them.",

    hood: {
      intro:
        "Next.js app router in front of Supabase, with row-level security doing the access control rather than query filters. The part worth pointing at isn't the framework — it's that the business rules were pulled out of the routes into seven engine modules (M-Pesa, financial, KRA tax, USSD, voice, OTP, offline queue), so the same rule can be reached from a web form, a webhook, a USSD session or a cron job.",
      flow: [
        { label: "Tenant pays", note: "STK push, or straight to the paybill." },
        { label: "Webhook arrives", note: "Possibly twice. Possibly before the confirmation." },
        { label: "Reconcile against the ledger", note: "Match to the tenant record, not the phone number." },
        { label: "Offline queue", note: "Network gone? Persist to IndexedDB, retry with backoff." },
        { label: "Ledger, statement, KRA export", note: "Everything downstream is derived, never re-entered." },
      ],
      flowCaption: "Read downwards. Each step exists because the one above it can fail.",
      decisions: [
        {
          title: "Idempotent webhooks, exponential backoff",
          body: "Payment confirmations are treated as claims about an event, not the event itself. Handlers are safe to run twice, failed sends go to an IndexedDB queue and retry on a 2^n schedule up to five attempts, and every transaction leaves an audit row. That is written into the production readme as a design principle rather than discovered afterwards.",
        },
        {
          title: "Engines, not route handlers",
          body: "Around 2,800 lines of rules live in seven engine modules; the API routes parse and delegate. It is the only reason a USSD session and a browser can produce the same ledger entry.",
        },
        {
          title: "The marketplace is reverse-matched",
          body: "Instead of letting every landlord contact a house-hunting tenant, the tenant broadcasts budget, area and move-in date; landlords with a matching vacancy get a notification and pitch in-app; the tenant gets one curated SMS digest a night from a cron job. The constraint being designed around is the tenant's attention, not the landlord's reach.",
        },
      ],
    },

    hardPart:
      "Reconciliation. A tenant pays in three instalments, from a relative's phone, two days into the next month, and the provider's callback arrives twice. None of that is an edge case here; it is the normal case. Making every operation safe to retry, and making the ledger a derived truth rather than a column somebody writes to, took longer than every screen in the product combined.",

    learned: [
      "That the phone call is the competition. A property manager will use the system only while it is faster than picking one up, which turns interface work into a latency problem rather than a features problem.",
      "That idempotency is a decision you make before the first webhook, not a patch you apply after the first double-credit.",
    ],

    ledTo:
      "Two places. The metering engine, because pricing consumption properly turned out to be its own discipline. And an open question I have not answered: the landlord's real anxiety was never collection, it was timing — rent that arrives late, with nobody carrying the gap. Whether the interesting product is the software or the financial instrument underneath it is genuinely still undecided.",

    connects: [
      { slug: "usage-metering", via: "Rent is metering with a different unit. The Wi-Fi line came first." },
      { slug: "jua-link", via: "Both reach people over SMS and USSD, because the browser isn't where they are." },
      { slug: "terramavuno-nielekeze", via: "Audit trails and provenance: being able to say where a number came from." },
    ],

    evolution: {
      chain: [
        { label: "Property management", note: "Make the building legible." },
        { label: "Payments", note: "M-Pesa in, reconciled against the ledger." },
        { label: "Tenant experience", note: "Chat, complaints, policies, a status trail." },
        { label: "Operational friction", note: "Month-end, partial payments, a dead network." },
        { label: "Financial problems", note: "The rent is late. Who carries that?" },
        { label: "New questions", note: "Still open — see below." },
      ],
      stages: [
        {
          label: "Early idea",
          body: "Replace the WhatsApp group with screens. A tenant portal for one building, with rent payment attached to it.",
        },
        {
          label: "What I discovered",
          body: "Real payment behaviour has nothing to do with the form on the screen. People pay in instalments, from other people's numbers, late. Callbacks arrive twice or not at all. And the manager's benchmark for the entire system is a forty-second phone call.",
        },
        {
          label: "Pivot",
          body: "The ledger became the product and the screens became a view of it. Then the scope widened outward — a listings marketplace and reverse matchmaking — because one building is a customer, not a business.",
        },
        {
          label: "Current direction",
          body: "Investigating whether the useful thing is the platform or the financial layer under it: rent guarantee, and the underwriting it would need. This is a question I am working on, not a product I have shipped. None of it is built.",
        },
      ],
    },
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "terramavuno-nielekeze",
    index: "02",
    name: "Nielekeze",
    aka: "TerraMavuno",
    period: "2026",
    state: "prototype",
    themes: ["ai", "data", "real-world", "experiments"],
    accent: "map",
    stack: [
      "TypeScript",
      "Node / Express",
      "CesiumJS",
      "Claude (Messages API)",
      "ElevenLabs",
      "Supabase + PostGIS",
      "Zod",
      "Vitest",
      "Africa's Talking",
    ],
    links: {
      source: "https://github.com/Chrisleo-16/terramavuno-jice",
      docs: "https://github.com/Chrisleo-16/terramavuno-jice/tree/main/docs",
    },
    evidence: [
      { kind: "built", note: "Monorepo: globe app, API service, shared engine package" },
      { kind: "verified", note: "88 tests, clean typecheck, a data validator that fails the build" },
      { kind: "documented", note: "Seven docs — PRD, architecture, provenance, data sources, runbook" },
      { kind: "partial", note: "Runs locally. No hosted demo — instead it boots with zero API keys" },
    ],
    hover: [
      { k: "Type", v: "Decision system" },
      { k: "Verdict", v: "Never from the model" },
      { k: "Runs", v: "With zero API keys" },
    ],

    tagline:
      "AI decision-support for Kenyan farmers on a 3D globe. A deterministic engine decides; Claude only explains. 88 tests.",
    question:
      "Can an AI system help someone navigate a real government programme without ever being allowed to invent the answer?",
    built:
      "A geospatial decision-support system. A Kenyan smallholder asks — by text or voice, in English or Kiswahili — whether they qualify for subsidised fertiliser. A deterministic engine decides; Claude only explains the decision it was handed, citing the evidence behind every fact.",
    taught:
      "The most important feature of an intelligent system is knowing when it doesn't know — and having somewhere structural to put that, rather than a hedge in the prose.",

    idea:
      "Put a chat panel on a map. That is the obvious build, and it is wrong in a specific way: it makes the model the authority. Whatever it says becomes the answer, and a farmer acts on it by spending a day travelling to a depot. The interesting version is the one where the model is deliberately not allowed to decide.",

    hood: {
      intro:
        "The whole architecture exists to keep one boundary sharp: the engine decides, the model explains. Eligibility is computed by a pure, unit-tested TypeScript function — no I/O, no clock read inside, the current time passed in as an argument — so identical inputs produce a deep-equal decision, and a test asserts exactly that. Claude requests the evaluation as a tool call and receives the verdict back as a tool result it must restate, not reinterpret.",
      flow: [
        { label: "Farmer", note: "Types or speaks, English or Kiswahili." },
        { label: "Chat or voice", note: "Two front doors." },
        { label: "One tool registry", note: "Eight tools, defined once, adapted to both providers." },
        { label: "Data provider", note: "Supabase + PostGIS, 1.5s timeout, then a bundled snapshot." },
        { label: "Deterministic engine", note: "A pure function — the only route to a verdict." },
        { label: "Decision", note: "Conclusion, per-criterion trace, citations — or cannot-determine." },
        { label: "Explanation + evidence", note: "The model restates it. Every fact carries a chip." },
      ],
      flowCaption:
        "The model sits above the engine, never inside it. It can ask for a verdict; it cannot produce one.",
      decisions: [
        {
          title: "The engine decides, the model explains",
          body: "Eligibility is a pure function over five criteria — register membership, ID linkage, the five-acre cap, ward participation, and depot stock. Allocation is arithmetic, tagged as calculated rather than presented as gazetted fact. Claude is downstream of all of it.",
        },
        {
          title: "Cannot-determine is a first-class outcome",
          body: "Decision precedence runs: any unknown eligibility input returns cannot-determine; any failed criterion returns a confirmed negative, because a confirmed 'no' is still confirmed; and unverified depot stock returns 'indicated by published rules' with an honest-uncertainty sentence attached. That sentence is asserted character-for-character by a test, so it cannot quietly drift.",
        },
        {
          title: "It degrades rather than fails",
          body: "With zero API keys the globe, the evidence layers and the entire eligibility journey still run on bundled data. If the database is unreachable the provider times out at 1.5 seconds and serves a snapshot, flagging the response as bundled. If the model is down, the result card still renders. Nothing returns a 500.",
        },
      ],
    },

    hardPart:
      "Resisting the shape everyone expects. A demo where the AI confidently answers is more impressive for four seconds and worse forever, and every instinct pulls towards it. The tightest technical constraint was subtler: in an agentic tool-use loop every tool call must be answered, including the ones that only affect the browser, because an unanswered tool-use block deadlocks the model. So UI actions are acknowledged server-side with a synthetic result while the real work happens on the client.",

    learned: [
      "That 'who decides' and 'who explains' are different jobs, and that most AI products fail by handing both to the model. Once the boundary is architectural, honesty stops being a prompt-engineering problem.",
      "That uncertainty needs somewhere to live in the type system, not just in the wording. Because the decision type has a cannot-determine case, every consumer — the card, the model, the tests — is forced to handle it.",
    ],

    ledTo:
      "A permanent suspicion of any AI feature that hides its uncertainty — it is now the first thing I look for in anything I build with a model in it. It also gave me the pattern I keep reusing: put the rule somewhere pure and testable, and let everything else be a view of it.",

    connects: [
      {
        slug: "usage-metering",
        via: "Both refuse to guess: one returns cannot-determine, the other returns the original stored response.",
      },
      {
        slug: "jua-link",
        via: "One registry, one vocabulary. The same instinct about where meaning is allowed to live.",
      },
      {
        slug: "lea-residency",
        via: "Evidence and audit: being able to say where a number came from, and when.",
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "usage-metering",
    index: "03",
    name: "Usage Metering & Billing",
    period: "2026",
    state: "building",
    themes: ["infrastructure", "fintech", "data"],
    accent: "meter",
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Stripe (test mode)",
      "Pydantic",
      "Docker Compose",
    ],
    links: {
      source: "https://github.com/Chrisleo-16/usage-metering-and-wifi-billing-capstone",
    },
    evidence: [
      { kind: "built", note: "Working FastAPI service — five routes, two migrations, seed script" },
      { kind: "documented", note: "A design doc specifying the data model, the rules and the layer split" },
      { kind: "partial", note: "The README still carries TODOs and the evidence file has a placeholder" },
    ],
    hover: [
      { k: "Type", v: "Backend / infrastructure" },
      { k: "Guarantee", v: "Enforced by the database" },
      { k: "Money", v: "Integer cents, rounded once" },
    ],

    tagline:
      "Usage metering and billing API: idempotent events, plan quotas, integer-cent pricing, Stripe webhooks.",
    question:
      "How do you build a system that knows exactly what someone consumed, decides whether they are allowed any more, and turns that into money — while the network keeps retrying the same request?",
    built:
      "Billing middleware. Every billable action is recorded exactly once, checked against the tenant's monthly quota, priced in integer cents, and kept in sync with Stripe through test-mode webhooks.",
    taught:
      "Correctness in billing is almost entirely about boundaries: which request counts as the same request, which one is the last one you are allowed, and where exactly the rounding happens.",

    idea:
      "Check whether the idempotency key already exists, and insert if it doesn't. Which works right up until two retries of the same request arrive at the same moment, and both pass the check.",

    hood: {
      intro:
        "A deliberately boring layering: routes parse and map exceptions to status codes and hold no business logic; services own the rules; models own the schema; migrations own the shape. All the interesting content is in where the guarantees are placed.",
      flow: [
        { label: "Request with an idempotency key", note: "Header, required." },
        { label: "Insert the usage event", note: "Unique on (tenant, key) — the database is the referee." },
        { label: "Duplicate?", note: "Return the original stored response. Same cost, same status code." },
        { label: "Quota check", note: "Month-to-date plus the requested amount, against the plan limit." },
        { label: "Price it", note: "Per category, in Decimal, rounded to cents exactly once." },
        { label: "Stripe stays in sync", note: "Checkout, then subscription webhooks." },
      ],
      flowCaption: "The order matters: nothing is priced until it has been proven to be a new event.",
      decisions: [
        {
          title: "The unique constraint is the source of truth",
          body: "Idempotency is enforced by a unique index on tenant plus idempotency key, not by an application-level check-then-insert. On a unique violation the service fetches the existing row and replays the original response. That is race-safe under concurrent retries, which the application-level version simply is not.",
        },
        {
          title: "The boundary belongs to the customer",
          body: "The quota rule is month-to-date usage plus the requested quantity against the plan limit. The request that lands exactly on the limit is allowed; the next one is rejected. It is written down explicitly so a reviewer can verify the rule rather than infer it — and the rejection carries a reason: 402 when a free plan needs upgrading, 429 when a paid plan is over.",
        },
        {
          title: "Round once, at the end",
          body: "Input, cached input and output tokens are priced independently in Decimal and summed, then rounded to the nearest cent exactly once, so per-category rounding never compounds into a wrong total. Reasoning tokens are billed at the output rate rather than as a separate category, and the pricing source is cited in the repo with the date it was read.",
        },
      ],
    },

    hardPart:
      "Getting idempotency right under concurrency, which meant admitting the first version was only correct when nothing else was happening. Moving the guarantee out of Python and into a database constraint is a small diff and a completely different set of properties. Second hardest: pricing that survives inspection — sub-cent amounts, per-category rates, and a rounding position you have to be able to defend.",

    learned: [
      "Put the invariant where it cannot be raced. If a rule is only correct when two things don't happen simultaneously, it isn't a rule yet.",
      "Write the boundary condition down. 'Does the limit mean at-most or fewer-than?' is the kind of question that quietly costs somebody money, and it takes one sentence to settle.",
    ],

    ledTo:
      "Straight back into LEA. Rent is metering with a different unit and a longer period, and the Wi-Fi line I had bolted on was consumption billing without any of this vocabulary. It also sharpened the rent-guarantee question: guaranteeing rent is a pricing problem before it is a software problem.",

    connects: [
      { slug: "lea-residency", via: "The Wi-Fi line item is what sent me here. Same problem, different unit." },
      {
        slug: "terramavuno-nielekeze",
        via: "Both put the rule somewhere pure and let everything else be a view of it.",
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "jua-link",
    index: "04",
    name: "Jua Link",
    period: "2026",
    state: "scaffold",
    themes: ["real-world", "infrastructure", "experiments"],
    accent: "signal",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Africa's Talking (SMS + USSD)",
      "Zod",
      "Vitest",
      "Tailwind",
    ],
    links: { source: "https://github.com/Chrisleo-16/jua-link" },
    evidence: [
      { kind: "built", note: "The order loop runs end to end: web form, SMS reply, USSD flow" },
      { kind: "documented", note: "The README is an engineering log, including why each rule was chosen" },
      { kind: "partial", note: "Self-described phase 1–2. No admin dashboard, no uploads, no seed script" },
    ],
    hover: [
      { k: "Type", v: "Channel experiment" },
      { k: "Interface", v: "SMS and USSD" },
      { k: "Scale", v: "Honest — a scaffold" },
    ],

    tagline:
      "Marketplace for Kenyan artisans where the artisan's whole interface is SMS and USSD. One order loop, two front doors.",
    question:
      "Can somebody with a feature phone and no data run their side of a business on the same system as somebody with a browser?",
    built:
      "A marketplace connecting customers to Kenyan artisans, where the artisan's entire interface is SMS. A customer orders from the web or USSD; the artisan replies 1, 2 or 3; the reply moves the order. It is a scaffold, and the repo says so.",
    taught:
      "Constraints are a design tool. A flow that has to survive a menu with no session and a reply of one character forces you to be honest about what the flow actually is.",

    idea:
      "An app for artisans. It is the default answer and it fails at the first step, because the people it is for do not have one and would not install one. So the interface budget becomes: 160 characters out, one character back.",

    hood: {
      intro:
        "Two front doors — a Next.js web app and a USSD menu — funnelling into a single order-creation function. Everything that decides what a status means lives in one types module, so the webhook, the USSD handler and the dashboard cannot each invent their own answer to what '2' means.",
      flow: [
        { label: "Order created", note: "From the web form or the USSD flow. One function, either way." },
        { label: "SMS out", note: "Artisan gets the request; customer gets a confirmation." },
        { label: "Artisan replies", note: "1, 2, 3 — or ACCEPT / DECLINE / CALLBACK, or an explicit reference." },
        { label: "Webhook, deduplicated", note: "The provider's message id is unique; retries do nothing twice." },
        { label: "Matched to an order", note: "By reference if one is given, otherwise oldest pending." },
        { label: "Status event + customer SMS", note: "The trail is a table, not a column." },
      ],
      flowCaption: "Two surfaces, one definition of what an order is and what a status means.",
      decisions: [
        {
          title: "USSD keeps state by not keeping state",
          body: "The provider sends the entire accumulated input string on every request — something like 2*1*3*4*Kasarani. There is no session to read, so position is re-derived by splitting on the delimiter: the array's length is the step, its values are the choices. The cost is a rule you have to remember — every list must come back in the same order every time, because the user's next input is 'the number they saw', not a stable id. So menus always sort by name, and the code says why.",
        },
        {
          title: "Oldest pending order, not newest",
          body: "An artisan can have several open requests, and a bare '1' doesn't say which. Matching to the newest would let a flood of new requests push an older one out of reach of a reply that was meant for it. FIFO is also the version you can explain to a coordinator staring at a mismatch. The reasoning is in the README, which I'd defend more than the rule itself.",
        },
        {
          title: "A mock mode that exercises the real path",
          body: "Leave the gateway credentials blank and sends log to the console while still writing to the messages table, so the entire loop is testable without an account or a real phone. It is the difference between a flow I had reasoned about and one I had watched work.",
        },
      ],
    },

    hardPart:
      "Statelessness, and the discipline it demands. Once navigation is derived from a string, an innocuous change — reordering a menu, adding a category — silently breaks every session in flight. The second hard part was smaller and more useful: choosing the FIFO rule and being able to say why, rather than picking whichever was easier to implement.",

    learned: [
      "Honest scale. This is a scaffold, the README says so and lists what is not built, and that turns out to be far more useful to a reader than a paragraph implying a company.",
      "Build the mock mode early. A loop you can run without credentials is a loop you will actually run.",
    ],

    ledTo:
      "The channel thinking underneath it. Reaching people over SMS and USSD instead of assuming a browser is now something I design for from the start — it shows up directly in the farmer channel attached to Nielekeze, and in how LEA talks to tenants who never open the app.",

    connects: [
      { slug: "lea-residency", via: "Same conclusion from two directions: the browser is not where the user is." },
      {
        slug: "terramavuno-nielekeze",
        via: "The USSD and SMS surface there is this idea, applied to a different problem.",
      },
    ],
  },
];

export const featuredBuild = builds.find((b) => b.featured) ?? builds[0];
export const getBuild = (slug: string) => builds.find((b) => b.slug === slug);
