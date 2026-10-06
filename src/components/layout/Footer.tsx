import { nav, site } from "@/content/site";
import { now } from "@/content/now";
import { useSectionNav } from "@/lib/useSectionNav";
import { Label } from "@/components/kit/Editorial";

/** The colophon. One band: where to go next, where else I am, when this changed. */
export default function Footer() {
  const go = useSectionNav();

  return (
    <footer className="border-t border-rule pt-10">
      <div className="gutter">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <a
            href={site.links.email}
            className="inline-flex items-center gap-2 font-display text-display-sm font-medium text-ink"
          >
            <span className="pen-link">{site.email}</span>
            <span aria-hidden="true" className="text-annotate">
              ↗
            </span>
          </a>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {[...nav, { label: "Now", href: "/now" }].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "GitHub", href: site.links.github },
              { label: "LinkedIn", href: site.links.linkedin },
              { label: "CV (PDF)", href: site.links.cv },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-muted-foreground transition-colors hover:text-ink"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
          <Label>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </Label>
          <Label>Last updated {now.updated}</Label>
        </div>
      </div>
    </footer>
  );
}
