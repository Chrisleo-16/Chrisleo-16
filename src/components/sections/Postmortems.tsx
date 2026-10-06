import { postmortems } from "@/content/postmortems";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

const beats = [
  { key: "assumed", label: "I assumed" },
  { key: "happened", label: "What happened" },
  { key: "changed", label: "What changed" },
] as const;

/**
 * Things that didn't work.
 *
 * This section exists because a portfolio where everything succeeded is a
 * portfolio you can't learn anything from. Each entry has to end in a changed
 * behaviour — otherwise it's just a war story.
 */
export default function Postmortems({ num = "05", note, spotlight }: SectionProps) {
  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
          spotlight={spotlight}
        id="broke"
        num={num}
        label="Wrong turns"
        title={
          <>
            Things that
            <br />
            didn&apos;t work
          </>
        }
        note={note ?? "Four places where reality corrected a belief. This is the part that shows how I think."}
      />

      <ol className="grid grid-cols-1 gap-x-16 pt-14 lg:grid-cols-2 sm:pt-20">
        {postmortems.map((pm, i) => (
          <Reveal
            as="li"
            key={pm.id}
            delay={Math.min(i, 4) * 0.04}
            className="border-t border-rule py-9"
          >
            <div className="flex items-baseline gap-4">
              <span className="index-num tnum text-annotate">{pm.id}</span>
              <div className="min-w-0">
                <h3 className="font-display text-display-sm font-medium">{pm.title}</h3>
                <Label className="block pt-1.5">{pm.where}</Label>
              </div>
            </div>

            <dl className="pt-7">
              {beats.map((beat, bi) => (
                <div
                  key={beat.key}
                  className="grid grid-cols-1 gap-1 border-t border-rule/70 py-3.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5"
                >
                  <dt className="flex items-baseline gap-2">
                    <span aria-hidden="true" className="text-annotate">
                      {bi === 2 ? "→" : "·"}
                    </span>
                    <Label>{beat.label}</Label>
                  </dt>
                  <dd
                    className={`text-[0.9375rem] leading-relaxed ${
                      bi === 2 ? "text-ink" : "text-muted-foreground"
                    }`}
                  >
                    {pm[beat.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
