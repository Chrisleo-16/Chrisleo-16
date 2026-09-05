# The content layer

Everything a visitor reads is in this folder. If you are changing words, you
should never need to open a component.

## Where to start

**`now.ts`** — the file to edit most often. It drives the RIGHT NOW section, the
`/now` page, the "current chapter" line in the status rail, and the "last
updated" stamp in the hero and footer. Editing it makes the whole site look
alive; leaving it stale makes the whole site look abandoned.

## Adding things

- **A project** → append to `builds.ts`. Answer all seven questions; the two that
  matter most are `broke` and `differently`. `index` is the case-file number and
  stays attached to the project, not its position.
- **An experiment** → prepend to `experiments.ts` with the next ID. The counter in
  the status rail and on the Lab page read this array's length.
- **A failure** → append to `postmortems.ts`. If it doesn't end in a changed
  behaviour, it isn't a postmortem, it's a war story — leave it out.
- **A note** → append to `notes.ts`. In `body`, a line starting with `## ` is a
  sub-heading and one starting with `> ` is a pull quote.
- **A chapter** → `chapters.ts`. Exactly one chapter should have `open: true`.
- **A lens** → `lenses.ts`. See the README at the repo root.

After adding a build or a note, regenerate `public/sitemap.xml`.

## Files marked DRAFT

`builds.ts`, `chapters.ts`, `experiments.ts`, `postmortems.ts`, `notes.ts`,
`community.ts` and `about.ts` carry a DRAFT header.

The facts in them are real — project names, stacks, links, what each thing does,
all taken from the previous site. The surrounding narrative was written from
those facts and needs your eye. In particular, check:

- the chapter years in `chapters.ts`,
- the specific failures in `postmortems.ts`,
- everything in `experiments.ts`,
- the Chiromo Tech Club details in `community.ts`.

Nothing here invents a metric, a client or an award — but it does put words in
your mouth, and they should become yours.
