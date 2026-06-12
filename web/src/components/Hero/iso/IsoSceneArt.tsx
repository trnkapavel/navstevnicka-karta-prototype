"use client";

import { SCENE_BY_BEAT, SCENE_VIEWBOX } from "./sceneSvgs";

/** ~1.65× původních 108×86 — čitelné na první pohled */
const SCENE_W = 178;
const SCENE_H = 142;
const GHOST_SCALE = 0.52;
const ACTIVE_LIFT = -16;

type IsoSceneArtProps = {
  beat: number;
  cx: number;
  cy: number;
  isActive: boolean;
};

function SceneGraphic({
  beat,
  x,
  y,
  w,
  h,
  opacity = 1,
  className,
}: {
  beat: number;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity?: number;
  className?: string;
}) {
  const Scene = SCENE_BY_BEAT[beat];
  if (!Scene) return null;

  const scaleX = w / SCENE_VIEWBOX.w;
  const scaleY = h / SCENE_VIEWBOX.h;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scaleX} ${scaleY})`}
      opacity={opacity}
      className={className}
    >
      <Scene />
    </g>
  );
}

export function IsoSceneArt({ beat, cx, cy, isActive }: IsoSceneArtProps) {
  const w = isActive ? SCENE_W : SCENE_W * GHOST_SCALE;
  const h = isActive ? SCENE_H : SCENE_H * GHOST_SCALE;
  const lift = isActive ? ACTIVE_LIFT : -6;
  const x = cx - w / 2;
  const y = cy - h / 2 + lift;

  if (!isActive) {
    return (
      <SceneGraphic
        beat={beat}
        x={x}
        y={y}
        w={w}
        h={h}
        opacity={0.72}
        className="iso-scene-art iso-scene-art-ghost"
      />
    );
  }

  return (
    <g className="iso-scene-art iso-scene-art-active" data-beat={beat}>
      <ellipse
        cx={cx}
        cy={cy + 10}
        rx={w * 0.38}
        ry={h * 0.1}
        className="iso-scene-ground"
      />
      <SceneGraphic beat={beat} x={x} y={y} w={w} h={h} />
    </g>
  );
}
