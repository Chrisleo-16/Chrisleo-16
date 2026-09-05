import { useEffect } from "react";
import { site } from "@/content/site";

type SeoProps = {
  title: string;
  description: string;
  /** Path only, e.g. "/notes/apis-are-not-features". */
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** JSON-LD to inject for this route. */
  jsonLd?: Record<string, unknown>;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-route document metadata for a client-rendered app. Small on purpose —
 * a full head manager would be another dependency for four tags and a canonical.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = `${site.url}/media/og-cover.jpg`,
  type = "website",
  publishedTime,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const url = `${site.url}${path}`;
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    if (publishedTime) {
      setMeta(
        'meta[property="article:published_time"]',
        "property",
        "article:published_time",
        publishedTime,
      );
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image, type, publishedTime]);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.route = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: "Chrisben",
  url: site.url,
  image: `${site.url}/media/og-cover.jpg`,
  email: site.email,
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  alumniOf: { "@type": "CollegeOrUniversity", name: site.study.where },
  knowsAbout: [
    "Software engineering",
    "Data science",
    "Fintech",
    "Payment systems",
    "Alternative data",
    "Property technology",
  ],
  sameAs: [site.links.github, site.links.linkedin],
};
