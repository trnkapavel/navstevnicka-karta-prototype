"use client";

import { motion } from "framer-motion";
import { useGame } from "@/lib/game-context";

export default function LevelBar({ compact = false }: { compact?: boolean }) {
  const { level, points } = useGame();
  const { current, next, progress } = level;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{current.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-white/60 font-semibold">{current.name}</span>
            <span className="text-white/40">{points} BB</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #3d9970, #4a9ede)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-4 mb-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-3xl"
        >
          {current.emoji}
        </motion.div>
        <div className="flex-1">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Úroveň {current.id}</p>
          <p className="text-white font-black text-lg">{current.name}</p>
        </div>
        <div className="text-right">
          <p className="text-amber-400 font-black text-xl">{points}</p>
          <p className="text-white/35 text-[10px]">Berounské body</p>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #3d9970, #52c895, #4a9ede)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 holo-shine opacity-40" />
        </motion.div>
      </div>
      {next ? (
        <p className="text-white/35 text-[11px]">
          Do úrovně <span className="text-white/60 font-semibold">{next.name}</span> zbývá{" "}
          <span className="text-green-400 font-bold">{next.minPoints - points} BB</span>
        </p>
      ) : (
        <p className="text-green-400 text-[11px] font-semibold">Maximální úroveň dosažena!</p>
      )}
    </motion.div>
  );
}
