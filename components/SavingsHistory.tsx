"use client";

import { motion } from "framer-motion";
import { Tag, TrendingUp } from "lucide-react";
import { useGame } from "@/lib/game-context";

export default function SavingsHistory() {
  const { redemptions, savingsKc } = useGame();

  if (redemptions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl p-5 text-center mb-5"
      >
        <TrendingUp size={28} color="#9ca3af" className="mx-auto mb-3" />
        <p className="text-gray-500 text-sm mb-1">Zatím žádné úspory</p>
        <p className="text-gray-400 text-xs">Uplatněte první slevu a uvidíte historii zde</p>
      </motion.div>
    );
  }

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Historie úspor</p>
        <span className="glass text-green-700 text-xs font-black px-2.5 py-1 rounded-xl">
          {savingsKc} Kč celkem
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {redemptions.slice(0, 5).map((r, i) => (
          <motion.div
            key={`${r.placeId}-${r.date}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(26,122,94,0.10)" }}>
              <Tag size={14} color="#1a7a5e" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold text-sm line-clamp-1">{r.placeName}</p>
              <p className="text-gray-400 text-xs">
                {new Date(r.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })}
                {" · "}+{r.pointsEarned} bodů
              </p>
            </div>
            <span className="text-green-700 font-black text-sm flex-shrink-0">−{r.savedKc} Kč</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
