import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { builds, getBuild } from "@/content/builds";
import Seo from "@/components/kit/Seo";
import { FieldTag, Flow, Label, Pull } from "@/components/kit/Editorial";
import { EvidenceRow, StateTag, accentRail } from "@/components/kit/BuildBits";
import { DrawRule, LineReveal, Reveal } from "@/components/kit/motion";
import { site } from "@/content/site";

/** One numbered part of the case file. */
function Part({
  num,
  title,
  children,
  lede,
}: {
  num: string;
  title: string;
  children: ReactNode;
  lede?: boolean;
}) {
  return (
    <Reveal as="section" className="border-t border-rule py-10 sm:py-12">
      <header className="flex items-baseline gap-4 pb-6">
        <span className="index-num tnum text-annotate">{num}</span>
        <h2 className="ui-label text-ink">{title}</h2>
      </header>
      <div className={lede ? "max-w-[46ch]" : "max-w-measure"}>{children}</div>
    </Reveal>
  );
}

const Body = ({ children }: { children: ReactNode }) => (
  <p className="text-[1.0625rem] leading-[1.75] text-ink/85">{children}</p>
);

export default function BuildDetail() {
  const { slug = "" } = useParams();
  const build = getBuild(slug);
  if (!build) return <Navigate to="/404" replace />;

  const i = builds.findIndex((b) => b.slug === slug);
  const next = builds[(i + 1) % builds.length];

  return (
    <>
      <Seo
        title={`${build.name} — Case file ${build.index} · ${site.name}`}
        description={build.question}
        path={`/builds/${build.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: build.name,
          description: build.built,
          codeRepository: build.links.source,
          programmingLanguage: build.stack,
          author: { "@type": "Person", name: site.name, url: site.url },
        }}
      />

      <article className="gutter pt-[calc(var(--nav-h)+4rem)]">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <FieldTag>Case file {build.index}</FieldTag>
          <StateTag state={build.state} period={build.period} />
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={[build.name]}
          className="pt-8 text-display-xl font-medium"
        />
        {build.aka && (
          <Reveal delay={0.14}>
            <Label className="block pt-3">by {build.aka}</Label>
          </Reveal>
        )}

        <Reveal delay={0.2} className="max-w-[46ch] pt-7">
          <p className="font-story text-[1.25rem] font-light italic leading-snug text-ink sm:text-[1.4rem]">
            {build.question}
          </p>
        </Reveal>

        <div
          aria-hidden="true"
          className={`mt-12 h-6 w-full opacity-60 ${accentRail[build.accent]}`}
        />

        <div className="grid grid-cols-1 gap-x-16 pt-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="order-2 lg:order-1">
            <Part num="01" title="The question" lede>
              <Body>{build.question}</Body>
            </Part>

            <Part num="02" title="The idea">
              <Body>{build.idea}</Body>
            </Part>

            <Part num="03" title="The build">
              <Body>{build.built}</Body>
            </Part>

            <Part num="04" title="Under the hood">
              <Body>{build.hood.intro}</Body>

              {build.hood.flow && (
                <div className="pt-10">
                  <div className="field-grid border border-rule p-6 sm:p-9">
                    <Label tone="ink" className="block pb-8">
                      The path an answer takes
                    </Label>
                    <Flow steps={build.hood.flow} />
                    {build.hood.flowCaption && (
                      <p className="code mt-8 border-t border-rule pt-5 leading-relaxed text-muted-foreground">
                        {build.hood.flowCaption}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <dl className="pt-12">
                {build.hood.decisions.map((d, di) => (
                  <div key={d.title} className="border-t border-rule py-6">
                    <dt className="flex items-baseline gap-4">
                      <span className="index-num tnum">{String(di + 1).padStart(2, "0")}</span>
                      <span className="font-display text-display-sm font-medium">{d.title}</span>
                    </dt>
                    <dd className="pl-9 pt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {d.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </Part>

            <Part num="05" title="The hard part">
              <Body>{build.hardPart}</Body>
            </Part>

            <Part num="06" title="What I learned">
              <div className="space-y-5">
                {build.learned.map((l) => (
                  <Body key={l.slice(0, 24)}>{l}</Body>
                ))}
              </div>
            </Part>

            <Part num="07" title="Where it led">
              <Body>{build.ledTo}</Body>

              {build.connects && build.connects.length > 0 && (
                <ul className="pt-9">
                  {build.connects.map((c) => {
                    const other = getBuild(c.slug);
                    if (!other) return null;
                    return (
                      <li key={c.slug} className="border-t border-rule py-4">
                        <Link to={`/builds/${c.slug}`} className="group flex flex-col gap-1.5">
                          <span className="flex items-baseline gap-2.5">
                            <span aria-hidden="true" className="text-annotate">
                              →
                            </span>
                            <span className="pen-link ui-label">{other.name}</span>
                          </span>
                          <span className="pl-6 text-[0.875rem] leading-snug text-muted-foreground">
                            {c.via}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="border-t border-rule" />
                </ul>
              )}

              {build.evolution && (
                <div className="pt-12">
                  <Label tone="ink" className="block pb-6">
                    The evolution
                  </Label>
                  <div className="field-grid border border-rule p-6 sm:p-9">
                    <Flow steps={build.evolution.chain} />
                  </div>
                  <dl className="pt-10">
                    {build.evolution.stages.map((s, si) => {
                      const last = si === build.evolution!.stages.length - 1;
                      return (
                        <div
                          key={s.label}
                          className={`border-t py-5 ${last ? "border-annotate/60" : "border-rule"}`}
                        >
                          <dt>
                            <Label tone={last ? "annotate" : "ink"}>{s.label}</Label>
                          </dt>
                          <dd className="pt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                            {s.body}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              )}
            </Part>

            <Part num="08" title="Source">
              <Body>
                What follows is the difference between what I&apos;ve claimed above and what you
                can go and check for yourself.
              </Body>
              <div className="pt-8">
                <EvidenceRow evidence={build.evidence} />
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
                <a
                  href={build.links.source}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pen-link ui-label"
                >
                  Repository ↗
                </a>
                {build.links.live && (
                  <a
                    href={build.links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ui-link"
                  >
                    Live ↗
                  </a>
                )}
                {build.links.docs && (
                  <a
                    href={build.links.docs}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ui-link"
                  >
                    Docs ↗
                  </a>
                )}
              </div>
            </Part>
            <DrawRule />

            <Reveal className="pt-12">
              <Pull cite={`${build.name} · the one line worth keeping`}>{build.taught}</Pull>
            </Reveal>
          </div>

          {/* Specimen card — the record, kept deliberately secondary. */}
          <aside className="order-1 mb-12 lg:order-2 lg:mb-0 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start lg:pt-10">
            <Label tone="ink" className="block pb-3">
              Record
            </Label>
            <dl>
              <div className="border-t border-rule py-3.5">
                <dt>
                  <Label>Kind of problem</Label>
                </dt>
                <dd className="pt-1.5">
                  <span className="meta-xs text-ink">
                    {build.themes.map((t) => t.replace("-", " ")).join("  ·  ")}
                  </span>
                </dd>
              </div>
              {build.hover.map((h) => (
                <div key={h.k} className="border-t border-rule py-3.5">
                  <dt>
                    <Label>{h.k}</Label>
                  </dt>
                  <dd className="pt-1.5 text-[0.9375rem] leading-snug text-ink">{h.v}</dd>
                </div>
              ))}
              <div className="border-t border-rule py-3.5">
                <dt>
                  <Label>Built with</Label>
                </dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-2">
                  {build.stack.map((s) => (
                    <span key={s} className="stack-item text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <nav className="mt-20 border-t border-rule pt-6" aria-label="Case file navigation">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Link to="/#builds" className="group inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="text-annotate transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              <span className="ui-label text-muted-foreground transition-colors group-hover:text-ink">
                All builds
              </span>
            </Link>

            <Link to={`/builds/${next.slug}`} className="group text-right">
              <Label className="block pb-1.5">Next · {next.index}</Label>
              <span className="font-display text-display-sm font-medium">
                {next.name}
                <span
                  aria-hidden="true"
                  className="ml-3 inline-block text-annotate transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </div>
        </nav>
      </article>
    </>
  );
}
