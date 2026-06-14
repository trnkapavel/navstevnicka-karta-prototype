"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import { motionTransition, springTravel } from "@/lib/motion/presets";
import { lerpPoint, type Point } from "./isoMath";

type IsoTravelerProps = {
  pathPoints: Point[];
  stepIndex: number;
};

export function IsoTraveler({ pathPoints, stepIndex }: IsoTravelerProps) {
  const reduced = useReducedMotion() ?? false;

  const pos = useMemo(() => {
    const i = Math.min(stepIndex, pathPoints.length - 1);
    const a = pathPoints[i]!;
    const b = pathPoints[Math.min(i + 1, pathPoints.length - 1)]!;
    if (i >= pathPoints.length - 1) return a;
    return lerpPoint(a, b, 0.35);
  }, [pathPoints, stepIndex]);

  return (
    <motion.g
      className="iso-traveler"
      animate={{ x: pos.x, y: pos.y }}
      transition={motionTransition(reduced, springTravel)}
      style={{ pointerEvents: "none" }}
    >
      <motion.circle
        r={14}
        className="iso-traveler-halo"
        animate={
          reduced
            ? { scale: 1, opacity: 0.5 }
            : { scale: [0.85, 1.25, 0.85], opacity: [0.35, 0.75, 0.35] }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
      />
      <circle r={6} className="iso-traveler-core" />
      <circle cy={-9} r={3} className="iso-traveler-head" />
    </motion.g>
  );
}
