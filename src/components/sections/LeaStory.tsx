import { Link } from "react-router-dom";
import { featuredBuild as lea } from "@/content/builds";
import { Flow, Label, Pull, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * LEA gets the long treatment because it is the only build where the whole
 * mechanism is visible: a question, a system, a collision with reality, and a
 * change of direction that came from the collision rather than from a deck.
 *
 * The point of this section is not what LEA is. It's that it kept becoming
 * something else, and why.
 */
export default function LeaStory({ num = "04", note, spotlight }: SectionProps) {
  const evo = lea.evolution;

  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
        spotlight={spotlight}
        id="lea"
        num={num}
        label="Evolution"
        title={
          <>
            LEA started with a question
            <br />
            about property management.
          </>
        }
        note={
          note ??
          "It has not stayed there. This is the record of what changed the product, in the order it changed it."
        }
      />

      <div className="grid grid-cols-1 gap-x-16 gap-y-14 pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] sm:pt-20">
        <div>
          <Reveal>
            <Pull cite="What the building actually taught me">{lea.taught}</Pull>
          </Reveal>

          {/* Early idea → discovered → pivot → current direction. */}
          <dl className="pt-14">
            {evo?.stages.map((s, i) => {
              const last = i === evo.stages.length - 1;
              return (
                <Reveal
                  key={s.label}
                  delay={Math.min(i, 3) * 0.05}
                  className={`border-t py-7 ${last ? "border-annotate/60" : "border-rule"}`}
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="index-num tnum text-annotate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-display-sm font-medium ${
                        last ? "text-annotate" : "text-ink"
                      }`}
                    >
                      {s.label}
                    </span>
                  </dt>
                  <dd className="max-w-measure pl-9 pt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {s.body}
                  </dd>
                </Reveal>
              );
            })}
          </dl>

          <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-10">
            <Link to={`/builds/${lea.slug}`} className="group inline-flex items-center gap-2.5">
              <span className="pen-link ui-label">Read the full case file</span>
              <span
                aria-hidden="true"
                className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            {lea.links.live && (
              <a href={lea.links.live} target="_blank" rel="noreferrer noopener" className="ui-link">
                Open LEA ↗
              </a>
            )}
            <a href={lea.links.source} target="_blank" rel="noreferrer noopener" className="ui-link">
              View source ↗
            </a>
          </Reveal>
        </div>

        {/* The chain. Read downwards: each step is what the previous one exposed. */}
        <Reveal delay={0.1}>
          <div className="field-grid border border-rule p-7 sm:p-10">
            <div className="flex items-baseline justify-between gap-4 pb-9">
              <Label tone="ink">How it changed</Label>
              <Label>Fig. 02</Label>
            </div>
            {evo && <Flow steps={evo.chain} />}
            <p className="mt-9 border-t border-rule pt-5 code leading-relaxed text-muted-foreground">
              Not a roadmap. Each step is what the one above it made impossible to ignore.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
