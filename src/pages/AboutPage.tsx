import Seo, { personJsonLd } from "@/components/kit/Seo";
import { about, whyIBuild } from "@/content/about";
import { chapters } from "@/content/chapters";
import { postmortems } from "@/content/postmortems";
import { toolkit } from "@/content/toolkit";
import { site } from "@/content/site";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { DrawRule, LineReveal, Reveal } from "@/components/kit/motion";

/** A small heading for the sub-sections of this page. */
function Head({ label, title }: { label: string; title: string }) {
  return (
    <Reveal className="pt-20 sm:pt-28">
      <DrawRule />
      <div className="pt-4">
        <FieldTag>{label}</FieldTag>
      </div>
      <h2 className="pt-6 text-display-md font-medium">{title}</h2>
    </Reveal>
  );
}

/**
 * The long version. Everything the front page refuses to say lives here:
 * who I'm becoming, the journey in full, the things that didn't work, and
 * the tools. It is allowed to be long, because nobody arrives here by accident.
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
              {whyIBuild.map((p) => (
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

        <div className="pt-16">
          <DrawRule />
          <dl className="pt-2">
            {about.sections.map((s, i) => (
              <Reveal
                key={s.label}
                delay={Math.min(i, 4) * 0.04}
                className="grid grid-cols-1 gap-x-14 gap-y-3 border-b border-rule py-7 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
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

        {/* The journey, in full. The front page shows one line per chapter. */}
        <Head label="The journey" title="Seven chapters, one of them unfinished" />
        <ol className="pt-8">
          {chapters.map((ch, i) => (
            <Reveal
              as="li"
              key={ch.id}
              delay={Math.min(i, 3) * 0.04}
              className={`grid grid-cols-1 gap-x-12 gap-y-3 border-t py-8 lg:grid-cols-[9rem_minmax(0,1fr)] ${
                ch.open ? "border-annotate/60" : "border-rule"
              }`}
            >
              <div>
                <Label tone={ch.open ? "annotate" : "muted"} className="tnum block">
                  Chapter {ch.id}
                </Label>
                <Label className="block pt-1">{ch.period}</Label>
              </div>
              <div>
                <h3 className="font-display text-display-sm font-medium">{ch.title}</h3>
                <p className="max-w-[38ch] pt-3 font-story text-[1.1rem] font-light italic leading-snug text-ink/85">
                  {ch.question}
                </p>
                <div className="max-w-measure space-y-4 pt-4">
                  {ch.body.map((p) => (
                    <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
                {ch.turn && (
                  <p className="mt-5 max-w-measure-sm border-l border-annotate pl-4 text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-ink">
                    <span className="text-annotate">What changed → </span>
                    {ch.turn}
                  </p>
                )}
                {ch.open && (
                  <p className="pt-5 ui-label text-annotate">This chapter is still being written</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Things that didn't work. */}
        <Head label="Wrong turns" title="Things that didn't work" />
        <ol className="grid grid-cols-1 gap-x-16 pt-8 lg:grid-cols-2">
          {postmortems.map((pm, i) => (
            <Reveal as="li" key={pm.id} delay={Math.min(i, 3) * 0.04} className="border-t border-rule py-7">
              <div className="flex items-baseline gap-4">
                <span className="index-num tnum text-annotate">{pm.id}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-display-sm font-medium">{pm.title}</h3>
                  <Label className="block pt-1.5">{pm.where}</Label>
                </div>
              </div>
              <dl className="pt-5">
                {(
                  [
                    ["I assumed", pm.assumed],
                    ["What happened", pm.happened],
                    ["What changed", pm.changed],
                  ] as const
                ).map(([k, v], bi) => (
                  <div key={k} className="grid grid-cols-1 gap-1 border-t border-rule/70 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5">
                    <dt>
                      <Label>{k}</Label>
                    </dt>
                    <dd className={`text-[0.9375rem] leading-relaxed ${bi === 2 ? "text-ink" : "text-muted-foreground"}`}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </ol>

        {/* The tools, grouped by what they let me think about. */}
        <Head label="Instruments" title="The tools I think with" />
        <dl className="pt-8">
          {toolkit.map((group, i) => (
            <Reveal
              key={group.key}
              delay={Math.min(i, 4) * 0.05}
              className="grid grid-cols-1 gap-x-10 gap-y-3 border-t border-rule py-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,16rem)_minmax(0,1fr)]"
            >
              <dt className="flex items-baseline gap-4">
                <span className="index-num tnum text-annotate">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-display-sm font-medium">{group.label}</span>
              </dt>
              <dd className="text-[0.875rem] leading-relaxed text-muted-foreground lg:pt-1">{group.purpose}</dd>
              <dd className="flex flex-wrap items-start gap-x-1.5 gap-y-2 lg:pt-1.5">
                {group.items.map((item, j) => (
                  <span key={item} className="stack-item text-ink">
                    {item}
                    {j < group.items.length - 1 && (
                      <span aria-hidden="true" className="pl-1.5 text-muted-foreground">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
        <div className="border-t border-rule" />
        <Reveal className="pt-5">
          <Label>
            Certified full-stack developer, Modcom Institute of Technology · Internships at Kiwami
            Tech and Xmobit
          </Label>
        </Reveal>

        {/* The open ending. */}
        <div className="py-24 sm:py-32">
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
