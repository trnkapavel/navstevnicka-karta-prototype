"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { motionTransition, springGentle, springSnappy } from "@/lib/motion/presets";

type IsoLabelBadgeProps = {
  x: number;
  y: number;
  label: string;
  tag: string;
  beat: number;
  active?: boolean;
  index?: number;
  style?: CSSProperties;
};

export function IsoLabelBadge({
  x,
  y,
  label,
  tag,
  beat,
  active = false,
  index = 0,
  style,
}: IsoLabelBadgeProps) {
  const reduced = useReducedMotion() ?? false;

  if (!active) {
    return (
      <motion.g
        className="iso-label-badge"
        style={style}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={motionTransition(reduced, {
          ...springGentle,
          delay: 0.7 + index * 0.05,
        })}
      >
        <circle
          cx={x}
          cy={y - 10}
          r={14}
          className="iso-dot-ring"
          fill="#ffffff"
          stroke="rgba(111, 47, 106, 0.25)"
          strokeWidth={1.5}
        />
        <text
          x={x}
          y={y - 6}
          textAnchor="middle"
          className="iso-dot-num"
        >
          {String(beat).padStart(2, "0")}
        </text>
      </motion.g>
    );
  }

  const cardW = Math.max(tag.length * 9.5 + 52, label.length * 7 + 44, 168);
  const cardH = 76;
  const cardX = x - cardW / 2;
  const cardY = y - cardH - 20;

  return (
    <motion.g
      className="iso-label-badge"
      data-active
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={motionTransition(reduced, springSnappy)}
    >
      <line
        x1={x}
        y1={y - 8}
        x2={x}
        y2={cardY + cardH + 4}
        className="iso-card-stem"
      />
      <rect
        x={cardX}
        y={cardY}
        width={cardW}
        height={cardH}
        rx={12}
        className="iso-card-bg"
      />
      <text x={cardX + 16} y={cardY + 22} className="iso-card-num">
        {String(beat).padStart(2, "0")}
      </text>
      <text
        x={cardX + cardW / 2}
        y={cardY + 38}
        textAnchor="middle"
        className="iso-card-tag"
      >
        {tag}
      </text>
      <text
        x={cardX + cardW / 2}
        y={cardY + 58}
        textAnchor="middle"
        className="iso-card-label"
      >
        {label}
      </text>
    </motion.g>
  );
}
