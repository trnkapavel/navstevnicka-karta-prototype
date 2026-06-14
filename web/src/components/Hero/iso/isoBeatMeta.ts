import { journeySections } from "@/data/journeyData";

/** Krátký popis scény na badge — vizuální podstatné jméno */
export const BEAT_SCENE_LABELS: Record<number, string> = {
  1: "Vyhledávání online",
  2: "Recepční pult",
  3: "Komunikace s hostem",
  4: "Formulář check-inu",
  5: "Vstup a příjezd",
  6: "Pokoj a pobyt",
  7: "Platba a odjezd",
  8: "Hodnocení a follow-up",
};

export function getBeatMeta(beat: number) {
  const section = journeySections.find((s) => s.index === beat);
  return {
    tag: section?.tag ?? "",
    sceneLabel: BEAT_SCENE_LABELS[beat] ?? "",
  };
}
