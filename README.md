# Field Notes — leochrisbenevans.vercel.app

An archive, not a résumé. The site is built around one shape:

> **questions → experiments → builds → failures → lessons → new questions**

Everything a visitor reads lives in `src/content/`. The components render structure;
the content files hold the story. Adding a project, an experiment or a note means
adding an object to an array — nothing else.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build
npm run preview    # serve the build
npm run typecheck  # tsc --noEmit
npm run lint
```

`.env` needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for the
"Ask the archive" panel. Everything else on the site works without them.

---

## Editing the content

| File | What it holds |
| --- | --- |
| `src/content/now.ts` | **Edit this most often.** The RIGHT NOW block, the current question, the "last updated" stamp that appears in the hero, footer and rail. |
| `src/content/site.ts` | Name, links, email, the hero thesis, the "currently exploring" line. |
| `src/content/chapters.ts` | The journey. Seven chapters; the last one has `open: true` and renders as unfinished. |
| `src/content/builds.ts` | Case files. Each answers the same seven questions. `featured: true` promotes one to the long-form section. |
| `src/content/experiments.ts` | The Lab. The counter in the status rail reads the length of this array. |
| `src/content/postmortems.ts` | Things that didn't work. Four beats each: where, assumed, happened, changed. |
| `src/content/notes.ts` | Writing. Prefix a body line with `## ` for a sub-heading or `> ` for a pull quote. |
| `src/content/toolkit.ts` | Tools, grouped by what they let you think about. |
| `src/content/community.ts` | Chiromo Tech Club. |
| `src/content/about.ts` | The About page and the "Why I build" passage. |
| `src/content/lenses.ts` | The reading lenses (see below). |

Files whose header says **DRAFT** were written from your existing site and your
brief. The facts are yours — project names, stacks, links, what each thing does.
The narrative around them is a first draft in your voice and should be read and
corrected, especially the chapter years, the failure stories, and anything in
`experiments.ts`.

---

## The lens system

`src/content/lenses.ts` defines five ways of reading the same page: *curious,
hire, build, work, LEA*.

A lens **only** does four things:

1. reorders the sections,
2. marks the ones that answer that reader's question,
3. rewrites a few section notes,
4. pulls the relevant case files to the front of the index.

It never adds, removes or duplicates a section — and `src/lib/lens.tsx` appends
anything a lens forgets to list, so a typo can't drop content off the page.

`LensGate` fires on the *first movement away from the hero* — roughly 24% of a
viewport of scroll, while the hero is still on screen — so nobody reads a screen
of the archive before being asked. The page freezes exactly where it stands
(pinned, not `overflow: hidden`, so dismissing doesn't throw you back to the top)
and frosts over.

Escape, a click outside, "show me everything", or ~260px of deliberate further
scrolling all get past it, and it doesn't ask again that session. Momentum from
the scroll that opened it is ignored for 900ms so it can't dismiss itself.
Choosing a lens scrolls you to the lens bar, so the reordered archive starts
directly under your choice.

The choice lives in `sessionStorage` and is linkable: `/?lens=hire`. Clicking
**View through a lens** in the bar always calls the question back up — useful for
readers who scrolled past it, and the quickest way to see it again while working
on the site (otherwise: clear sessionStorage, or open a new tab).

Adding a lens is one object in `lenses.ts`.

---

## Design system

Two surfaces, one hairline, one accent.

| Token | Light (paper) | Dark (ink) |
| --- | --- | --- |
| `--paper` | `#F7F2E2` cream-yellow | `#131211` |
| `--ink` | `#1B1917` | `#F0EBDC` |
| `--rule` | `#DCD3B8` hairline | `#2D2A26` |
| `--muted-ink` | `#6D675C` | `#918A7C` |
| `--annotate` | `#C83A1E` red pen | `#FF6242` |

The accent is only ever used for things that are *live*, *current*, or *marked by
hand*: the NOW indicator, the unfinished chapter, the active nav item's
strike-through, spotlight markers, annotation arrows, link underlines. It is
never a fill.

### Type

Defined once, in `src/index.css`, as CSS variables:

```css
--font-display: "Plus Jakarta Sans";  /* headlines, navigation, actions */
--font-body:    "Plus Jakarta Sans";  /* body copy */
--font-mono:    "JetBrains Mono";     /* technical metadata only */
--font-story:   "Newsreader";         /* pull quotes and questions */
```

Use the semantic classes rather than font utilities, so the policy stays in one
file:

- `.ui-label` / `.ui-link` / `.ui-active` — navigation, buttons, actions
- `.meta` / `.meta-ink` / `.meta-sm` / `.meta-xs` — labels, timestamps, IDs, tags
- `.index-num`, `.stack-item`, `.code` — numerals, stack lists, terminal text
- `.story-quote` — the serif voice

### Motion

Above-the-fold entrances are CSS (`.enter-rise`, `.enter-line`, `.resolve`) so the
headline paints on the first frame instead of waiting for hydration. Scroll
reveals use Framer Motion. `prefers-reduced-motion` collapses all of it, including
animation delays. Nothing loops.

---

## Images

The hero photograph is generated, not hand-edited. Sources and scripts live in
`assets-source/` (not deployed):

```bash
python assets-source/build-hero-image.py   # -> public/media/chrisben-hero{,-lofi}.webp
python assets-source/build-og-card.py      # -> public/media/og-cover.jpg
```

`build-hero-image.py` crops the original, falls the frame away into shadow, and
dissolves the edges into pixel blocks using a quantised coverage mask. The tiny
`-lofi` copy is layered on top at load and stepped away, so the picture appears to
rebuild itself from its own pixels. `assets-source/subject-polygon.py` holds the
traced silhouette if you ever need to re-mask.

To swap the photograph: replace `assets-source/portrait-original.jpeg`, adjust
`BOX` in the build script, and re-run both scripts.

---

## Architecture

```
src/
  content/     every visible word, plus the lens definitions
  components/
    kit/       Editorial primitives (Label, SectionHead, Flow, Pull, Mark) + motion + Seo
    layout/    Nav, Footer, StatusRail, ThemeToggle, Layout
    sections/  one file per home-page section, all sharing SectionProps
    ui/        the three shadcn components still in use (toast, toaster, tooltip)
  pages/       Index, BuildDetail, LabPage, NotesPage, NoteDetail, AboutPage, NowPage, NotFound
  lib/         lens context, section navigation, cn()
```

- Vite + React 18 + TypeScript + Tailwind + Framer Motion.
- The home page ships in the main bundle; every other route is lazy. The assistant
  (and with it the Supabase client) and the mailer are only fetched when used.
- Per-route metadata, canonical URLs and JSON-LD come from `components/kit/Seo.tsx`.
  `public/sitemap.xml` is checked in — regenerate it when you add a build or a note.
- `vercel.json` handles SPA rewrites and asset caching.

## Ask the archive

`supabase/functions/chris-bot/index.ts` is the assistant behind the status rail.
Its system prompt is a condensed copy of `src/content/*` — **when the story
changes, change the prompt too**, or it will confidently describe a version of you
that no longer exists.
