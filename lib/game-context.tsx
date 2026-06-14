"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getLevel } from "./discounts";

export interface RedemptionRecord {
  placeId: string;
  placeName: string;
  savedKc: number;
  pointsEarned: number;
  date: string;
}

export interface Achievement {
  id: string;
  icon: string;
  label: string;
  desc: string;
  earned: boolean;
  progress?: number;
  total?: number;
}

interface GameState {
  points: number;
  savingsKc: number;
  visits: number;
  streak: number;
  lastVisitDate: string | null;
  redeemedPlaceIds: string[];
  redemptions: RedemptionRecord[];
  favorites: string[];
}

const DEFAULT: GameState = {
  points: 40,
  savingsKc: 0,
  visits: 0,
  streak: 0,
  lastVisitDate: null,
  redeemedPlaceIds: [],
  redemptions: [],
  favorites: [],
};

const STORAGE_KEY = "nk-game-state-v1";

interface GameContextValue extends GameState {
  level: ReturnType<typeof getLevel>;
  achievements: Achievement[];
  challenges: { label: string; reward: number; deadline: string; done: boolean; icon: string }[];
  redeemDiscount: (payload: {
    placeId: string;
    placeName: string;
    savedKc: number;
    pointsReward: number;
    category: string;
  }) => { leveledUp: boolean; newAchievement?: string };
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  hasRedeemed: (id: string) => boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function computeAchievements(state: GameState): Achievement[] {
  const restaurantCount = state.redemptions.filter((r) =>
    r.placeName.toLowerCase().includes("pivotel") ||
    r.placeName.toLowerCase().includes("mmx")
  ).length;

  return [
    {
      id: "first",
      icon: "🗺",
      label: "Průzkumník",
      desc: "První uplatněná sleva",
      earned: state.visits >= 1,
    },
    {
      id: "saver",
      icon: "💰",
      label: "Šetřitel",
      desc: "Ušetři 500 Kč celkem",
      earned: state.savingsKc >= 500,
      progress: Math.min(state.savingsKc, 500),
      total: 500,
    },
    {
      id: "food",
      icon: "🍺",
      label: "Gurmán",
      desc: "3× sleva v gastronomii",
      earned: restaurantCount >= 3,
      progress: restaurantCount,
      total: 3,
    },
    {
      id: "streak",
      icon: "🔥",
      label: "Výletník",
      desc: "7denní série aktivit",
      earned: state.streak >= 7,
      progress: state.streak,
      total: 7,
    },
  ];
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const redeemDiscount = useCallback(
    (payload: {
      placeId: string;
      placeName: string;
      savedKc: number;
      pointsReward: number;
      category: string;
    }) => {
      let leveledUp = false;
      let newAchievement: string | undefined;
      const today = todayKey();

      setState((prev) => {
        if (prev.redeemedPlaceIds.includes(payload.placeId)) return prev;

        const prevLevel = getLevel(prev.points).current.id;
        const newPoints = prev.points + payload.pointsReward + 20;
        const newLevel = getLevel(newPoints).current.id;
        if (newLevel > prevLevel) leveledUp = true;

        let streak = prev.streak;
        if (prev.lastVisitDate === today) {
          /* same day */
        } else if (
          prev.lastVisitDate &&
          new Date(today).getTime() - new Date(prev.lastVisitDate).getTime() ===
            86400000
        ) {
          streak += 1;
        } else {
          streak = 1;
        }

        const next: GameState = {
          ...prev,
          points: newPoints + (streak >= 7 ? 50 : 0),
          savingsKc: prev.savingsKc + payload.savedKc,
          visits: prev.visits + 1,
          streak,
          lastVisitDate: today,
          redeemedPlaceIds: [...prev.redeemedPlaceIds, payload.placeId],
          redemptions: [
            {
              placeId: payload.placeId,
              placeName: payload.placeName,
              savedKc: payload.savedKc,
              pointsEarned: payload.pointsReward + 20,
              date: new Date().toISOString(),
            },
            ...prev.redemptions,
          ].slice(0, 20),
        };

        if (next.visits === 1) newAchievement = "Průzkumník";
        if (next.savingsKc >= 500 && prev.savingsKc < 500) newAchievement = "Šetřitel";

        return next;
      });

      return { leveledUp, newAchievement };
    },
    []
  );

  const toggleFavorite = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter((f) => f !== id)
        : [...prev.favorites, id],
    }));
  }, []);

  const value = useMemo<GameContextValue>(() => {
    const level = getLevel(state.points);
    const achievements = computeAchievements(state);
    const challenges = [
      {
        label: "Navštiv aquapark",
        reward: 50,
        deadline: "3 dny",
        done: state.redeemedPlaceIds.includes("aquapark-beroun"),
        icon: "🏊",
      },
      {
        label: "Oběd u partnera",
        reward: 30,
        deadline: "dnes",
        done: state.redeemedPlaceIds.some((id) =>
          ["mmx-pivotel"].includes(id)
        ),
        icon: "🍽",
      },
      {
        label: "Ušetři 200 Kč",
        reward: 80,
        deadline: "tento týden",
        done: state.savingsKc >= 200,
        icon: "💰",
      },
    ];

    return {
      ...state,
      level,
      achievements,
      challenges,
      redeemDiscount,
      toggleFavorite,
      isFavorite: (id) => state.favorites.includes(id),
      hasRedeemed: (id) => state.redeemedPlaceIds.includes(id),
    };
  }, [state, redeemDiscount, toggleFavorite]);

  if (!hydrated) {
    return (
      <div className="h-full w-full flex items-center justify-center" style={{ background: "var(--bg-deep)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-green-400 animate-spin" />
      </div>
    );
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
