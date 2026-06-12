"use client";

import { motion, useReducedMotion } from "motion/react";
import { journeyMeta } from "@/data/journeyData";
import {
  fadeUp,
  revealTransition,
  revealViewportRepeat,
} from "@/lib/motion/scrollReveal";
import styles from "./ChapterIntro.module.css";

export function ChapterIntro() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className={styles.intro} aria-label="Úvod k cestě hosta">
      <motion.p
        className={styles.text}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewportRepeat}
        transition={revealTransition(reduced)}
      >
        {journeyMeta.chapterIntro}
      </motion.p>
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={revealViewportRepeat}
        transition={revealTransition(reduced, 0.15)}
      />
    </section>
  );
}
