import { centerOf, type Point } from "./isoMath";
import type { BeatPlatform } from "./beatPlatforms";
import { IsoSceneArt } from "./IsoSceneArt";

/** Scény nad plošinami — vlastní vrstva kvůli z-order a čitelnosti */
export function IsoScenesLayer({
  platforms,
  origin,
  activeBeat,
}: {
  platforms: BeatPlatform[];
  origin: Point;
  activeBeat: number;
}) {
  return (
    <g className="iso-scenes-top" aria-hidden>
      {platforms.map((platform) => {
        const c = centerOf(
          platform.gx,
          platform.gy,
          platform.w,
          platform.d,
          platform.elev,
          origin,
        );

        return (
          <IsoSceneArt
            key={platform.beat}
            beat={platform.beat}
            cx={c.x}
            cy={c.y}
            isActive={platform.beat === activeBeat}
          />
        );
      })}
    </g>
  );
}
