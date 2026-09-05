import Seo, { personJsonLd } from "@/components/kit/Seo";
import { about, whyIBuild } from "@/content/about";
import { site } from "@/content/site";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { DrawRule, LineReveal, Reveal } from "@/components/kit/motion";

/**
 * Not a biography. An answer to "who am I becoming?" — which means it has to
 * include the parts I can't do yet, and end without closing.
 */
export default function AboutPage() {
  return (
    <>
      <Seo
        title={`About — ${site.name}`}
        description={about.becoming}
        path="/about"
        jsonLd={personJsonLd}
      />

      <div className="gutter pt-[calc(var(--nav-h)+4rem)]">
        <Reveal>
          <FieldTag>About</FieldTag>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={["Who I'm", "becoming"]}
          className="pt-8 text-display-xl font-medium"
        />

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 pt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <Reveal delay={0.18} className="max-w-[44ch]">
            <p className="font-story text-[1.35rem] font-light italic leading-snug text-ink sm:text-[1.6rem]">
              {about.becoming}
            </p>
            <div className="space-y-4 pt-9">
              {whyIBuild.slice(0, 2).map((p) => (
                <p key={p.slice(0, 20)} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="w-[min(64vw,260px)] lg:w-[min(26vw,300px)]">
            <figure>
              <img
                src={site.portrait.src}
                width={site.portrait.width}
                height={site.portrait.height}
                alt={site.portrait.alt}
                loading="lazy"
                decoding="async"
                className="w-full select-none"
              />
              <figcaption className="pt-3">
                <Label>Nairobi · photo {site.portrait.credit}</Label>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="pt-20">
          <DrawRule />
          <dl className="pt-2">
            {about.sections.map((s, i) => (
              <Reveal
                key={s.label}
                delay={Math.min(i, 4) * 0.04}
                className="grid grid-cols-1 gap-x-14 gap-y-3 border-b border-rule py-9 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
              >
                <dt className="flex items-baseline gap-4">
                  <span className="index-num tnum text-annotate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-display-sm font-medium">{s.label}</span>
                </dt>
                <dd className="max-w-measure space-y-4">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 20)} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* The open ending. */}
        <div className="py-28 sm:py-40">
          <Reveal className="max-w-[26ch]">
            {about.closing.map((line, i) => (
              <p
                key={line}
                className={`font-display text-display-md font-medium ${
                  i === 0 ? "text-ink" : "pt-4 text-annotate"
                }`}
              >
                {line}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </>
  );
}
