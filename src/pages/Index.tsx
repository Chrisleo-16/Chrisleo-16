import type { ComponentType } from "react";
import Seo, { personJsonLd } from "@/components/kit/Seo";
import Hero from "@/components/sections/Hero";
import LensBar from "@/components/sections/LensBar";
import LensGate from "@/components/sections/LensGate";
import Currently from "@/components/sections/Currently";
import Journey from "@/components/sections/Journey";
import BuildsIndex from "@/components/sections/BuildsIndex";
import LeaStory from "@/components/sections/LeaStory";
import Postmortems from "@/components/sections/Postmortems";
import Lab from "@/components/sections/Lab";
import Community from "@/components/sections/Community";
import Toolkit from "@/components/sections/Toolkit";
import WhyIBuild from "@/components/sections/WhyIBuild";
import NotesPreview from "@/components/sections/NotesPreview";
import Contact from "@/components/sections/Contact";
import type { SectionProps } from "@/components/sections/section";
import type { SectionKey } from "@/content/lenses";
import { useLens } from "@/lib/lens";
import { site } from "@/content/site";

/**
 * One registry, one reading order.
 *
 * The default order is the argument: present tense → how I got here → what I
 * built → the one that changed → what broke → what I'm testing → who I do it
 * with → what I use → why → what I think → how to reach me.
 *
 * A lens permutes that order and marks the sections that answer its question.
 * It never adds, removes or duplicates a section.
 */
const SECTIONS: Record<SectionKey, ComponentType<SectionProps & { limit?: number }>> = {
  now: Currently,
  journey: Journey,
  builds: BuildsIndex,
  lea: LeaStory,
  broke: Postmortems,
  lab: (p) => <Lab {...p} limit={6} />,
  community: Community,
  tools: Toolkit,
  why: WhyIBuild,
  writing: (p) => <NotesPreview {...p} limit={3} />,
  contact: Contact,
};

function Archive() {
  const { lens, order, isSpotlit, noteFor } = useLens();

  // The first section sits directly under the lens bar, so it doesn't need the
  // full section gap above it — especially after a choice scrolls you here.
  return (
    <div className="[&>section:first-of-type]:pt-16 sm:[&>section:first-of-type]:pt-24">
      {order.map((key, i) => {
        const Section = SECTIONS[key];
        return (
          <Section
            key={key}
            num={String(i + 1).padStart(2, "0")}
            spotlight={isSpotlit(key)}
            note={noteFor(key, "") || undefined}
            {...(key === "builds" && lens?.maxBuilds ? { limit: lens.maxBuilds } : {})}
          />
        );
      })}
    </div>
  );
}

export default function Index() {
  return (
    <>
      <Seo
        title="Leo Chrisben Evans — Field Notes of a Builder"
        description={`${site.thesis} An unfolding archive of questions, builds, failures and pivots — LEA, fintech experiments, AI systems and alternative data, from Nairobi.`}
        path="/"
        jsonLd={personJsonLd}
      />
      <Hero />
      <LensGate />
      <LensBar />
      <Archive />
    </>
  );
}
