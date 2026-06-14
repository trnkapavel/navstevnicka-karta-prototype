"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  centerOf,
  lerpPoint,
  platformBase,
  platformCorners,
  type Point,
} from "./isoMath";
import type { BeatPlatform } from "./beatPlatforms";
import { getBeatMeta } from "./isoBeatMeta";
import { motionTransition, springGentle, springSnappy } from "@/lib/motion/presets";

type IsoPlatformProps = {
  platform: BeatPlatform;
  origin: Point;
  index: number;
  activeBeat: number;
  visited: boolean;
  onSelect: (beat: number) => void;
};

function polygonPoints(corners: Point[]) {
  return corners.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

function floorZone(top: Point[], inset = 0.08) {
  const cx = top.reduce((s, p) => s + p.x, 0) / 4;
  const cy = top.reduce((s, p) => s + p.y, 0) / 4;
  const inner = top.map((p) => lerpPoint(p, { x: cx, y: cy }, inset));
  return polygonPoints(inner);
}

const FLOOR_FILL: Record<NonNullable<BeatPlatform["floor"]>, string> = {
  carpet: "rgba(181,0,0,0.1)",
  wood: "rgba(140,100,60,0.14)",
  tile: "rgba(100,130,160,0.12)",
  stone: "rgba(26,26,26,0.05)",
};

export function IsoPlatform({
  platform,
  origin,
  index,
  activeBeat,
  visited,
  onSelect,
}: IsoPlatformProps) {
  const reduced = useReducedMotion() ?? false;
  const { gx, gy, w, d, elev, beat, floor } = platform;
  const top = platformCorners(gx, gy, w, d, elev, origin);
  const base = platformBase(gx, gy, w, d, origin);
  const isActive = beat === activeBeat;
  const meta = getBeatMeta(beat);

  const leftWall = [top[3]!, top[0]!, base[0]!, base[3]!];
  const rightWall = [top[1]!, top[2]!, base[2]!, base[1]!];
  const center = centerOf(gx, gy, w, d, elev, origin);

  const opacity = isActive ? 1 : visited ? 0.9 : 0.72;

  return (
    <motion.g
      className="iso-platform"
      data-beat={beat}
      data-active={isActive || undefined}
      data-visited={visited || undefined}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity, y: isActive ? -3 : 0 }}
      transition={{
        opacity: motionTransition(reduced, {
          ...springGentle,
          delay: 0.1 + index * 0.07,
        }),
        y: motionTransition(reduced, springSnappy),
      }}
      onClick={() => onSelect(beat)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(beat);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${meta.sceneLabel} — ${meta.tag}`}
      aria-current={isActive ? "true" : undefined}
      style={{ cursor: "pointer" }}
    >
      <g
        className="iso-platform-float"
        filter={isActive ? "url(#iso-platform-shadow)" : undefined}
      >
        <polygon points={polygonPoints(leftWall)} fill="url(#iso-wall-left)" />
        <polygon points={polygonPoints(rightWall)} fill="url(#iso-wall-right)" />
        <motion.polygon
          points={polygonPoints(top)}
          fill="url(#iso-floor-top)"
          initial={{
            stroke: "rgba(26,26,26,0.14)",
            strokeWidth: 1,
          }}
          animate={{
            stroke: isActive
              ? "rgba(181,0,0,0.5)"
              : "rgba(26,26,26,0.14)",
            strokeWidth: isActive ? 1.8 : 1,
          }}
          transition={motionTransition(reduced, springSnappy)}
        />
        {floor && (
          <polygon points={floorZone(top)} fill={FLOOR_FILL[floor]} />
        )}
      </g>
    </motion.g>
  );
}
