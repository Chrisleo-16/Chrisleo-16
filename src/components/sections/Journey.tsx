import { Link } from "react-router-dom";
import { chapters } from "@/content/chapters";
import { getBuild } from "@/content/builds";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * The journey as chapters rather than a CV timeline. Each chapter opens with
 * the question that started it and closes with the turn that ended it — so the
 * changes of direction read as the argument, not as gaps.
 */
export default function Journey({ num = "02", note, spotlight }: SectionProps) {
  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
          spotlight={spotlight}
        id="journey"
        num={num}
        label="The journey"
        title={
          <>
            Seven chapters,
            <br />
            one of them unfinished
          </>
        }
        note={note ?? "Not a chronology of jobs. A record of what I was trying to work out, and what changed my mind."}
      />

      <ol className="pt-16 sm:pt-24">
        {chapters.map((ch, i) => (
          <Reveal
            as="li"
            key={ch.id}
            delay={Math.min(i, 3) * 0.04}
            className={`grid grid-cols-1 gap-x-12 gap-y-4 border-t py-10 sm:py-14 lg:grid-cols-[9rem_minmax(0,1fr)_7rem] ${
              ch.open ? "border-annotate/60" : "border-rule"
            }`}
          >
            <div className="flex items-baseline gap-4 lg:block">
              <Label tone={ch.open ? "annotate" : "muted"} className="tnum block">
                Chapter {ch.id}
              </Label>
              <Label className="lg:hidden">{ch.period}</Label>
            </div>

            <div>
              <h3 className="text-display-md font-medium">
                {ch.title}
              </h3>

              <p className="max-w-[38ch] pt-4 font-story text-[1.15rem] font-light italic leading-snug text-ink/85">
                {ch.question}
              </p>

              <div className="max-w-measure space-y-4 pt-6">
                {ch.body.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>

              {ch.turn && (
                <p className="mt-7 max-w-measure-sm border-l border-annotate pl-4  text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-ink">
                  <span className="text-annotate">What changed → </span>
                  {ch.turn}
                </p>
              )}

              {ch.related && ch.related.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
                  <Label>Evidence</Label>
                  {ch.related.map((slug) => {
                    const b = getBuild(slug);
                    if (!b) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/builds/${slug}`}
                        className="pen-link ui-label"
                      >
                        {b.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {ch.open && (
                <p className="pt-8 ui-label text-annotate">
                  This chapter is still being written
                </p>
              )}
            </div>

            <Label className="hidden text-right lg:block">{ch.period}</Label>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
