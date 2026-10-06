import { Link } from "react-router-dom";
import { builds } from "@/content/builds";
import { site } from "@/content/site";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { StateTag } from "@/components/kit/BuildBits";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * BUILDS, as an index.
 *
 * One row per build: name, state, a single line on what it is, and the way in.
 * This is the screen a hiring manager actually reads, so it has to fit on one.
 * Everything else about a build is in its case file.
 */
export default function BuildsIndex({ num = "01", note }: SectionProps) {
  return (
    <section className="gutter pt-20 sm:pt-28">
      <SectionHead
        id="builds"
        num={num}
        label="Builds"
        title={
          <>
            Four systems,
            <br />
            all in production or close
          </>
        }
        note={note ?? "Each row is one click from the full case file."}
      />

      <ol className="pt-10 sm:pt-14">
        {builds.map((b, i) => (
          <Reveal as="li" key={b.slug} delay={Math.min(i, 3) * 0.05} className="border-t border-rule">
            <Link
              to={`/builds/${b.slug}`}
              className="group grid grid-cols-1 gap-x-10 gap-y-2 py-6 transition-colors duration-300 hover:border-ink sm:py-7 lg:grid-cols-[3rem_minmax(0,1fr)_auto]"
            >
              <span className="index-num tnum text-annotate">{b.index}</span>

              <div className="min-w-0">
                <h3 className="font-display text-display-sm font-medium transition-transform duration-500 ease-archive group-hover:translate-x-1 motion-reduce:transform-none">
                  {b.name}
                  {b.aka && (
                    <span className="pl-3 align-middle text-[0.55em] text-muted-foreground">
                      by {b.aka}
                    </span>
                  )}
                </h3>
                <p className="max-w-[60ch] pt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {b.tagline}
                </p>
                <p className="pt-2.5 meta-xs text-muted-foreground">{b.stack.slice(0, 5).join(" · ")}</p>
              </div>

              <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:justify-between lg:pt-1">
                <StateTag state={b.state} period={b.period} />
                <span className="flex items-center gap-2 ui-label text-muted-foreground transition-colors group-hover:text-ink">
                  Case file
                  <span
                    aria-hidden="true"
                    className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ol>

      <Reveal className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-rule pt-5">
        <Label className="pr-3">Builds with</Label>
        {site.stack.map((s, i) => (
          <span key={s} className="stack-item text-ink">
            {s}
            {i < site.stack.length - 1 && (
              <span aria-hidden="true" className="pl-1.5 text-muted-foreground">
                /
              </span>
            )}
          </span>
        ))}
        <Link to="/lab" className="ui-link pl-4">
          Smaller experiments →
        </Link>
      </Reveal>
    </section>
  );
}
