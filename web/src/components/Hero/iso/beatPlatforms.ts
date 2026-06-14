/** 8 beatů — široce rozprostřené přes celou hero plochu (desktop) */

export type BeatPlatform = {
  beat: number;
  tag: string;
  label: string;
  gx: number;
  gy: number;
  w: number;
  d: number;
  elev: number;
  floor?: "carpet" | "wood" | "tile" | "stone";
};

export const BEAT_PLATFORMS: BeatPlatform[] = [
  {
    beat: 1,
    tag: "Hledání",
    label: "Kanály",
    gx: -4.5,
    gy: -1,
    w: 2.6,
    d: 2,
    elev: 2,
    floor: "stone",
  },
  {
    beat: 8,
    tag: "Po odjezdu",
    label: "Follow-up",
    gx: 2.5,
    gy: -2.2,
    w: 3.2,
    d: 2.4,
    elev: 1.6,
    floor: "tile",
  },
  {
    beat: 6,
    tag: "Pobyt",
    label: "Pokoj",
    gx: -2.8,
    gy: 0.5,
    w: 3.2,
    d: 2.8,
    elev: 1.35,
    floor: "wood",
  },
  {
    beat: 4,
    tag: "Check-in",
    label: "Online",
    gx: 8,
    gy: -0.2,
    w: 3,
    d: 2.6,
    elev: 1.1,
    floor: "wood",
  },
  {
    beat: 3,
    tag: "Plánování",
    label: "Komunikace",
    gx: -2,
    gy: 3.4,
    w: 2.8,
    d: 2.2,
    elev: 0.45,
    floor: "tile",
  },
  {
    beat: 5,
    tag: "Příjezd",
    label: "Vstup",
    gx: 3.4,
    gy: 2.2,
    w: 3,
    d: 2.8,
    elev: 0.7,
    floor: "wood",
  },
  {
    beat: 7,
    tag: "Check-out",
    label: "Platba",
    gx: 7.8,
    gy: 3.6,
    w: 2.8,
    d: 2.1,
    elev: 0.35,
    floor: "carpet",
  },
  {
    beat: 2,
    tag: "Rezervace",
    label: "Recepce",
    gx: 1.8,
    gy: 5.8,
    w: 3.6,
    d: 2.8,
    elev: 0,
    floor: "carpet",
  },
];

export const SIGNAL_PATH_ORDER = [1, 3, 2, 5, 4, 6, 7, 8] as const;

export const MAP_VIEWBOX = { w: 1400, h: 720 } as const;
/** Centrované — celá mapa musí vejít do viewportu (meet) */
export const MAP_ORIGIN = { x: 700, y: 360 } as const;

export function getPlatform(beat: number) {
  return BEAT_PLATFORMS.find((p) => p.beat === beat)!;
}
