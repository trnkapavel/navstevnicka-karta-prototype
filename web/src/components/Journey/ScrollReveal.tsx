"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import {
  fadeUp,
  revealTransition,
  revealViewportRepeat,
} from "@/lib/motion/scrollReveal";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variants?: Variants;
};

export function ScrollReveal({
  children,
  delay = 0,
  variants = fadeUp,
  ...props
}: ScrollRevealProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewportRepeat}
      transition={revealTransition(reduced, delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
