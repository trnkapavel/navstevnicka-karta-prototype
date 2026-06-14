import { JourneyPage } from "@/components/Journey/JourneyPage";

export default function Home() {
  const splineSceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;
  const heroVisual =
    process.env.NEXT_PUBLIC_HERO_VISUAL === "spline" ? "spline" : "iso";

  return (
    <JourneyPage heroVisual={heroVisual} splineSceneUrl={splineSceneUrl} />
  );
}
