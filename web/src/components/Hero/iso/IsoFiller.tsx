import { platformCorners, type Point } from "./isoMath";

/** Distantní siluety — vyplní prázdné tmavé rohy */
const FILLERS = [
  { gx: -2.5, gy: -2.8, w: 2, d: 1.6, elev: 0.8 },
  { gx: 0.5, gy: -2.2, w: 1.8, d: 1.4, elev: 0.5 },
  { gx: -5.5, gy: 1.2, w: 1.6, d: 1.2, elev: 0.3 },
  { gx: 10.5, gy: -1.5, w: 2.2, d: 1.5, elev: 0.6 },
  { gx: 11, gy: 5.2, w: 1.8, d: 1.3, elev: 0.2 },
] as const;

function pts(corners: Point[]) {
  return corners.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

export function IsoFiller({ origin }: { origin: Point }) {
  return (
    <g className="iso-filler" aria-hidden opacity="0.5">
      {FILLERS.map((f, i) => {
        const top = platformCorners(f.gx, f.gy, f.w, f.d, f.elev, origin);
        return (
          <polygon
            key={i}
            points={pts(top)}
            fill="rgba(240,238,234,0.85)"
            stroke="rgba(26,26,26,0.08)"
            strokeWidth="0.6"
          />
        );
      })}
    </g>
  );
}
