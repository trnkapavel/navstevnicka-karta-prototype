export type DiscountType = "percent" | "free" | "one_plus_one" | "bonus";

export interface DiscountInfo {
  type: DiscountType;
  label: string;
  shortLabel: string;
  description: string;
  estimatedSaving: number;
  basePrice: number;
  pointsReward: number;
  color: string;
  accentColor: string;
}

export function getDiscountInfo(
  discount: string | null,
  free: boolean,
  basePrice: number,
  pointsReward: number,
  bonusText?: string
): DiscountInfo {
  if (free) {
    return {
      type: "free",
      label: "ZDARMA",
      shortLabel: "FREE",
      description: bonusText ?? "Vstup nebo bonus zdarma s aktivní kartou",
      estimatedSaving: basePrice,
      basePrice,
      pointsReward,
      color: "#52c895",
      accentColor: "#3d9970",
    };
  }

  if (discount?.includes("1+1")) {
    return {
      type: "one_plus_one",
      label: "1+1",
      shortLabel: "1+1",
      description: "Druhý vstup nebo porce zdarma",
      estimatedSaving: Math.round(basePrice * 0.5),
      basePrice,
      pointsReward,
      color: "#d97706",
      accentColor: "#92400e",
    };
  }

  if (!discount && bonusText) {
    return {
      type: "bonus",
      label: "BONUS",
      shortLabel: "BONUS",
      description: bonusText,
      estimatedSaving: Math.round(basePrice * 0.3),
      basePrice,
      pointsReward,
      color: "#7c3aed",
      accentColor: "#5b21b6",
    };
  }

  const pct = parseInt(discount ?? "0", 10);
  return {
    type: "percent",
    label: `-${pct}%`,
    shortLabel: `${pct}%`,
    description: `Sleva ${pct} % z ceníkové ceny`,
    estimatedSaving: Math.round(basePrice * (pct / 100)),
    basePrice,
    pointsReward,
    color: "#f59e0b",
    accentColor: "#4a9ede",
  };
}

export const LEVELS = [
  { id: 1, name: "Turista", minPoints: 0, emoji: "🎒" },
  { id: 2, name: "Průzkumník", minPoints: 100, emoji: "🗺" },
  { id: 3, name: "Místní", minPoints: 300, emoji: "🏡" },
  { id: 4, name: "Expert regionu", minPoints: 600, emoji: "⭐" },
  { id: 5, name: "Legenda Berounska", minPoints: 1000, emoji: "👑" },
] as const;

type Level = (typeof LEVELS)[number];

export function getLevel(points: number) {
  let current: Level = LEVELS[0];
  let next: Level | null = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      current = LEVELS[i] as Level;
      next = (LEVELS[i + 1] ?? null) as Level | null;
      break;
    }
  }
  const progress = next
    ? (points - current.minPoints) / (next.minPoints - current.minPoints)
    : 1;
  return { current, next, progress: Math.min(1, Math.max(0, progress)) };
}
