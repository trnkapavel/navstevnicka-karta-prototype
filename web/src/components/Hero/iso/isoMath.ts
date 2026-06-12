/** Izometrická projekce — grid (gx, gy) → SVG souřadnice */

import { MAP_ORIGIN } from "./beatPlatforms";

export const ISO = { sx: 38, sy: 22, sz: 28 } as const;

export type Point = { x: number; y: number };

export function toScreen(
  gx: number,
  gy: number,
  gz = 0,
  origin: Point = MAP_ORIGIN,
): Point {
  return {
    x: origin.x + (gx - gy) * ISO.sx,
    y: origin.y + (gx + gy) * ISO.sy - gz * ISO.sz,
  };
}

export function platformCorners(
  gx: number,
  gy: number,
  w: number,
  d: number,
  elev: number,
  origin?: Point,
) {
  return [
    toScreen(gx, gy, elev, origin),
    toScreen(gx + w, gy, elev, origin),
    toScreen(gx + w, gy + d, elev, origin),
    toScreen(gx, gy + d, elev, origin),
  ];
}

export function platformBase(
  gx: number,
  gy: number,
  w: number,
  d: number,
  origin?: Point,
) {
  return platformCorners(gx, gy, w, d, 0, origin);
}

export function pathFromPoints(pts: Point[]) {
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

export function centerOf(
  gx: number,
  gy: number,
  w: number,
  d: number,
  elev: number,
  origin?: Point,
) {
  return toScreen(gx + w / 2, gy + d / 2, elev, origin);
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}
