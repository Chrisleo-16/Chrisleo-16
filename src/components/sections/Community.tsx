import { community } from "@/content/community";
import { Flow, Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * The community chapter. Framed as the third thing I've learned to build —
 * not as a line item with a title attached to it.
 */
export default function Community({ num = "07", note, spotlight }: SectionProps) {
  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
          spotlight={spotlight}
        id="community"
        num={num}
        label="Not alone"
        title={
          <>
            Building systems,
            <br />
            then products,
            <br />
            then rooms
          </>
        }
        note={note ?? "The part of this that has nothing to do with code, and taught me the most about why things get adopted."}
      />

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:pt-20">
        <div>
          <Reveal>
            <p className="max-w-[24ch] font-story text-[1.5rem] font-light italic leading-tight text-ink sm:text-[1.8rem]">
              {community.premise}
            </p>
          </Reveal>

          <Reveal className="max-w-measure space-y-5 pt-10">
            {community.body.map((p) => (
              <p key={p.slice(0, 24)} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="border-t border-rule pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-display-sm font-medium">{community.org}</h3>
              <Label className="shrink-0">{community.period}</Label>
            </div>
            <Label tone="annotate" className="block pt-2">
              {community.role}
            </Label>

            <ul className="space-y-3 pt-8">
              {community.doing.map((d, i) => (
                <li key={d} className="flex gap-4">
                  <span className="index-num tnum pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>

            <div className="pt-10">
              <Label className="block pb-6">The progression</Label>
              <Flow
                steps={[
                  { label: "Systems" },
                  { label: "Products" },
                  { label: "Communities" },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
