import { toolkit } from "@/content/toolkit";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

/**
 * The tools, grouped by what they let me think about. No logos, no proficiency
 * bars, no count of "technologies mastered" — a list of tools tells you almost
 * nothing, so the useful information here is the purpose above each set.
 */
export default function Toolkit({ num = "08", note, spotlight }: SectionProps) {
  return (
    <section className="gutter pt-28 sm:pt-40">
      <SectionHead
          spotlight={spotlight}
        id="tools"
        num={num}
        label="Instruments"
        title={
          <>
            The tools
            <br />
            I think with
          </>
        }
        note={note ?? "Grouped by the kind of question they help me ask."}
      />

      <dl className="pt-14 sm:pt-20">
        {toolkit.map((group, i) => (
          <Reveal
            key={group.key}
            delay={Math.min(i, 4) * 0.05}
            className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-rule py-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,16rem)_minmax(0,1fr)]"
          >
            <dt className="flex items-baseline gap-4">
              <span className="index-num tnum text-annotate">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-display-sm font-medium">{group.label}</span>
            </dt>

            <dd className="text-[0.875rem] leading-relaxed text-muted-foreground lg:pt-1">
              {group.purpose}
            </dd>

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
    </section>
  );
}
