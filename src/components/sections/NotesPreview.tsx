import { Link } from "react-router-dom";
import { notes } from "@/content/notes";
import type { Note } from "@/content/types";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import { formatDate } from "@/lib/format";
import type { SectionProps } from "./section";

/** One line in the writing index. */
export function NoteRow({ note, index = 0 }: { note: Note; index?: number }) {
  return (
    <Reveal as="li" delay={Math.min(index, 4) * 0.04}>
      <Link
        to={`/notes/${note.slug}`}
        className="group grid grid-cols-1 gap-x-10 gap-y-3 border-t border-rule py-8 transition-colors duration-300 hover:border-ink lg:grid-cols-[7rem_minmax(0,1fr)_5rem]"
      >
        <Label className="tnum pt-1.5">{formatDate(note.date)}</Label>

        <div className="min-w-0">
          <h3 className="max-w-[34ch] font-display text-display-sm font-medium transition-transform duration-500 ease-archive group-hover:translate-x-1 motion-reduce:transform-none">
            {note.title}
          </h3>
          <p className="max-w-measure pt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {note.standfirst}
          </p>
          <p className="pt-3 meta-xs text-muted-foreground">
            {note.tags.join(" / ")}
          </p>
        </div>

        <div className="flex items-center gap-3 lg:justify-end lg:pt-1.5">
          <Label>{note.reading}</Label>
          <span
            aria-hidden="true"
            className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function NotesPreview({
  limit = 3,
  num = "10",
  note,
  spotlight,
}: SectionProps & { limit?: number }) {
  const shown = notes.slice(0, limit);

  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
          spotlight={spotlight}
        id="writing"
        num={num}
        label="Notes from building"
        title={
          <>
            Written down
            <br />
            so I stop relearning it
          </>
        }
        note={note ?? "Short pieces, usually written straight after something broke. Not a content strategy."}
      />

      <ol className="pt-14 sm:pt-20">
        {shown.map((n, i) => (
          <NoteRow key={n.slug} note={n} index={i} />
        ))}
      </ol>
      <div className="border-t border-rule" />

      {limit < notes.length && (
        <Reveal className="pt-5">
          <Link to="/notes" className="group inline-flex items-center gap-2.5">
            <span className="pen-link ui-label">
              All {notes.length} notes
            </span>
            <span
              aria-hidden="true"
              className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      )}
    </section>
  );
}
