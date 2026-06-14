"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, MapPin, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface SavingsCelebrationProps {
  savedKc: number;
  pointsEarned: number;
  placeName: string;
  placeId?: string;
  leveledUp?: boolean;
  newAchievement?: string;
  onClose: () => void;
}

// Canvas konfety
function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#34d99a", "#1a7a5e", "#2563eb", "#fbbf24", "#ec4899", "#ffffff"];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 8,
      h: 10 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vx: -2 + Math.random() * 4,
      vy: 3 + Math.random() * 5,
      vrot: (-0.08 + Math.random() * 0.16),
      opacity: 1,
    }));

    let raf: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (frame > 80) p.opacity -= 0.012;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (frame < 160) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[110]"
    />
  );
}

export default function SavingsCelebration({
  savedKc,
  pointsEarned,
  placeName,
  placeId,
  leveledUp,
  newAchievement,
  onClose,
}: SavingsCelebrationProps) {
  const router = useRouter();

  return (
    <>
      <Confetti />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[105] flex items-end justify-center max-w-[430px] mx-auto"
        style={{ background: "rgba(8,16,12,0.65)", backdropFilter: "blur(10px)" }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full rounded-t-[36px] overflow-hidden"
          style={{ background: "var(--bg-main)" }}
        >
          {/* Gradient top bar */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #34d99a, #1a7a5e, #2563eb)" }} />

          <div className="px-6 pt-6 pb-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.1 }}
              className="text-7xl mb-4 inline-block"
            >
              🎉
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-black text-2xl mb-1"
              style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}
            >
              Sleva uplatněna!
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="text-base line-clamp-1 mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              {placeName}
            </motion.p>

            {/* Úspora */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.32, type: "spring" }}
              className="rounded-3xl p-5 mb-4"
              style={{ background: "linear-gradient(135deg, rgba(26,122,94,0.10), rgba(37,99,235,0.07))", border: "1.5px solid rgba(26,122,94,0.20)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                Ušetřili jste
              </p>
              <p
                className="font-black leading-none mb-3"
                style={{
                  fontSize: 56,
                  background: "linear-gradient(135deg, #1a7a5e, #2563eb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {savedKc} Kč
              </p>
              <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-2xl inline-flex" style={{ background: "rgba(251,191,36,0.12)" }}>
                <Sparkles size={16} color="#d97706" />
                <span className="font-black text-base" style={{ color: "#d97706" }}>+{pointsEarned} bodů připsáno</span>
              </div>
            </motion.div>

            {/* Level up / achievement */}
            <AnimatePresence>
              {(leveledUp || newAchievement) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl px-4 py-3 mb-4 flex items-center gap-3"
                  style={{ border: "1px solid rgba(245,158,11,0.25)" }}
                >
                  <Trophy size={22} color="#d97706" />
                  <div className="text-left">
                    {leveledUp && <p className="font-bold text-base" style={{ color: "var(--text-main)" }}>Nová úroveň!</p>}
                    {newAchievement && <p className="text-sm font-semibold" style={{ color: "#d97706" }}>Odznak: {newAchievement}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Kontextové akce */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="px-6 pb-10 safe-bottom flex flex-col gap-3"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Co dál?</p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                router.push("/");
              }}
              className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}
            >
              <MapPin size={18} />
              Objevit další místa
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                router.push("/?tab=card");
              }}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.70)", border: "1.5px solid rgba(0,0,0,0.06)", color: "var(--text-sub)", backdropFilter: "blur(16px)" }}
            >
              <CreditCard size={18} />
              Zobrazit mé body a odměny
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
