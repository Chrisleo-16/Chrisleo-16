import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { builds, repeatingIdeas, THEMES } from "@/content/builds";
import type { CaseFile, Theme } from "@/content/types";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { EvidenceRow, StateTag, accentRail } from "@/components/kit/BuildBits";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * BUILDS.
 *
 * Not a grid of cards. Each entry leads with the question that caused it to
 * exist, and technology is the last and smallest thing on it. The four share a
 * design system but not a texture — the rail down the left of each is drawn
 * from what the project actually is.
 */
function BuildCard({ b, i }: { b: CaseFile; i: number }) {
  return (
    <Reveal as="li" delay={Math.min(i, 3) * 0.05} className="group border-t border-rule">
      <article className="grid grid-cols-1 gap-x-10 py-9 lg:grid-cols-[3.5rem_minmax(0,1fr)] sm:py-11">
        <div className="hidden lg:block" aria-hidden="true">
          <span className="index-num tnum block text-annotate">{b.index}</span>
          <div className={`mt-4 h-[10rem] w-8 opacity-70 ${accentRail[b.accent]}`} />
        </div>

        <div className="min-w-0">
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div className="flex items-baseline gap-4">
              <span className="index-num tnum text-annotate lg:hidden">{b.index}</span>
              <h3 className="font-display text-display-md font-medium">
                {b.name}
                {b.aka && (
                  <span className="pl-3 align-middle text-[0.45em] text-muted-foreground">
                    by {b.aka}
                  </span>
                )}
              </h3>
            </div>

            {/* Micro-interaction: metadata surfaces only when you're looking at it. */}
            <div className="flex items-baseline gap-5">
              <div className="hidden gap-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 xl:flex">
                {b.hover.map((h) => (
                  <span key={h.k} className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <Label className="text-[0.625rem]">{h.k}</Label>
                    <span className="meta-xs text-ink">{h.v}</span>
                  </span>
                ))}
              </div>
              <StateTag state={b.state} period={b.period} />
            </div>
          </header>

          <div className="max-w-[52ch] pt-7">
            <Label tone="annotate" className="block pb-2.5">
              The question
            </Label>
            <p className="font-story text-[1.2rem] font-light italic leading-snug text-ink sm:text-[1.35rem]">
              {b.question}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-6 pt-8 sm:grid-cols-2">
            <div>
              <Label className="block pb-2.5">What I built</Label>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{b.built}</p>
            </div>
            <div>
              <Label className="block pb-2.5">What it taught me</Label>
              <p className="text-[0.9375rem] leading-relaxed text-ink">{b.taught}</p>
            </div>
          </div>

          {b.connects?.[0] && (
            <p className="mt-7 max-w-measure border-l border-annotate/50 pl-4 text-[0.875rem] leading-relaxed text-muted-foreground">
              <Label tone="annotate" className="pr-2">
                Connects
              </Label>
              {b.connects[0].via}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
            <Link to={`/builds/${b.slug}`} className="group/link inline-flex items-center gap-2.5">
              <span className="pen-link ui-label">Read the build</span>
              <span
                aria-hidden="true"
                className="text-annotate transition-transform duration-300 group-hover/link:translate-x-1"
              >
                →
              </span>
            </Link>
            <a href={b.links.source} target="_blank" rel="noreferrer noopener" className="ui-link">
              View source ↗
            </a>
            {b.links.live && (
              <a href={b.links.live} target="_blank" rel="noreferrer noopener" className="ui-link">
                Open it ↗
              </a>
            )}
          </div>

          <EvidenceRow evidence={b.evidence} className="pt-8" />

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-7">
            <Label className="pr-2">Built with</Label>
            {b.stack.map((s, si) => (
              <span key={s} className="stack-item text-muted-foreground">
                {s}
                {si < b.stack.length - 1 && (
                  <span aria-hidden="true" className="pl-2">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function BuildsIndex({
  num = "03",
  note,
  spotlight,
  /** When set, only this many builds render — the short path for a reader in a hurry. */
  limit,
}: SectionProps & { limit?: number }) {
  const [theme, setTheme] = useState<Theme | "all">("all");
  const short = Boolean(limit);

  const shown = useMemo(() => {
    const byTheme = theme === "all" ? builds : builds.filter((b) => b.themes.includes(theme));
    return limit ? byTheme.slice(0, limit) : byTheme;
  }, [theme, limit]);

  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
        spotlight={spotlight}
        id="builds"
        num={num}
        label="Builds"
        title={
          <>
            Things I&apos;ve
            <br />
            actually built
          </>
        }
        note={
          note ??
          "These aren't a collection of technologies I know. They're experiments that taught me how to build systems."
        }
      />

      {/* Conceptual filters — the kind of problem, never the framework. */}
      {!short && (
        <Reveal className="flex flex-wrap items-center gap-x-2 gap-y-2 pt-12 sm:pt-16">
          <Label className="pr-3">Filter by idea</Label>
          {THEMES.map((t) => {
            const active = theme === t.key;
            const count =
              t.key === "all"
                ? builds.length
                : builds.filter((b) => b.themes.includes(t.key as Theme)).length;
            if (count === 0) return null;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTheme(t.key)}
                aria-pressed={active}
                className={`ui-label border px-3 py-1.5 text-[0.6875rem] transition-colors ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-muted-foreground hover:border-ink hover:text-ink"
                }`}
              >
                {t.label}
                <span className="pl-2 opacity-60">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </Reveal>
      )}

      <ol className={short ? "pt-12 sm:pt-16" : "pt-8"}>
        {shown.map((b, i) => (
          <BuildCard key={b.slug} b={b} i={i} />
        ))}
      </ol>
      <div className="border-t border-rule" />

      {short && builds.length > shown.length && (
        <Reveal className="pt-6">
          <p className="max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
            Two more — a decision system that refuses to let the model answer, and a marketplace
            whose entire interface is SMS — are in the full archive.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("lens:ask"))}
            className="group mt-4 inline-flex items-center gap-2.5"
          >
            <span className="pen-link ui-label">See all four</span>
            <span
              aria-hidden="true"
              className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </Reveal>
      )}

      {/* What repeats. Ideas, not technologies. */}
      {!short && (
        <div className="pt-24 sm:pt-32">
          <Reveal>
            <Label tone="annotate" className="block pb-4">
              So what keeps repeating?
            </Label>
            <h3 className="max-w-[26ch] font-display text-display-md font-medium">
              Not technologies. The same four instincts, four times.
            </h3>
          </Reveal>

          <dl className="grid grid-cols-1 gap-x-14 pt-12 lg:grid-cols-2">
            {repeatingIdeas.map((idea, i) => (
              <Reveal
                key={idea.title}
                delay={Math.min(i, 3) * 0.05}
                className="border-t border-rule py-7"
              >
                <dt className="flex items-baseline gap-4">
                  <span className="index-num tnum text-annotate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-display-sm font-medium">{idea.title}</span>
                </dt>
                <dd className="max-w-measure pl-9 pt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {idea.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
