"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { journeyMeta, journeySections } from "@/data/journeyData";
import { springSnappy } from "@/lib/motion/presets";
import { HeroVisual } from "./HeroVisual";
import styles from "./Hero.module.css";

type HeroProps = {
  heroVisual?: "iso" | "spline";
  splineSceneUrl?: string;
  activeBeat?: number;
  onBeatChange?: (beat: number) => void;
};

export function Hero({
  heroVisual = "iso",
  splineSceneUrl,
  activeBeat: controlledBeat,
  onBeatChange,
}: HeroProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const [tourBeat, setTourBeat] = useState(1);
  const tourEnabled = controlledBeat === undefined;
  const activeBeat = tourEnabled ? tourBeat : controlledBeat;
  const { eyebrow, hero } = journeyMeta;
  const activeTag =
    journeySections.find((s) => s.index === activeBeat)?.tag ?? "";

  const handleBeatChange = (beat: number) => {
    if (tourEnabled) setTourBeat(beat);
    onBeatChange?.(beat);
  };

  return (
    <section
      className={styles.hero}
      aria-label="Úvod"
      data-scene-ready={sceneReady || undefined}
    >
      <div className={styles.atmosphere} aria-hidden>
        <div className={styles.grain} />
        <div className={styles.vignette} />
        <div className={styles.lightLeak} />
      </div>

      <div className={styles.visual}>
        <div className={styles.sceneAura} />
        <HeroVisual
          mode={heroVisual}
          splineSceneUrl={splineSceneUrl}
          onReady={() => setSceneReady(true)}
          onBeatChange={handleBeatChange}
          tourEnabled={tourEnabled}
          externalBeat={tourEnabled ? undefined : activeBeat}
        />
      </div>

      <div className={styles.captionStrip} aria-hidden />

      <div className={styles.copyPanel}>
        <div className={styles.copy}>
          <span className={styles.accent} aria-hidden />
          <p className={styles.eyebrow}>
            {eyebrow}
            <AnimatePresence mode="wait">
              {activeTag && (
                <motion.span
                  key={activeTag}
                  className={styles.eyebrowBeat}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={springSnappy}
                >
                  {" "}
                  · {activeTag}
                </motion.span>
              )}
            </AnimatePresence>
          </p>
          <h1 className={styles.h1}>
            <span className={styles.h1Line}>{hero.h1Line1}</span>
            <span className={styles.h1Line}>{hero.h1Line2Prefix.trim()}</span>
            <span className={styles.h1Line}>
              <em className={styles.h1Em}>{hero.h1Emphasis}</em> {hero.h1Line3}
            </span>
          </h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden>
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
