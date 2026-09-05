import { useMemo, useState } from "react";
import Seo from "@/components/kit/Seo";
import { experiments } from "@/content/experiments";
import type { ExperimentOutcome } from "@/content/types";
import { ExperimentEntry } from "@/components/sections/Lab";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { LineReveal, Reveal } from "@/components/kit/motion";
import { site } from "@/content/site";

const FILTERS: { key: "all" | ExperimentOutcome; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "running", label: "Running" },
  { key: "shipped", label: "Kept" },
  { key: "inconclusive", label: "Unresolved" },
  { key: "abandoned", label: "Dropped" },
];

export default function LabPage() {
  const [filter, setFilter] = useState<"all" | ExperimentOutcome>("all");
  const shown = useMemo(
    () => (filter === "all" ? experiments : experiments.filter((x) => x.outcome === filter)),
    [filter],
  );

  const counts = useMemo(
    () =>
      experiments.reduce<Record<string, number>>((acc, x) => {
        acc[x.outcome] = (acc[x.outcome] ?? 0) + 1;
        return acc;
      }, {}),
    [],
  );

  return (
    <>
      <Seo
        title={`The Lab — ${experiments.length} experiments · ${site.name}`}
        description="Small questions answered cheaply: automation, agents, alternative data, vector search, offline-first events. Most of them were dropped, on purpose."
        path="/lab"
      />

      <div className="gutter pt-[calc(var(--nav-h)+4rem)]">
        <Reveal>
          <FieldTag>The lab</FieldTag>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={["Experiments"]}
          className="pt-8 text-display-xl font-medium"
        />

        <Reveal delay={0.18} className="max-w-[46ch] pt-6">
          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
            Things that only had to be interesting enough to try. An experiment counts as a
            success if it settles a question — including when the answer is &ldquo;no, stop&rdquo;.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="flex flex-wrap gap-x-8 gap-y-2 pt-10">
          {(["running", "shipped", "inconclusive", "abandoned"] as const).map((k) => (
            <span key={k} className="flex items-baseline gap-2">
              <span className="tnum meta-ink">
                {String(counts[k] ?? 0).padStart(2, "0")}
              </span>
              <Label>{FILTERS.find((f) => f.key === k)?.label}</Label>
            </span>
          ))}
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-rule pt-5">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`border px-3 py-1.5 ui-label text-[0.6875rem] transition-colors ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-muted-foreground hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul className="grid grid-cols-1 gap-4 pb-24 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((x, i) => (
            <ExperimentEntry key={x.id} x={x} index={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
