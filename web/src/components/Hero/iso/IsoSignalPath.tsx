"use client";

import { motion, useReducedMotion } from "motion/react";
import { cinematicEase, motionTransition } from "@/lib/motion/presets";

type IsoSignalPathProps = {
  d: string;
  stepIndex: number;
  totalSteps: number;
};

export function IsoSignalPath({ d, stepIndex, totalSteps }: IsoSignalPathProps) {
  const reduced = useReducedMotion() ?? false;
  const pathLength = Math.min(1, (stepIndex + 1) / totalSteps);

  const transition = motionTransition(reduced, {
    duration: 1.1,
    ease: cinematicEase,
  });

  return (
    <g className="iso-path-group">
      <path
        d={d}
        fill="none"
        stroke="rgba(244,241,236,0.06)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        className="iso-signal-path-active"
        d={d}
        fill="none"
        stroke="url(#iso-signal)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#iso-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength }}
        transition={transition}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(181,0,0,0.18)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength }}
        transition={transition}
      />
    </g>
  );
}
