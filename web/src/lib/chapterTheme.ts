import type { MotionProfile } from "@/data/journeyData";

/** Rytmus čísel u položek (features / cards) — mapováno z motion.profile. */
export type ItemIndexVariant = "prominent" | "subtle" | "none";

const ITEM_INDEX_BY_PROFILE: Partial<Record<MotionProfile, ItemIndexVariant>> = {
  constellation: "prominent",
  "itinerary-stream": "prominent",
  "swipe-complete": "prominent",
  "rate-field": "subtle",
  threshold: "subtle",
  "quiet-light": "none",
  ripple: "none",
  "form-morph": "none",
};

export function getItemIndexVariant(profile: MotionProfile): ItemIndexVariant {
  return ITEM_INDEX_BY_PROFILE[profile] ?? "subtle";
}

/** Světlé kapitoly podle wireframe rytmu + quiet-light. */
const LIGHT_PROFILES: ReadonlySet<MotionProfile> = new Set([
  "rate-field",
  "quiet-light",
]);

export function getChapterTheme(
  beat: number,
  profile: MotionProfile,
): "dark" | "light" {
  if (profile === "finale") return "dark";
  if (profile === "form-morph") return "light";
  if (LIGHT_PROFILES.has(profile)) return "light";
  return "light";
}

/** Pin jen u hotových scrollytold momentů — skeleton kapitoly scrollují přirozeně. */
export function isChapterPinned(profile: MotionProfile): boolean {
  return profile === "form-morph" || profile === "finale";
}
