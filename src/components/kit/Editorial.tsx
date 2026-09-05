import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DrawRule, EASE, Reveal } from "./motion";

/* ────────────────────────────────────────────────────────────────────────────
   Editorial primitives.

   The whole site is built from five things: a rule, a monospace label, an index
   number, a display line, and whitespace. No cards. No rounded rectangles.
   ──────────────────────────────────────────────────────────────────────────── */

/** Monospace metadata label — the voice of the notebook margin. */
export function Label({
  children,
  className = "",
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "ink" | "annotate";
}) {
  const tones = {
    muted: "text-muted-foreground",
    ink: "text-ink",
    annotate: "text-annotate",
  } as const;
  return (
    <span
      className={` text-meta uppercase tracking-[0.16em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** A bracketed field label: [ CURRENTLY EXPLORING ] */
export function FieldTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Label className={className}>
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </Label>
  );
}

/**
 * A live marker. Static by design — nothing on this site blinks, pulses or
 * loops; the red square is enough to say "this part is current".
 */
export function Mark({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-annotate" />
      {label ? <Label tone="ink">{label}</Label> : null}
    </span>
  );
}

/**
 * Section header. Rule, index number, label, then the display line.
 * `note` sits on the right at desktop — the editor's gloss on the section.
 */
export function SectionHead({
  num,
  label,
  title,
  note,
  id,
  spotlight = false,
  className = "",
}: {
  num: string;
  label: string;
  title: ReactNode;
  note?: ReactNode;
  id?: string;
  /** Marked because the reader's chosen lens says this section answers them. */
  spotlight?: boolean;
  className?: string;
}) {
  return (
    <header id={id} className={`scroll-mt-28 ${className}`}>
      <DrawRule />
      <div className="flex items-baseline justify-between gap-6 pt-4">
        <div className="flex items-baseline gap-4">
          {spotlight && <Mark className="translate-y-[-1px]" />}
          <Label tone="annotate" className="tnum">
            {num}
          </Label>
          <Label tone={spotlight ? "ink" : "muted"}>{label}</Label>
        </div>
        {note ? (
          <p className="hidden max-w-measure-sm text-right text-sm leading-snug text-muted-foreground sm:block">
            {note}
          </p>
        ) : null}
      </div>
      <Reveal className="pt-10 sm:pt-14">
        <h2 className="text-display-lg font-medium">{title}</h2>
      </Reveal>
      {note ? (
        <p className="max-w-measure pt-5 text-sm leading-relaxed text-muted-foreground sm:hidden">
          {note}
        </p>
      ) : null}
    </header>
  );
}

/**
 * A vertical flow diagram — the arrow chain. Used for the LEA evolution and
 * anywhere the point is *why one thing became another*.
 */
export function Flow({
  steps,
  className = "",
}: {
  steps: { label: string; note?: string }[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <ol className={`relative ${className}`} aria-label="How this evolved">
      <div
        className="absolute left-[5px] top-2 bottom-8 w-px bg-rule"
        aria-hidden="true"
      />
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <motion.li
            key={step.label}
            className="relative pl-8 pb-9 last:pb-0"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border ${
                last ? "border-annotate bg-annotate" : "border-rule bg-paper"
              }`}
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="index-num tnum">{String(i + 1).padStart(2, "0")}</span>
              <h4
                className={`font-display text-display-sm font-medium ${
                  last ? "text-annotate" : "text-ink"
                }`}
              >
                {step.label}
              </h4>
            </div>
            {step.note ? (
              <p className="max-w-measure-sm pt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.note}
              </p>
            ) : null}
          </motion.li>
        );
      })}
    </ol>
  );
}

/** Big pull quote in the storytelling serif. Used sparingly — once per page. */
export function Pull({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <Reveal as="figure" className="relative py-2">
      <span
        aria-hidden="true"
        className="absolute left-0 top-3 hidden h-8 w-6 border-l border-t border-annotate sm:block"
      />
      <blockquote className="story-quote max-w-[30ch] sm:pl-12">{children}</blockquote>
      {cite ? (
        <figcaption className="pt-4 sm:pl-12">
          <Label>{cite}</Label>
        </figcaption>
      ) : null}
    </Reveal>
  );
}

/** Key/value metadata row, like a specimen card in an archive. */
export function DataRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-rule py-3">
      <Label className="shrink-0">{k}</Label>
      <div className="text-right text-sm leading-snug text-ink">{v}</div>
    </div>
  );
}
