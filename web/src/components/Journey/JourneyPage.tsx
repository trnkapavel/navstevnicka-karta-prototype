"use client";

import { epilogueContent, finaleCta, journeySections } from "@/data/journeyData";
import { useJourneyScroll } from "@/hooks/useJourneyScroll";
import { ScrollProvider } from "@/providers/ScrollProvider";
import { Hero } from "@/components/Hero/Hero";
import { Nav } from "@/components/Nav/Nav";
import { ChapterIntro } from "./ChapterIntro";
import { ChapterRenderer } from "./ChapterRenderer";
import { EpilogueSection } from "./EpilogueSection";
import { FinaleChapter } from "./FinaleChapter";
import { AlfredGuide } from "@/components/Guide/AlfredGuide";

type JourneyPageProps = {
  heroVisual?: "iso" | "spline";
  splineSceneUrl?: string;
};

function JourneyContent({ heroVisual, splineSceneUrl }: JourneyPageProps) {
  const { activeBeat, setActiveBeat, scrollProgress, isPinned } =
    useJourneyScroll();
  const heroControlsBeat = scrollProgress < 0.02;

  return (
    <>
      <Nav activeBeat={activeBeat} />
      <AlfredGuide activeBeat={activeBeat} hidden={isPinned} />
      <Hero
        heroVisual={heroVisual}
        splineSceneUrl={splineSceneUrl}
        activeBeat={heroControlsBeat ? undefined : activeBeat}
        onBeatChange={heroControlsBeat ? setActiveBeat : undefined}
      />
      <ChapterIntro />
      {journeySections.map((section) => (
        <ChapterRenderer key={section.id} section={section} />
      ))}
      {epilogueContent && <EpilogueSection epilogue={epilogueContent} />}
      <FinaleChapter finale={finaleCta} />
    </>
  );
}

export function JourneyPage({ heroVisual, splineSceneUrl }: JourneyPageProps) {
  return (
    <ScrollProvider>
      <main>
        <JourneyContent
          heroVisual={heroVisual}
          splineSceneUrl={splineSceneUrl}
        />
      </main>
    </ScrollProvider>
  );
}
