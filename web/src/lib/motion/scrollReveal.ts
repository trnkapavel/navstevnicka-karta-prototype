import type { Transition, Variants } from "motion/react";
import { cinematicEase } from "./presets";

/** Jednorázový reveal (hero, intro) */
export const revealViewport = {
  once: true,
  margin: "-10% 0px -5% 0px",
} as const;

/** Opakovaný reveal — bloky najíždějí a zase mizí při scrollu */
export const revealViewportRepeat = {
  once: false,
  amount: 0.45,
  margin: "-8% 0px -12% 0px",
} as const;

export const revealTransition = (reduced: boolean, delay = 0): Transition =>
  reduced
    ? { duration: 0 }
    : { duration: 0.65, ease: cinematicEase, delay };

export const revealExitTransition = (reduced: boolean): Transition =>
  reduced ? { duration: 0 } : { duration: 0.45, ease: cinematicEase };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: cinematicEase },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: cinematicEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

/** Výrazné číslo u položky — scale reveal s červeným akcentem */
export const indexReveal: Variants = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: cinematicEase },
  },
};

export const staggerParent = (stagger = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

export const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};
