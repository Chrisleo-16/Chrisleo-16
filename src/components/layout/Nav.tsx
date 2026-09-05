import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/content/site";
import { useSectionNav } from "@/lib/useSectionNav";
import { Label, Mark } from "@/components/kit/Editorial";
import { EASE } from "@/components/kit/motion";

/** Home-page anchors the nav can be "inside of". */
const SPY_IDS = ["journey", "builds"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const go = useSectionNav();
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which home-page section the reader is currently inside.
  useEffect(() => {
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    const targets = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setSection(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeHref = useMemo(() => {
    if (pathname !== "/") {
      return nav.find((i) => !i.href.startsWith("/#") && pathname.startsWith(i.href))?.href ?? null;
    }
    return section ? `/#${section}` : null;
  }, [pathname, section]);

  const handle = (href: string) => {
    setOpen(false);
    go(href);
  };

  return (
    <>
      <a
        href="#main"
        className="ui-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b transition-colors duration-500 ${
          scrolled ? "border-rule bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <nav className="gutter flex h-full items-center justify-between" aria-label="Primary">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="ui-label text-ink">{site.initials}</span>
            <span className="ui-label hidden text-muted-foreground transition-colors group-hover:text-ink sm:inline">
              / Field notes
            </span>
          </Link>

          {/* Where you are is crossed off in red pen, not highlighted. */}
          <div className="hidden items-center gap-7 md:flex">
            {nav.map((item) => {
              const active = activeHref === item.href;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handle(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`ui-label transition-colors ${
                    active ? "ui-active" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <Link
              to="/now"
              aria-current={pathname === "/now" ? "page" : undefined}
              className="group flex items-center gap-2 border-l border-rule pl-7"
              aria-label="What I'm doing right now"
            >
              <Mark />
              <span className={`ui-label ${pathname === "/now" ? "ui-active" : "text-ink"}`}>
                Now
              </span>
              <span
                aria-hidden="true"
                className="text-annotate transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-index"
            className="ui-label text-ink md:hidden"
          >
            {open ? "Close" : "Index"}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-index"
            className="fixed inset-0 z-40 bg-paper pt-[var(--nav-h)] md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="gutter flex h-full flex-col overflow-y-auto pb-24 pt-10">
              <Label className="pb-6">Index</Label>
              <ul className="flex flex-col">
                {[...nav, { label: "Now", href: "/now" }].map((item, i) => {
                  const active =
                    item.href === "/now" ? pathname === "/now" : activeHref === item.href;
                  return (
                    <motion.li
                      key={item.label}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.05 + i * 0.05 }}
                      className="border-t border-rule"
                    >
                      <button
                        type="button"
                        onClick={() => handle(item.href)}
                        aria-current={active ? "page" : undefined}
                        className="flex w-full items-baseline gap-5 py-5 text-left"
                      >
                        <span className="index-num tnum">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-display text-display-md font-medium ${
                            active
                              ? "ui-active"
                              : item.label === "Now"
                                ? "text-annotate"
                                : "text-ink"
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-col gap-3 border-t border-rule pt-6">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ui-link"
                >
                  GitHub ↗
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ui-link"
                >
                  LinkedIn ↗
                </a>
                <a href={site.links.email} className="ui-link">
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
