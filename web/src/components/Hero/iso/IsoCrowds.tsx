"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Point } from "./isoMath";
import { centerOf } from "./isoMath";
import { BEAT_PLATFORMS } from "./beatPlatforms";
import { motionTransition } from "@/lib/motion/presets";

type CrowdConfig = {
  beat: number;
  group: { ox: number; oy: number }[];
  observers?: { ox: number; oy: number }[];
};

const CROWDS: CrowdConfig[] = [
  {
    beat: 2,
    group: [
      { ox: -14, oy: 4 },
      { ox: -6, oy: 6 },
      { ox: 2, oy: 5 },
    ],
    observers: [{ ox: 18, oy: -6 }],
  },
  {
    beat: 5,
    group: [
      { ox: -8, oy: 2 },
      { ox: 0, oy: 4 },
    ],
    observers: [
      { ox: 14, oy: -4 },
      { ox: 20, oy: 2 },
    ],
  },
  { beat: 6, group: [{ ox: -4, oy: 0 }, { ox: 6, oy: 2 }] },
  { beat: 4, group: [{ ox: -6, oy: 4 }, { ox: 4, oy: 6 }] },
  {
    beat: 7,
    group: [{ ox: -4, oy: 0 }],
    observers: [{ ox: 12, oy: -8 }],
  },
];

function Figure({
  x,
  y,
  variant = "guest",
}: {
  x: number;
  y: number;
  variant?: "guest" | "staff" | "observer";
}) {
  const color =
    variant === "staff"
      ? "rgba(181,0,0,0.7)"
      : variant === "observer"
        ? "rgba(244,241,236,0.28)"
        : "rgba(244,241,236,0.55)";

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-4} r={2.8} fill={color} />
      <path
        d="M -3 0 Q 0 1.5 3 0 L 2.5 7 Q 0 8.5 -2.5 7 Z"
        fill={color}
        opacity="0.9"
      />
    </g>
  );
}

export function IsoCrowds({
  origin,
  activeBeat,
}: {
  origin: Point;
  activeBeat: number;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <g className="iso-crowds" aria-hidden>
      {CROWDS.map((crowd) => {
        const p = BEAT_PLATFORMS.find((b) => b.beat === crowd.beat);
        if (!p) return null;
        const c = centerOf(p.gx, p.gy, p.w, p.d, p.elev, origin);
        const isActive = crowd.beat === activeBeat;
        const walkDuration = isActive ? 2.2 : 3.5;

        return (
          <g
            key={crowd.beat}
            className="iso-crowd-group"
            data-active={isActive || undefined}
          >
            <motion.g
              className="iso-crowd-walk"
              animate={reduced ? { x: 0 } : { x: [0, isActive ? 6 : 4, 0] }}
              transition={motionTransition(reduced, {
                duration: walkDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: crowd.beat * 0.2,
              })}
            >
              {crowd.group.map((f, i) => (
                <Figure
                  key={i}
                  x={c.x + f.ox}
                  y={c.y + f.oy}
                  variant={crowd.beat === 2 && i === 0 ? "staff" : "guest"}
                />
              ))}
            </motion.g>
            {crowd.observers?.map((o, i) => (
              <motion.g
                key={`o-${i}`}
                className="iso-crowd-observe"
                animate={
                  reduced
                    ? { y: 0, opacity: 0.6 }
                    : { y: [0, -2, 0], opacity: [0.5, 0.85, 0.5] }
                }
                transition={motionTransition(reduced, {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                })}
              >
                <Figure x={c.x + o.ox} y={c.y + o.oy} variant="observer" />
              </motion.g>
            ))}
          </g>
        );
      })}
    </g>
  );
}
