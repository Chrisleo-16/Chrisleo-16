import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { now } from "@/content/now";
import { experimentCount } from "@/content/experiments";
import ThemeToggle from "./ThemeToggle";

/**
 * The rail along the bottom of every page. This is the "the archive is alive"
 * signal: a real clock in Nairobi, how far down the document you are, the
 * running experiment count, and a way into the archive's own index.
 *
 * It doubles as the entry point for the assistant, which is why there is no
 * floating chat bubble anywhere on this site.
 */
export default function StatusRail() {
  const [clock, setClock] = useState("--:--");
  const [progress, setProgress] = useState(0);
  const frame = useRef<number>();

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: site.timezone,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(
          max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0,
        );
        frame.current = undefined;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      {/* Read-position hairline. The only progress indicator on the site. */}
      <div className="relative h-px w-full bg-rule">
        <div
          className="h-px origin-left bg-annotate transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>

      <div className="pointer-events-auto bg-paper/90 backdrop-blur-md">
        <div className="gutter flex h-[var(--rail-h)] items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap sm:gap-6">
            <span className="meta-sm text-muted-foreground">Nairobi</span>
            <span className="tnum meta-sm text-ink">
              {clock} {site.tzLabel}
            </span>
            <span className="hidden meta-sm text-muted-foreground lg:inline">
              {now.chapter}
            </span>
            <span className="hidden meta-sm text-muted-foreground xl:inline">
              Experiments {String(experimentCount).padStart(3, "0")}
            </span>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap sm:gap-6">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("archive:open"))
              }
              className="meta-sm text-muted-foreground transition-colors hover:text-ink"
            >
              Ask the archive
            </button>
            <ThemeToggle />
            <span className="tnum hidden meta-sm text-muted-foreground sm:inline">
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
