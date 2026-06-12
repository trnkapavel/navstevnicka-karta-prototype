"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { JourneySection } from "@/data/journeyData";
import { getChapterTheme } from "@/lib/chapterTheme";
import { useScrollTriggersReady } from "@/hooks/useScrollTriggers";
import { useJourneyScroll } from "@/hooks/useJourneyScroll";
import gsap from "gsap";
import { registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import {
  fadeUp,
  lineGrow,
  revealTransition,
  revealViewportRepeat,
  staggerParent,
} from "@/lib/motion/scrollReveal";
import { ChapterContent } from "./ChapterContent";
import { ChapterVisual } from "./ChapterVisual";
import styles from "./ChapterShell.module.css";

type ChapterShellProps = {
  section: JourneySection;
};

export function ChapterShell({ section }: ChapterShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const triggersReady = useScrollTriggersReady();
  const reduced = useReducedMotion() ?? false;
  const { setActiveBeat, prefersReducedMotion } = useJourneyScroll();

  const { index: beat, tag, h3, motion: chapterMotion } = section;
  const { profile } = chapterMotion;
  const theme = getChapterTheme(beat, profile);

  useGSAP(
    () => {
      if (!triggersReady || !sectionRef.current) return;
      registerGsapPlugins();

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => setActiveBeat(beat),
        onEnterBack: () => setActiveBeat(beat),
      });

      if (prefersReducedMotion || !visualRef.current) return;

      gsap.fromTo(
        visualRef.current,
        { opacity: 0.35, scale: 0.94, y: 24 },
        {
          opacity: theme === "light" ? 0.45 : 0.65,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
          },
        },
      );
    },
    {
      scope: sectionRef,
      dependencies: [beat, profile, theme, triggersReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      id={`chapter-${String(beat).padStart(2, "0")}`}
      className={styles.section}
      data-chapter={beat}
      data-profile={profile}
      data-theme={theme}
      aria-label={tag}
    >
      <div className={styles.atmosphere} aria-hidden />
      <div ref={visualRef} className={styles.visualWrap}>
        <ChapterVisual profile={profile} theme={theme} />
      </div>
      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewportRepeat}
        >
          <motion.span className={styles.index} variants={fadeUp}>
            {String(beat).padStart(2, "0")}
          </motion.span>
          <motion.span className={styles.tag} variants={fadeUp}>
            {tag}
          </motion.span>
        </motion.header>
        <motion.div
          className={styles.titleBlock}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewportRepeat}
          variants={staggerParent(0.06)}
        >
          <motion.h2 className={styles.title} variants={fadeUp}>
            {h3}
          </motion.h2>
          <motion.div
            className={styles.titleLine}
            variants={lineGrow}
            transition={revealTransition(reduced, 0.2)}
          />
        </motion.div>
        <ChapterContent section={section} />
      </div>
    </section>
  );
}
