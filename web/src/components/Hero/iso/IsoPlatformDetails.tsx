import type { Point } from "./isoMath";
import { IsoSceneArt } from "./IsoSceneArt";

type DetailsProps = {
  beat: number;
  c: Point;
  isActive: boolean;
};

/** Diorama scény — aktivní = plná ilustrace, neaktivní = mini silueta */
export function IsoPlatformDetails({ beat, c, isActive }: DetailsProps) {
  return <IsoSceneArt beat={beat} cx={c.x} cy={c.y} isActive={isActive} />;
}
