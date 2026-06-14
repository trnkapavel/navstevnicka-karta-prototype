import { platformCorners, type Point } from "./isoMath";
import type { BeatPlatform } from "./beatPlatforms";
import { getBeatMeta } from "./isoBeatMeta";
import { IsoLabelBadge } from "./IsoLabelBadge";

export function IsoLabelsLayer({
  platforms,
  origin,
  activeBeat,
}: {
  platforms: BeatPlatform[];
  origin: Point;
  activeBeat: number;
}) {
  return (
    <g className="iso-labels-top">
      {platforms.map((p) => {
        const top = platformCorners(p.gx, p.gy, p.w, p.d, p.elev, origin);
        const minY = Math.min(...top.map((pt) => pt.y));
        const centerX = top.reduce((s, pt) => s + pt.x, 0) / 4;

        const meta = getBeatMeta(p.beat);

        return (
          <IsoLabelBadge
            key={p.beat}
            x={centerX}
            y={minY - 12}
            label={meta.sceneLabel}
            tag={meta.tag}
            beat={p.beat}
            index={p.beat - 1}
            active={p.beat === activeBeat}
          />
        );
      })}
    </g>
  );
}
