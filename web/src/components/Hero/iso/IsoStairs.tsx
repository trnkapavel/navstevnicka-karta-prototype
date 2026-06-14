import { toScreen, type Point } from "./isoMath";

type StairLink = {
  from: { gx: number; gy: number; elev: number };
  to: { gx: number; gy: number; elev: number };
  steps?: number;
};

const STAIR_LINKS: StairLink[] = [
  { from: { gx: -2, gy: 3.4, elev: 0.45 }, to: { gx: 1.8, gy: 5.8, elev: 0 } },
  { from: { gx: 3.4, gy: 2.2, elev: 0.7 }, to: { gx: 1.8, gy: 5.8, elev: 0 } },
  { from: { gx: 3.4, gy: 2.2, elev: 0.7 }, to: { gx: 8, gy: -0.2, elev: 1.1 } },
  { from: { gx: 3.4, gy: 2.2, elev: 0.7 }, to: { gx: -2.8, gy: 0.5, elev: 1.35 } },
  { from: { gx: 3.4, gy: 2.2, elev: 0.7 }, to: { gx: 7.8, gy: 3.6, elev: 0.35 } },
  { from: { gx: 2.5, gy: -2.2, elev: 1.6 }, to: { gx: 3.4, gy: 2.2, elev: 0.7 } },
  { from: { gx: -2, gy: 3.4, elev: 0.45 }, to: { gx: -4.5, gy: -1, elev: 2 } },
  { from: { gx: 7.8, gy: 3.6, elev: 0.35 }, to: { gx: 8, gy: -0.2, elev: 1.1 } },
];

export function IsoStairs({ origin }: { origin: Point }) {
  return (
    <g className="iso-stairs" aria-hidden>
      {STAIR_LINKS.map((link, i) => {
        const a = toScreen(link.from.gx, link.from.gy, link.from.elev, origin);
        const b = toScreen(link.to.gx, link.to.gy, link.to.elev, origin);
        const steps = link.steps ?? 5;
        const parts: string[] = [];

        for (let s = 0; s < steps; s++) {
          const t0 = s / steps;
          const t1 = (s + 1) / steps;
          const p0 = { x: a.x + (b.x - a.x) * t0, y: a.y + (b.y - a.y) * t0 };
          const p1 = { x: a.x + (b.x - a.x) * t1, y: a.y + (b.y - a.y) * t1 };
          const rise = 3.5;
          parts.push(
            `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} L ${p1.x.toFixed(1)} ${(p1.y - rise).toFixed(1)} L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`,
          );
        }

        return (
          <g key={i} opacity="0.75">
            {parts.map((d, j) => (
              <path
                key={j}
                d={d}
                fill="url(#iso-stair-face)"
                stroke="rgba(244,241,236,0.07)"
                strokeWidth="0.45"
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}
