import type { BuildState, Evidence, EvidenceKind } from "@/content/types";
import { Label } from "./Editorial";

/**
 * The pieces that only the builds use.
 *
 * The evidence row is the important one: it separates what I claim from what a
 * visitor can go and check. A build that is half-finished says so here, which is
 * the whole reason the row exists.
 */

const evidenceMark: Record<EvidenceKind, { label: string; mark: string; tone: string }> = {
  running: { label: "Running", mark: "■", tone: "text-annotate" },
  built: { label: "Built", mark: "□", tone: "text-ink" },
  verified: { label: "Verified", mark: "✓", tone: "text-ink" },
  documented: { label: "Documented", mark: "≡", tone: "text-ink" },
  partial: { label: "Unfinished", mark: "~", tone: "text-muted-foreground" },
};

export function EvidenceRow({
  evidence,
  className = "",
}: {
  evidence: Evidence[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="block pb-3">What you can inspect</Label>
      <ul className="flex flex-col gap-1.5">
        {evidence.map((e) => {
          const m = evidenceMark[e.kind];
          const body = (
            <>
              <span aria-hidden="true" className={`w-3 shrink-0 ${m.tone}`}>
                {m.mark}
              </span>
              <span className={`meta-xs w-[5.5rem] shrink-0 ${m.tone}`}>{m.label}</span>
              <span className="text-[0.875rem] leading-snug text-muted-foreground">{e.note}</span>
            </>
          );
          return (
            <li key={e.kind + e.note}>
              {e.href ? (
                <a
                  href={e.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-baseline gap-3 transition-colors hover:text-ink"
                >
                  {body}
                  <span aria-hidden="true" className="text-annotate">
                    ↗
                  </span>
                </a>
              ) : (
                <div className="flex items-baseline gap-3">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const stateLabel: Record<BuildState, string> = {
  live: "Live",
  building: "Building",
  prototype: "Prototype",
  scaffold: "Scaffold",
};

export function StateTag({ state, period }: { state: BuildState; period: string }) {
  return (
    <span className="flex items-baseline gap-3 whitespace-nowrap">
      <Label className="tnum">{period}</Label>
      <span className="flex items-baseline gap-2">
        <span
          aria-hidden="true"
          className={`inline-block h-1.5 w-1.5 translate-y-[-1px] ${
            state === "live" ? "bg-annotate" : "border border-muted-foreground"
          }`}
        />
        <Label tone={state === "live" ? "ink" : "muted"}>{stateLabel[state]}</Label>
      </span>
    </span>
  );
}

/**
 * A texture per build, drawn from what the thing actually is:
 * a ruled ledger, a survey grid, a meter's segments, a broadcast signal.
 * Four looks, one system — they are all hairlines in the rule colour.
 */
export const accentRail: Record<string, string> = {
  ledger:
    "bg-[repeating-linear-gradient(to_bottom,hsl(var(--rule))_0_1px,transparent_1px_9px)]",
  map: "bg-[linear-gradient(to_right,hsl(var(--rule))_0_1px,transparent_1px_10px),linear-gradient(to_bottom,hsl(var(--rule))_0_1px,transparent_1px_10px)]",
  meter:
    "bg-[repeating-linear-gradient(to_bottom,hsl(var(--rule))_0_5px,transparent_5px_7px,hsl(var(--annotate))_7px_8px,transparent_8px_14px)]",
  signal:
    "bg-[repeating-linear-gradient(to_bottom,hsl(var(--rule))_0_3px,transparent_3px_12px)]",
};
