import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lenses } from "@/content/lenses";
import { useLens } from "@/lib/lens";
import { Label } from "@/components/kit/Editorial";
import { EASE } from "@/components/kit/motion";

/**
 * One control, sitting between the hero and the archive.
 *
 * It doesn't ask a question and wait for an answer — it offers a way of
 * reading. Selecting a lens reorders the sections below and marks the ones
 * that answer that particular question. Nothing is hidden, nothing is
 * duplicated, and the whole thing can be ignored.
 */
export default function LensBar() {
  const { lens, setLens } = useLens();
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="lens-heading"
      className="gutter scroll-mt-28 border-y border-rule py-5"
      id="lens"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
          {/* The way back to the question, for anyone who scrolled past it. */}
          <h2 id="lens-heading">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("lens:ask"))}
              className="group inline-flex items-baseline gap-2"
            >
              <Label className="transition-colors group-hover:text-ink">View through a lens</Label>
              <span aria-hidden="true" className="text-annotate opacity-0 transition-opacity group-hover:opacity-100">
                ↻
              </span>
            </button>
          </h2>

          <div role="group" aria-label="Reading lens" className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {lenses.map((l) => {
              const active = lens?.key === l.key;
              return (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setLens(l.key)}
                  aria-pressed={active}
                  title={l.full}
                  className={`ui-label transition-colors ${
                    active ? "ui-active" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-baseline gap-6">
          <AnimatePresence mode="wait">
            {lens && (
              <motion.div
                key={lens.key}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-2"
              >
                <p className="max-w-[52ch] font-story text-[1.0625rem] font-light italic leading-snug text-ink">
                  {lens.intro}
                </p>
                {lens.action && (
                  <a
                    href={lens.action.href}
                    target={lens.action.external ? "_blank" : undefined}
                    rel={lens.action.external ? "noreferrer noopener" : undefined}
                    className="pen-link ui-label shrink-0"
                  >
                    {lens.action.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setLens(null)}
                  className="ui-link shrink-0"
                >
                  Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
