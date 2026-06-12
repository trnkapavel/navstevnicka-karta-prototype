import { toScreen, type Point } from "./isoMath";

/** Vyplňuje tmavé plochy — mřížka, ambient světla, jemné částice */
export function IsoBackdrop({ origin }: { origin: Point }) {
  const gridLines: string[] = [];

  for (let i = -6; i <= 14; i++) {
    const a = toScreen(i, -3, -0.5, origin);
    const b = toScreen(i, 12, -0.5, origin);
    gridLines.push(`M ${a.x.toFixed(0)} ${a.y.toFixed(0)} L ${b.x.toFixed(0)} ${b.y.toFixed(0)}`);
    const c = toScreen(-3, i, -0.5, origin);
    const d = toScreen(14, i, -0.5, origin);
    gridLines.push(`M ${c.x.toFixed(0)} ${c.y.toFixed(0)} L ${d.x.toFixed(0)} ${d.y.toFixed(0)}`);
  }

  const particles = [
    [0.15, 0.55],
    [0.35, 0.25],
    [0.62, 0.18],
    [0.78, 0.42],
    [0.88, 0.62],
    [0.48, 0.72],
    [0.22, 0.38],
  ] as const;

  return (
    <g className="iso-backdrop" aria-hidden>
      <ellipse
        cx={origin.x + 40}
        cy={origin.y + 60}
        rx={420}
        ry={120}
        fill="rgba(181,0,0,0.06)"
      />
      <ellipse
        cx={origin.x + 180}
        cy={origin.y - 20}
        rx={280}
        ry={80}
        fill="rgba(244,200,160,0.08)"
      />
      {gridLines.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(26,26,26,0.06)"
          strokeWidth="0.6"
        />
      ))}
      {particles.map(([x, y], i) => (
        <circle
          key={i}
          cx={120 + x * 1200}
          cy={80 + y * 520}
          r={1.2 + (i % 3) * 0.4}
          fill="rgba(181,0,0,0.1)"
          className="iso-particle"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </g>
  );
}
