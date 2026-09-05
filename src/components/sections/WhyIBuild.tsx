import { whyIBuild } from "@/content/about";
import type { SectionProps } from "./section";
import { FieldTag, Mark } from "@/components/kit/Editorial";
import { DrawRule, Reveal } from "@/components/kit/motion";

/**
 * The quiet section. No diagram, no list, no links out — just the argument,
 * set large in the storytelling serif. Everything else on the page is evidence
 * for this.
 */
export default function WhyIBuild({ num = "09", spotlight }: SectionProps) {
  return (
    <section id="why" className="pt-28 scroll-mt-28 sm:pt-40">
      <div className="gutter">
        <DrawRule />
        <div className="flex items-baseline gap-4 pt-4">
          {spotlight && <Mark />}
          <FieldTag>{num} — Why I build</FieldTag>
        </div>

        <div className="grid grid-cols-1 pt-16 lg:grid-cols-[9rem_minmax(0,1fr)] sm:pt-24">
          <div aria-hidden="true" />
          <div className="max-w-[38ch] space-y-8">
            {whyIBuild.map((p, i) => (
              <Reveal key={p.slice(0, 20)} delay={i * 0.06}>
                <p
                  className={`font-story text-[1.375rem] font-light leading-[1.45] tracking-[-0.01em] sm:text-[1.75rem] ${
                    i === whyIBuild.length - 1 ? "text-ink" : "text-ink/70"
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
