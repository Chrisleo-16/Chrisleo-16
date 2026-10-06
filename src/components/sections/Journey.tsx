import { Link } from "react-router-dom";
import { chapters } from "@/content/chapters";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * The journey as a timeline: one line per chapter — the period, the title,
 * and what changed by the end of it. The paragraphs live on the About page.
 */
export default function Journey({ num = "02", note }: SectionProps) {
  return (
    <section className="gutter pt-20 sm:pt-28">
      <SectionHead
        id="journey"
        num={num}
        label="The journey"
        title={
          <>
            How I
            <br />
            got here
          </>
        }
        note={note ?? "Seven turns. Each line is what changed my mind."}
      />

      <ol className="pt-10 sm:pt-14">
        {chapters.map((ch, i) => (
          <Reveal
            as="li"
            key={ch.id}
            delay={Math.min(i, 3) * 0.04}
            className={`grid grid-cols-1 gap-x-10 gap-y-1 border-t py-4 sm:py-5 lg:grid-cols-[7rem_14rem_minmax(0,1fr)] ${
              ch.open ? "border-annotate/60" : "border-rule"
            }`}
          >
            <Label tone={ch.open ? "annotate" : "muted"} className="tnum">
              {ch.period}
            </Label>
            <span className="font-display text-[1.05rem] font-medium leading-snug text-ink">{ch.title}</span>
            <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              {ch.open ? "Still being written." : ch.turn}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="border-t border-rule pt-5">
        <Link to="/about" className="group inline-flex items-center gap-2.5">
          <span className="pen-link ui-label">The longer version</span>
          <span
            aria-hidden="true"
            className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
