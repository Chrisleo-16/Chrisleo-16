import { nav, site } from "@/content/site";
import { now } from "@/content/now";
import { useSectionNav } from "@/lib/useSectionNav";
import { Label } from "@/components/kit/Editorial";

/** The colophon. Metadata from a personal research notebook, not a sitemap. */
export default function Footer() {
  const go = useSectionNav();

  const stamps = [
    { k: "Last updated", v: now.updated },
    { k: "Current chapter", v: now.chapter.replace("Chapter ", "Ch. ") },
    { k: "Open question", v: now.question },
    { k: "Located", v: `${site.location} · ${site.tzLabel}` },
  ];

  return (
    <footer className="border-t border-rule pt-16">
      <div className="gutter">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="max-w-[24ch] font-display text-display-md font-medium">
              This story is still being written.
            </p>
            <p className="max-w-measure-sm pt-5 text-sm leading-relaxed text-muted-foreground">
              If any of it overlaps with what you're working on — fintech, alternative data,
              property, or something that hasn't been named yet — I'd like to hear about it.
            </p>
            <a
              href={site.links.email}
              className="mt-6 inline-flex items-center gap-2 font-display text-display-sm font-medium text-ink"
            >
              <span className="pen-link">{site.email}</span>
              <span aria-hidden="true" className="text-annotate">
                ↗
              </span>
            </a>
          </div>

          <nav aria-label="Footer">
            <Label className="block pb-5">Index</Label>
            <ul className="flex flex-col gap-2.5">
              {[...nav, { label: "Now", href: "/now" }].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => go(item.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-ink"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Label className="block pb-5">Elsewhere</Label>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "GitHub", href: site.links.github },
                { label: "LinkedIn", href: site.links.linkedin },
                { label: "CV (PDF)", href: site.links.cv },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-muted-foreground transition-colors hover:text-ink"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {stamps.map((s) => (
            <div key={s.k} className="border-b border-rule py-5 pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0">
              <dt>
                <Label>{s.k}</Label>
              </dt>
              <dd className="max-w-[28ch] pt-2 text-sm leading-snug text-ink">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Label>
            © {new Date().getFullYear()} {site.name}
          </Label>
          <Label>Built, broken and rebuilt in Nairobi</Label>
        </div>
      </div>
    </footer>
  );
}
