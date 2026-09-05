import { Link, useLocation } from "react-router-dom";
import Seo from "@/components/kit/Seo";
import { FieldTag, Label } from "@/components/kit/Editorial";
import { LineReveal, Reveal } from "@/components/kit/motion";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <Seo
        title="Not in the archive (404)"
        description="This page isn't part of the archive — yet."
        path={pathname}
      />

      <div className="gutter flex min-h-[calc(100svh-var(--rail-h))] flex-col justify-center pt-[var(--nav-h)]">
        <Reveal>
          <FieldTag>404 — not filed</FieldTag>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.08}
          lines={["This one isn't", "in the archive."]}
          className="pt-8 text-display-lg font-medium"
        />

        <Reveal delay={0.2} className="max-w-[40ch] pt-7">
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
            Which is either a broken link or a page I haven&apos;t written yet. Both happen.
          </p>
          <Label className="mt-4 block">Requested: {pathname}</Label>
        </Reveal>

        <Reveal delay={0.28} className="flex flex-wrap gap-x-8 gap-y-3 pt-10">
          {[
            { to: "/", label: "Start at the beginning" },
            { to: "/#builds", label: "Case files" },
            { to: "/lab", label: "The lab" },
            { to: "/now", label: "What I'm doing now" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="pen-link ui-label"
            >
              {l.label}
            </Link>
          ))}
        </Reveal>
      </div>
    </>
  );
}
