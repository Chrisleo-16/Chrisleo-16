# Developing the site — leochrisbenevans.vercel.app

> Developer notes for this repo. The root `README.md` is the GitHub profile page.

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
| `src/content/chapters.ts` | The journey. Seven chapters, one paragraph each; the last has `open: true` and renders as unfinished. |
| `src/content/builds.ts` | Case files. The home page shows only the question and what got built; the rest renders on `/builds/:slug`. |
| `src/content/experiments.ts` | The Lab. Three show on the home page, all of them on `/lab`. The rail counter reads this array. |
| `src/content/postmortems.ts` | Things that didn't work. Four entries, three beats each: assumed, happened, changed. |
| `src/content/notes.ts` | Writing. Prefix a body line with `## ` for a sub-heading or `> ` for a pull quote. |
| `src/content/toolkit.ts` | Tools, grouped by what they let you think about. |
| `src/content/about.ts` | The About page: the "Why I build" passage, six short sections (including Chiromo Tech Club), the closing. |

The front page is four screens and nothing else: hero, the builds as an index
(one line each, from `tagline`), the journey as a timeline (one line each, from
`turn`), and contact. It is written for someone deciding whether to hire you in
under a minute. Everything with a paragraph in it lives one click away:
`/builds/:slug`, `/lab`, `/notes`, `/about` (which now holds the full journey,
the wrong turns and the toolkit), and `/now`.

Files whose header says **DRAFT** were written from your existing site and your
brief. The facts are yours — project names, stacks, links, what each thing does.
The narrative around them is a first draft in your voice and should be read and
corrected, especially the chapter years, the failure stories, and anything in
`experiments.ts`.

---

## Unused files

The reading-lens system was removed from the front page. These files are no
longer imported and can be deleted:

```
src/content/lenses.ts
src/lib/lens.tsx
src/components/sections/LensBar.tsx
src/components/sections/LensGate.tsx
src/components/sections/Currently.tsx
src/components/sections/Postmortems.tsx
src/components/sections/Toolkit.tsx
```

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
  content/     every visible word on the site
  components/
    kit/       Editorial primitives (Label, SectionHead, Flow, Pull, Mark) + motion + Seo
    layout/    Nav, Footer, StatusRail, ThemeToggle, Layout
    sections/  Hero, BuildsIndex, Journey, Contact (+ Lab/NotesPreview, whose row components the /lab and /notes pages reuse)
    ui/        the three shadcn components still in use (toast, toaster, tooltip)
  pages/       Index, BuildDetail, LabPage, NotesPage, NoteDetail, AboutPage, NowPage, NotFound
  lib/         section navigation, cn()
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
