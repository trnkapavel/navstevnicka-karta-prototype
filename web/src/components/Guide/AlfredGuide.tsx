"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAlfredCopy } from "@/lib/alfredGuide";
import { gentleEase, springAlfred } from "@/lib/motion/presets";
import styles from "./AlfredGuide.module.css";

type AlfredGuideProps = {
  activeBeat: number;
  hidden?: boolean;
};

type Phase = "hidden" | "entering" | "pointing" | "visible" | "exiting";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Čekáme, až uživatel na fázi chvíli zůstane — méně nervózních přeskoků */
const BEAT_SETTLE_MS = 520;
/** Krátké skrytí při pin scrollu nevyvolá celý exit cyklus */
const HIDDEN_DEBOUNCE_MS = 300;

export function AlfredGuide({ activeBeat, hidden = false }: AlfredGuideProps) {
  const reduced = useReducedMotion() ?? false;
  const [settledBeat, setSettledBeat] = useState(activeBeat);
  const [shownBeat, setShownBeat] = useState(activeBeat);
  const [stableHidden, setStableHidden] = useState(hidden);
  const [phase, setPhase] = useState<Phase>(reduced ? "visible" : "hidden");
  const runId = useRef(0);
  const mounted = useRef(false);
  const copy = getAlfredCopy(shownBeat);

  useEffect(() => {
    if (!hidden) {
      setStableHidden(false);
      return;
    }
    const timer = window.setTimeout(() => setStableHidden(true), HIDDEN_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [hidden]);

  useEffect(() => {
    if (reduced) {
      setSettledBeat(activeBeat);
      return;
    }
    const timer = window.setTimeout(() => setSettledBeat(activeBeat), BEAT_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [activeBeat, reduced]);

  const pointHold = useCallback(async (id: number) => {
    if (reduced) {
      setPhase("visible");
      return;
    }
    setPhase("pointing");
    await wait(480);
    if (id !== runId.current) return;
    setPhase("visible");
  }, [reduced]);

  const enterSequence = useCallback(
    async (beat: number) => {
      const id = ++runId.current;
      setShownBeat(beat);
      if (reduced) {
        setPhase("visible");
        return;
      }
      setPhase("entering");
      await wait(200);
      if (id !== runId.current) return;
      await pointHold(id);
    },
    [pointHold, reduced],
  );

  const exitSequence = useCallback(async () => {
    const id = ++runId.current;
    if (reduced) {
      setPhase("hidden");
      return;
    }
    setPhase("pointing");
    await wait(320);
    if (id !== runId.current) return;
    setPhase("exiting");
    await wait(720);
    if (id !== runId.current) return;
    setPhase("hidden");
  }, [reduced]);

  /** Změna fáze bez úplného zmizení — jen krátký „ukazovací“ pulz */
  const refreshBeat = useCallback(
    async (beat: number) => {
      const id = ++runId.current;
      setShownBeat(beat);
      if (reduced) {
        setPhase("visible");
        return;
      }
      setPhase("pointing");
      await wait(340);
      if (id !== runId.current) return;
      setPhase("visible");
    },
    [reduced],
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (!stableHidden) void enterSequence(settledBeat);
      return;
    }

    if (stableHidden) {
      if (phase !== "hidden" && phase !== "exiting") {
        void exitSequence();
      }
      return;
    }

    if (phase === "hidden") {
      void enterSequence(settledBeat);
      return;
    }

    if (settledBeat !== shownBeat) {
      void refreshBeat(settledBeat);
    }
  }, [settledBeat, stableHidden]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "hidden") return null;

  const isExiting = phase === "exiting";
  const isPointing = phase === "pointing";
  const isEntering = phase === "entering";

  const softTransition = reduced
    ? { duration: 0 }
    : isExiting
      ? { duration: 0.85, ease: gentleEase }
      : springAlfred;

  const bubbleMotion = reduced
    ? {}
    : {
        initial: false as const,
        animate: isExiting
          ? { opacity: 0, x: 10, y: 14, scale: 0.98 }
          : isPointing
            ? { opacity: 1, x: -4, y: -2, scale: 1.005 }
            : isEntering
              ? { opacity: 0, x: 8, y: 10, scale: 0.99 }
              : { opacity: 1, x: 0, y: 0, scale: 1 },
        transition: softTransition,
      };

  const alfredMotion = reduced
    ? {}
    : {
        initial: false as const,
        animate: isExiting
          ? { opacity: 0, x: 14, y: 18, scale: 0.97, rotate: 1.5 }
          : isPointing
            ? { opacity: 1, x: -5, y: -3, scale: 1.01, rotate: -1.5 }
            : isEntering
              ? { opacity: 0, x: 12, y: 14, scale: 0.98, rotate: 0.5 }
              : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
        transition: softTransition,
      };

  return (
    <aside
      className={styles.wrap}
      data-phase={phase}
      aria-live="polite"
      aria-label="Průvodce Alfred"
    >
      <div className={styles.inner}>
        <motion.div className={styles.bubbleWrap} {...bubbleMotion}>
          <div className={styles.bubble}>
            <p className={styles.eyebrow}>
              Alfred · fáze {String(shownBeat).padStart(2, "0")}
            </p>
            <h2 className={styles.title}>{copy.title}</h2>
            <p className={styles.body}>{copy.body}</p>
            <span className={styles.bubbleTail} aria-hidden />
          </div>
        </motion.div>

        <motion.div className={styles.character} {...alfredMotion}>
          <div className={styles.figure}>
            <span className={styles.groundShadow} aria-hidden />
            <div className={styles.alfredPose}>
              <Image
                src="/illustration/alfred.svg"
                alt=""
                width={104}
                height={204}
                className={styles.alfredImg}
                priority
              />
              <span className={styles.pointBeam} aria-hidden />
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
