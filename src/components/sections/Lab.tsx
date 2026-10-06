import { Link } from "react-router-dom";
import { experiments, experimentCount } from "@/content/experiments";
import type { Experiment, ExperimentOutcome } from "@/content/types";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

const outcomeMark: Record<ExperimentOutcome, string> = {
  shipped: "→ kept",
  abandoned: "× dropped",
  running: "· running",
  inconclusive: "? unresolved",
};

/**
 * An experiment entry. Deliberately drawn as a provisional thing — dashed rule,
 * no imagery, question first — so it reads as a lab note and never as a product.
 */
export function ExperimentEntry({ x, index = 0 }: { x: Experiment; index?: number }) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <Label tone="annotate" className="tnum">
          Exp. {x.id}
        </Label>
        <Label className="tnum">{x.date}</Label>
      </div>

      <h3 className="max-w-[30ch] pt-5 font-story text-[1.2rem] font-light italic leading-snug text-ink">
        {x.question}
      </h3>

      <p className="pt-4 text-[0.875rem] leading-relaxed text-muted-foreground">{x.note}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-dashed border-rule pt-4">
        <span className="meta-xs text-muted-foreground">
          {x.tags.join(" / ")}
        </span>
        <span
          className={`meta-xs ${
            x.outcome === "running" ? "text-annotate" : "text-ink"
          }`}
        >
          {outcomeMark[x.outcome]}
        </span>
      </div>
    </>
  );

  return (
    <Reveal
      as="li"
      delay={Math.min(index, 5) * 0.04}
      className="border border-dashed border-rule p-6 transition-colors duration-300 hover:border-ink sm:p-7"
    >
      {x.link ? (
        <a href={x.link} target="_blank" rel="noreferrer noopener" className="block">
          {body}
        </a>
      ) : (
        body
      )}
    </Reveal>
  );
}

export default function Lab({
  limit = 6,
  num = "06",
  note,
  spotlight,
}: SectionProps & { limit?: number }) {
  const shown = experiments.slice(0, limit);

  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
          spotlight={spotlight}
        id="lab"
        num={num}
        label="The lab"
        title={
          <>
            Small questions,
            <br />
            answered cheaply
          </>
        }
        note={note ?? "Most of these took a weekend. Half were dropped, which is the right ratio."}
      />

      <div className="flex flex-wrap items-baseline justify-between gap-4 pt-12 sm:pt-16">
        <Label>
          Showing {shown.length} of {experimentCount}
        </Label>
        <Label>Newest first</Label>
      </div>

      <ul className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((x, i) => (
          <ExperimentEntry key={x.id} x={x} index={i} />
        ))}
      </ul>

      {limit < experimentCount && (
        <Reveal className="pt-10">
          <Link to="/lab" className="group inline-flex items-center gap-2.5">
            <span className="pen-link ui-label">
              All {experimentCount} experiments
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
