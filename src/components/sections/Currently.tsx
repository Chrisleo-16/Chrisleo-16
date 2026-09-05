import { Link } from "react-router-dom";
import { now } from "@/content/now";
import { Label, Mark, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * RIGHT NOW. Placed early on purpose — before any history, a visitor should be
 * able to see that something is currently happening here.
 *
 * Everything below comes from `src/content/now.ts`, which is the one file
 * designed to be edited in a hurry.
 */
export default function Currently({
  compact = false,
  num = "01",
  note,
  spotlight,
}: SectionProps & { compact?: boolean }) {
  return (
    <section className="gutter pt-24 sm:pt-32" aria-labelledby="now-heading">
      {!compact && (
        <SectionHead
          spotlight={spotlight}
          id="now"
          num={num}
          label="Right now"
          title={
            <span id="now-heading">
              What I&apos;m in
              <br />
              the middle of
            </span>
          }
          note={note ?? "The rest of this site is history. This part is the present tense, and it changes."}
        />
      )}

      <Reveal className="pt-12 sm:pt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-5">
          <Mark label="Live" />
          <Label>Updated {now.updated}</Label>
        </div>

        <p className="max-w-[22ch] pt-8 font-story text-[1.6rem] font-light italic leading-tight tracking-[-0.01em] text-ink sm:text-[2rem]">
          &ldquo;{now.question}&rdquo;
        </p>
        <Label className="block pt-4">Current question</Label>
      </Reveal>

      <dl className="grid grid-cols-1 gap-x-14 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        {now.blocks.map((block, i) => (
          <Reveal
            key={block.label}
            delay={i * 0.05}
            className="border-t border-rule py-6 sm:py-7"
          >
            <dt className="flex items-baseline gap-3">
              <span className="index-num tnum text-annotate">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Label tone="ink">{block.label}</Label>
            </dt>
            <dd>
              <ul className="space-y-2 pt-4">
                {block.lines.map((line) => (
                  <li
                    key={line}
                    className="text-[0.9375rem] leading-relaxed text-muted-foreground"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>

      {!compact && (
        <Reveal className="border-t border-rule pt-5">
          <Link to="/now" className="group inline-flex items-center gap-2.5">
            <span className="pen-link ui-label">
              The full current state
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
