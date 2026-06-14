"use client";

import { IsoJourneyMap } from "./iso/IsoJourneyMap";
import { SplineScene } from "./SplineScene";

type HeroVisualProps = {
  mode: "iso" | "spline";
  splineSceneUrl?: string;
  onReady: () => void;
  onBeatChange?: (beat: number) => void;
  tourEnabled?: boolean;
  externalBeat?: number;
};

export function HeroVisual({
  mode,
  splineSceneUrl,
  onReady,
  onBeatChange,
  tourEnabled,
  externalBeat,
}: HeroVisualProps) {
  if (mode === "spline" && splineSceneUrl) {
    return <SplineScene sceneUrl={splineSceneUrl} onReady={onReady} />;
  }

  return (
    <IsoJourneyMap
      onReady={onReady}
      onBeatChange={onBeatChange}
      tourEnabled={tourEnabled}
      externalBeat={externalBeat}
    />
  );
}
