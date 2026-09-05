import { Link } from "react-router-dom";
import Seo from "@/components/kit/Seo";
import { now } from "@/content/now";
import { site } from "@/content/site";
import { latestExperiment, experimentCount } from "@/content/experiments";
import { chapters } from "@/content/chapters";
import { FieldTag, Label, Mark } from "@/components/kit/Editorial";
import { LineReveal, Reveal } from "@/components/kit/motion";

/**
 * The /now page. A standing answer to "what is this person actually doing at
 * the moment", separate from the archive so it can be updated without touching
 * the story.
 */
export default function NowPage() {
  const openChapter = chapters.find((c) => c.open);

  return (
    <>
      <Seo
        title={`Now — ${now.updated} · ${site.name}`}
        description={`Currently: ${now.question} — building LEA and rent guarantee infrastructure, studying data science, exploring alternative data and payment rails.`}
        path="/now"
      />

      <div className="gutter pt-[calc(var(--nav-h)+4rem)]">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <FieldTag>Now</FieldTag>
          <div className="flex items-center gap-5">
            <Mark label="Live" />
            <Label>Updated {now.updated}</Label>
          </div>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={["Right now"]}
          className="pt-8 text-display-xl font-medium"
        />

        <Reveal delay={0.18} className="max-w-[34ch] pt-8">
          <p className="font-story text-[1.5rem] font-light italic leading-tight text-ink sm:text-[1.9rem]">
            &ldquo;{now.question}&rdquo;
          </p>
          <Label className="block pt-4">The question I&apos;m holding</Label>
        </Reveal>

        <dl className="pt-16">
          {now.blocks.map((block, i) => (
            <Reveal
              key={block.label}
              delay={Math.min(i, 4) * 0.05}
              className="grid grid-cols-1 gap-x-14 gap-y-3 border-t border-rule py-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
            >
              <dt className="flex items-baseline gap-4">
                <span className="index-num tnum text-annotate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-display-sm font-medium">{block.label}</span>
              </dt>
              <dd>
                <ul className="max-w-measure space-y-2.5">
                  {block.lines.map((line) => (
                    <li key={line} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {line}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="grid grid-cols-1 gap-6 border-t border-rule pt-8 sm:grid-cols-3">
          {[
            { k: "Current chapter", v: now.chapter, to: "/#journey" },
            {
              k: "Latest experiment",
              v: `Exp. ${latestExperiment.id} — ${latestExperiment.question}`,
              to: "/lab",
            },
            { k: "Experiment count", v: `${experimentCount} logged`, to: "/lab" },
          ].map((s) => (
            <Reveal key={s.k}>
              <Label className="block pb-2">{s.k}</Label>
              <Link to={s.to} className="pen-link block max-w-[30ch] text-[0.9375rem] leading-snug text-ink">
                {s.v}
              </Link>
            </Reveal>
          ))}
        </div>

        {openChapter && (
          <Reveal className="py-28 sm:py-40">
            <div className="max-w-measure">
              <Label tone="annotate" className="block pb-4">
                Chapter {openChapter.id} — {openChapter.title}
              </Label>
              {openChapter.body.map((p) => (
                <p key={p.slice(0, 20)} className="pb-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <p className="pt-4 font-display text-display-sm font-medium text-ink">
                Still being written
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}
