import { site } from "@/content/site";
import { now } from "@/content/now";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { EnterRise, LineReveal } from "@/components/kit/motion";
import { useSectionNav } from "@/lib/useSectionNav";

/**
 * The hero states a position, not a job title. No CTA pair, no stat row, no
 * marquee of logos — just the question the rest of the site is an attempt at.
 *
 * Everything here animates in CSS: this is the LCP block and it should not
 * wait for React.
 */
export default function Hero() {
  const go = useSectionNav();

  return (
    <section
      className="gutter relative flex min-h-[calc(100svh-var(--rail-h))] flex-col pt-[calc(var(--nav-h)+2rem)]"
      aria-labelledby="thesis"
    >
      <EnterRise delay={0.05} className="flex items-baseline justify-between gap-6">
        <FieldTag>Field notes / {new Date().getFullYear()}</FieldTag>
        <div className="flex items-baseline gap-5 sm:gap-7">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="ui-link "
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="ui-link "
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </EnterRise>

      <div className="grid flex-1 items-center gap-x-12 gap-y-10 py-9 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <LineReveal
            as="h1"
            delay={0.15}
            lines={["I'm trying", "to figure out", "what technology", <>can actually&nbsp;do.</>]}
            className="text-display-xl font-medium"
          />
          <span id="thesis" className="sr-only">
            {site.thesis}
          </span>

          <EnterRise delay={0.6} className="pt-9 sm:pt-11">
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
              {site.subthesis}
            </p>
          </EnterRise>

          <EnterRise delay={0.72} className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
            <button
              type="button"
              onClick={() => go("/#journey")}
              className="group flex items-center gap-2.5 text-left"
            >
              <span aria-hidden="true" className="text-annotate">
                ↓
              </span>
              <span className="pen-link ui-label">
                Start at chapter one
              </span>
            </button>
            <button
              type="button"
              onClick={() => go("/#builds")}
              className="ui-link"
            >
              Or go straight to the builds
            </button>
          </EnterRise>
        </div>

        {/*
          The photograph doesn't sit in a frame — it falls away into shadow and
          breaks into pixels at the edges, then rebuilds itself on load. It is
          the only image on the home page, and it carries the whole tone.
        */}
        <EnterRise
          as="figure"
          delay={0.3}
          className="relative mx-auto h-[min(36vh,320px)] w-fit lg:mx-0 lg:h-[min(60vh,520px)]"
        >
          <img
            src={site.portrait.src}
            width={site.portrait.width}
            height={site.portrait.height}
            alt={site.portrait.alt}
            fetchPriority="high"
            decoding="async"
            className="block h-full w-auto select-none"
          />
          <img
            src={site.portrait.lofi}
            alt=""
            aria-hidden="true"
            className="resolve pointer-events-none absolute inset-0 h-full w-full select-none"
          />
          <figcaption className="absolute -bottom-7 left-0">
            {/* <Label>Fig. 01 — listening</Label> */}
          </figcaption>
        </EnterRise>
      </div>

      <EnterRise
        delay={0.84}
        className="flex flex-col gap-3 border-t border-rule py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Label tone="ink">Currently exploring</Label>
          <span aria-hidden="true" className="text-annotate">
            →
          </span>
          <p className="ui-label text-muted-foreground">
            {site.exploring.join("  ×  ")}
          </p>
        </div>
        <Label className="shrink-0">
          {site.location} · Last updated {now.updated}
        </Label>
      </EnterRise>
    </section>
  );
}
