"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { cinematicEase } from "@/lib/motion/presets";
import {
  BEAT_PLATFORMS,
  MAP_ORIGIN,
  MAP_VIEWBOX,
  SIGNAL_PATH_ORDER,
  getPlatform,
} from "./beatPlatforms";
import { centerOf, pathFromPoints } from "./isoMath";
import { IsoBackdrop } from "./IsoBackdrop";
import { IsoCrowds } from "./IsoCrowds";
import { IsoFiller } from "./IsoFiller";
import { IsoLabelsLayer } from "./IsoLabelsLayer";
import { IsoPlatform } from "./IsoPlatform";
import { IsoScenesLayer } from "./IsoScenesLayer";
import { IsoSignalPath } from "./IsoSignalPath";
import { IsoStairs } from "./IsoStairs";
import { IsoTraveler } from "./IsoTraveler";
import { useJourneyTour } from "./useJourneyTour";
import styles from "./IsoJourneyMap.module.css";

type IsoJourneyMapProps = {
  onReady?: () => void;
  onBeatChange?: (beat: number) => void;
  tourEnabled?: boolean;
  externalBeat?: number;
};

export function IsoJourneyMap({
  onReady,
  onBeatChange,
  tourEnabled = true,
  externalBeat,
}: IsoJourneyMapProps) {
  const readyRef = useRef(false);
  const { activeBeat, stepIndex, visitedBeats, goToBeat } = useJourneyTour({
    enabled: tourEnabled,
    externalBeat: tourEnabled ? undefined : externalBeat,
  });

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    onBeatChange?.(activeBeat);
  }, [activeBeat, onBeatChange]);

  const pathPoints = SIGNAL_PATH_ORDER.map((beat) => {
    const p = getPlatform(beat);
    return centerOf(p.gx, p.gy, p.w, p.d, p.elev, MAP_ORIGIN);
  });

  const signalPath = pathFromPoints(pathPoints);

  const sortedPlatforms = [...BEAT_PLATFORMS].sort(
    (a, b) => a.gx + a.gy - (b.gx + b.gy),
  );

  return (
    <motion.div
      className={styles.wrap}
      data-ready
      data-active-beat={activeBeat}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 0.05 }}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
        preserveAspectRatio="xMaxYMid meet"
        role="img"
        aria-label="Izometrická mapa Customer Journey — 8 fází hotelu"
      >
        <defs>
          <linearGradient id="iso-wall-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ebe9e5" />
            <stop offset="100%" stopColor="#ddd9d4" />
          </linearGradient>
          <linearGradient id="iso-wall-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0eeea" />
            <stop offset="100%" stopColor="#e5e2dd" />
          </linearGradient>
          <linearGradient id="iso-floor-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f7f5f1" />
          </linearGradient>
          <linearGradient id="iso-stair-face" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8e4e0" />
            <stop offset="100%" stopColor="#d8d4d0" />
          </linearGradient>
          <filter id="iso-platform-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(26,26,26,0.12)" />
          </filter>
          <linearGradient id="iso-signal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(220,40,40,0.5)" />
            <stop offset="45%" stopColor="#e02020" />
            <stop offset="100%" stopColor="rgba(181,0,0,0.7)" />
          </linearGradient>
          <linearGradient id="iso-badge-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(181,0,0,0.45)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="iso-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <IsoBackdrop origin={MAP_ORIGIN} />
        <IsoFiller origin={MAP_ORIGIN} />
        <IsoStairs origin={MAP_ORIGIN} />

        {sortedPlatforms.map((platform, i) => (
          <IsoPlatform
            key={platform.beat}
            platform={platform}
            origin={MAP_ORIGIN}
            index={i}
            activeBeat={activeBeat}
            visited={visitedBeats.includes(
              platform.beat as (typeof SIGNAL_PATH_ORDER)[number],
            )}
            onSelect={goToBeat}
          />
        ))}

        <IsoScenesLayer
          platforms={BEAT_PLATFORMS}
          origin={MAP_ORIGIN}
          activeBeat={activeBeat}
        />

        <IsoCrowds origin={MAP_ORIGIN} activeBeat={activeBeat} />

        <IsoSignalPath
          d={signalPath}
          stepIndex={stepIndex}
          totalSteps={SIGNAL_PATH_ORDER.length}
        />

        <IsoTraveler pathPoints={pathPoints} stepIndex={stepIndex} />

        <IsoLabelsLayer
          platforms={BEAT_PLATFORMS}
          origin={MAP_ORIGIN}
          activeBeat={activeBeat}
        />
      </svg>
    </motion.div>
  );
}
