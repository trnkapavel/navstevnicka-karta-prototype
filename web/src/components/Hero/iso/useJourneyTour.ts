"use client";

import { useCallback, useEffect, useState } from "react";
import { SIGNAL_PATH_ORDER } from "./beatPlatforms";

const INTERVAL_MS = 4800;

type JourneyTourOptions = {
  enabled?: boolean;
  externalBeat?: number;
};

export function useJourneyTour(options: JourneyTourOptions = {}) {
  const { enabled = true, externalBeat } = options;
  const [stepIndex, setStepIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeBeat = SIGNAL_PATH_ORDER[stepIndex] ?? 1;
  const visitedBeats = SIGNAL_PATH_ORDER.slice(0, stepIndex + 1);

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    window.setTimeout(() => setPaused(false), INTERVAL_MS * 2);
  }, []);

  const goToBeat = useCallback(
    (beat: number) => {
      const idx = SIGNAL_PATH_ORDER.indexOf(
        beat as (typeof SIGNAL_PATH_ORDER)[number],
      );
      if (idx >= 0) setStepIndex(idx);
      pauseBriefly();
    },
    [pauseBriefly],
  );

  const goNext = useCallback(() => {
    setStepIndex((i) => (i + 1) % SIGNAL_PATH_ORDER.length);
  }, []);

  useEffect(() => {
    if (!enabled || paused) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [enabled, paused, goNext]);

  useEffect(() => {
    if (!externalBeat) return;
    const idx = SIGNAL_PATH_ORDER.indexOf(
      externalBeat as (typeof SIGNAL_PATH_ORDER)[number],
    );
    if (idx >= 0) setStepIndex(idx);
  }, [externalBeat]);

  return { activeBeat, stepIndex, visitedBeats, goToBeat, goNext };
}
