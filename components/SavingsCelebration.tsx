"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, X } from "lucide-react";

interface SavingsCelebrationProps {
  savedKc: number;
  pointsEarned: number;
  placeName: string;
  leveledUp?: boolean;
  newAchievement?: string;
  onClose: () => void;
}

export default function SavingsCelebration({
  savedKc,
  pointsEarned,
  placeName,
  leveledUp,
  newAchievement,
  onClose,
}: SavingsCelebrationProps) {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.3,
    color: ["#52c895", "#f59e0b", "#4a9ede", "#fff", "#e879f9"][i % 5],
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{ background: "rgba(6,13,26,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, bottom: "40%", background: p.color }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -200 - Math.random() * 150, opacity: 0, scale: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        />
      ))}

      <motion.div
        initial={{ y: "100%", scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] glass rounded-t-[32px] p-6 pb-10 safe-bottom relative overflow-hidden"
      >
        <div className="absolute inset-0 holo-shine opacity-20 pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <X size={16} color="rgba(255,255,255,0.6)" />
        </button>

        <div className="text-center pt-4">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-sm mb-1"
          >
            Sleva uplatněna u
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white font-bold text-lg mb-6 line-clamp-1"
          >
            {placeName}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
            className="glass-green rounded-3xl p-5 mb-4"
          >
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Ušetřili jste</p>
            <p
              className="font-black text-5xl mb-1"
              style={{
                background: "linear-gradient(135deg, #52c895, #fff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {savedKc} Kč
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Sparkles size={14} color="#f59e0b" />
              <span className="text-amber-400 font-bold text-sm">+{pointsEarned} Berounských bodů</span>
            </div>
          </motion.div>

          <AnimatePresence>
            {(leveledUp || newAchievement) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl px-4 py-3 mb-4 flex items-center gap-3"
                style={{ border: "1px solid rgba(245,158,11,0.3)" }}
              >
                <Trophy size={20} color="#f59e0b" />
                <div className="text-left">
                  {leveledUp && (
                    <p className="text-white font-bold text-sm">Nová úroveň!</p>
                  )}
                  {newAchievement && (
                    <p className="text-amber-400 text-xs">Odznak: {newAchievement}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-bold text-white active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}
          >
            Skvělé, pokračovat
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
