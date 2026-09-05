import Seo from "@/components/kit/Seo";
import { notes } from "@/content/notes";
import { NoteRow } from "@/components/sections/NotesPreview";
import { FieldTag } from "@/components/kit/Editorial";
import { LineReveal, Reveal } from "@/components/kit/motion";
import { site } from "@/content/site";

export default function NotesPage() {
  return (
    <>
      <Seo
        title={`Notes from building · ${site.name}`}
        description="Short pieces on payments, operations, alternative data and changing direction — written after something broke rather than for an audience."
        path="/notes"
      />

      <div className="gutter pt-[calc(var(--nav-h)+4rem)]">
        <Reveal>
          <FieldTag>Notes from building</FieldTag>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={["Writing"]}
          className="pt-8 text-display-xl font-medium"
        />

        <Reveal delay={0.18} className="max-w-[46ch] pt-6">
          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
            I write things down so I stop learning them twice. These are the pieces where the
            lesson generalised beyond the project it came from.
          </p>
        </Reveal>

        <ol className="pb-24 pt-16">
          {notes.map((n, i) => (
            <NoteRow key={n.slug} note={n} index={i} />
          ))}
          <li className="border-t border-rule" />
        </ol>
      </div>
    </>
  );
}
