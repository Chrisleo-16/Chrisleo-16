import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "@/components/kit/Seo";
import { getNote, notes } from "@/content/notes";
import { formatDate } from "@/lib/format";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { LineReveal, Reveal } from "@/components/kit/motion";
import { site } from "@/content/site";

/** Renders the lightweight body format: "## " heading, "> " quote, else prose. */
function Block({ line }: { line: string }) {
  if (line.startsWith("## ")) {
    return (
      <h2 className="pt-10 font-display text-display-sm font-medium text-ink">
        {line.slice(3)}
      </h2>
    );
  }
  if (line.startsWith("> ")) {
    return (
      <blockquote className="my-4 border-l border-annotate py-1 pl-6">
        <p className="font-story text-[1.3rem] font-light italic leading-snug text-ink sm:text-[1.5rem]">
          {line.slice(2)}
        </p>
      </blockquote>
    );
  }
  return <p className="text-[1.0625rem] leading-[1.75] text-ink/85">{line}</p>;
}

export default function NoteDetail() {
  const { slug = "" } = useParams();
  const note = getNote(slug);
  if (!note) return <Navigate to="/404" replace />;

  const i = notes.findIndex((n) => n.slug === slug);
  const next = notes[(i + 1) % notes.length];

  return (
    <>
      <Seo
        title={`${note.title} · ${site.name}`}
        description={note.standfirst}
        path={`/notes/${note.slug}`}
        type="article"
        publishedTime={note.date}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: note.title,
          description: note.standfirst,
          datePublished: note.date,
          keywords: note.tags.join(", "),
          author: { "@type": "Person", name: site.name, url: site.url },
          mainEntityOfPage: `${site.url}/notes/${note.slug}`,
        }}
      />

      <article className="gutter pt-[calc(var(--nav-h)+4rem)]">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <FieldTag>Note</FieldTag>
          <Label className="tnum">
            {formatDate(note.date)} · {note.reading}
          </Label>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={[note.title]}
          className="max-w-[20ch] pt-8 text-display-lg font-medium"
        />

        <Reveal delay={0.18} className="max-w-[48ch] pt-7">
          <p className="font-story text-[1.25rem] font-light italic leading-snug text-muted-foreground sm:text-[1.4rem]">
            {note.standfirst}
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-12 border-t border-rule pt-3">
          <Label>{note.tags.join(" / ")}</Label>
        </Reveal>

        <div className="max-w-measure space-y-6 pt-12">
          {note.body.map((line, li) => (
            <Block key={li} line={line} />
          ))}
        </div>

        <nav className="mt-24 border-t border-rule pt-6" aria-label="Note navigation">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Link to="/notes" className="group inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="text-annotate transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              <span className="ui-label text-muted-foreground transition-colors group-hover:text-ink">
                All notes
              </span>
            </Link>

            <Link to={`/notes/${next.slug}`} className="group max-w-[26ch] text-right">
              <Label className="block pb-1.5">Next</Label>
              <span className="font-display text-[1.15rem] font-medium leading-snug">
                {next.title}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block text-annotate transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </div>
        </nav>
      </article>
    </>
  );
}
