import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lenses } from "@/content/lenses";
import { useLens } from "@/lib/lens";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { EASE } from "@/components/kit/motion";

/**
 * The lens question, on request.
 *
 * It used to fire on the first scroll away from the hero. It no longer does:
 * a reader who has just arrived shouldn't be stopped and asked anything. The
 * page reads top to bottom in its default order, and the question is only put
 * to someone who clicks "View through a lens" in the bar.
 *
 * Deliberately not a dialog box: no card, no shadow, no rounded corners. The
 * paper itself frosts and the question is set in the same type as the rest of
 * the site. Escape, a click away, "show me everything" or a decisive scroll
 * all get past it.
 */

/** How much deliberate scrolling counts as "not now", after the grace period. */
const PUSH_PAST = 260;
const GRACE_MS = 900;

export default function LensGate() {
  const { setLens, reveal } = useLens();
  const [open, setOpen] = useState(false);
  const openedAt = useRef(0);
  const pushed = useRef(0);
  const reduce = useReducedMotion();

  const ask = useCallback(() => {
    openedAt.current = Date.now();
    pushed.current = 0;
    setOpen(true);
  }, []);

  // The lens bar is the only thing that opens the question.
  useEffect(() => {
    window.addEventListener("lens:ask", ask);
    return () => window.removeEventListener("lens:ask", ask);
  }, [ask]);

  const dismiss = useCallback(() => {
    setOpen(false);
    reveal();
  }, [reveal]);

  const choose = (key: string) => {
    setOpen(false);
    setLens(key);
    // Land on the lens bar, so the reordered archive starts under the choice.
    window.setTimeout(() => {
      document.getElementById("lens")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }, 80);
  };

  // While the question is up the page holds still. Momentum from the scroll
  // that opened it must not count, so dismissal needs sustained intent.
  useEffect(() => {
    if (!open) return;

    // Freeze the page where it stands. `overflow: hidden` alone would collapse
    // the scroll height and throw the reader back to the top on dismissal, so
    // the position is pinned and restored by hand — with the scrollbar's width
    // padded back in, or the whole layout jumps sideways.
    const { body } = document;
    const y = window.scrollY;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const onWheel = (e: WheelEvent) => {
      if (Date.now() - openedAt.current < GRACE_MS) return;
      pushed.current += Math.abs(e.deltaY);
      if (pushed.current > PUSH_PAST) dismiss();
    };
    const onTouch = () => {
      if (Date.now() - openedAt.current < GRACE_MS) return;
      pushed.current += 60;
      if (pushed.current > PUSH_PAST) dismiss();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;
      window.scrollTo(0, y);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[45] flex touch-none items-center overscroll-none bg-paper/70 backdrop-blur-[10px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <div role="group" aria-labelledby="gate-heading" className="gutter w-full py-10">
            <div className="border-t border-ink pt-5">
              <FieldTag>Before you read on</FieldTag>
            </div>

            <h2 id="gate-heading" className="max-w-[16ch] pt-7 text-display-lg font-medium sm:pt-9">
              What are you here for?
            </h2>

            <p className="max-w-[46ch] pt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Tell me what you came for and I&apos;ll put that first.
            </p>

            <ul className="pt-9 sm:pt-11">
              {lenses.map((l, i) => (
                <motion.li
                  key={l.key}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.05 }}
                  className="border-t border-rule"
                >
                  <button
                    type="button"
                    onClick={() => choose(l.key)}
                    className="group flex w-full items-baseline gap-5 py-4 text-left sm:gap-7"
                  >
                    <span className="index-num tnum text-annotate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-display-sm font-medium text-ink transition-transform duration-500 ease-archive group-hover:translate-x-1 motion-reduce:transform-none">
                      {l.full}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto text-annotate opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
              <button type="button" onClick={dismiss} className="pen-link ui-label">
                Show me everything
              </button>
              <Label className="hidden sm:inline">Or press Escape</Label>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
