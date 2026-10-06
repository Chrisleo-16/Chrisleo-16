import Seo, { personJsonLd } from "@/components/kit/Seo";
import Hero from "@/components/sections/Hero";
import BuildsIndex from "@/components/sections/BuildsIndex";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import { site } from "@/content/site";

/**
 * The front page is four screens: who I am, what I've built, how I got here,
 * how to reach me. Everything with a paragraph in it lives one click away —
 * the case files, /lab, /notes, /about, /now.
 */
export default function Index() {
  return (
    <>
      <Seo
        title="Leo Chrisben Evans — Builder, Nairobi"
        description={`${site.tagline} Builds: LEA Residency, Nielekeze, usage metering, Jua Link.`}
        path="/"
        jsonLd={personJsonLd}
      />
      <Hero />
      <BuildsIndex num="01" />
      <Journey num="02" />
      <Contact num="03" />
    </>
  );
}
