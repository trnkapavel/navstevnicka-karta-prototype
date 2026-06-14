"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, QrCode } from "lucide-react";

interface DiscountRevealProps {
  discount: string | null;
  free: boolean;
  placeName: string;
}

export default function DiscountReveal({ discount, free, placeName }: DiscountRevealProps) {
  const [phase, setPhase] = useState<"locked" | "holding" | "revealed">("locked");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const label = free ? "ZDARMA" : discount ?? "";

  const spawnParticles = useCallback(() => {
    const colors = ["#52c895", "#f59e0b", "#4a9ede", "#e879f9", "#fff"];
    const burst = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20 - 10,
      y: 50 + Math.random() * 10 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 900);
  }, []);

  const startHold = useCallback(() => {
    if (phase !== "locked") return;
    setPhase("holding");
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(intervalRef.current!);
        setPhase("revealed");
        spawnParticles();
      }
    }, 30);
  }, [phase, spawnParticles]);

  const cancelHold = useCallback(() => {
    if (phase !== "holding") return;
    clearInterval(intervalRef.current!);
    setPhase("locked");
    setProgress(0);
  }, [phase]);

  const circumference = 2 * Math.PI * 26;

  return (
    <div className="relative">
      {/* Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}%`, y: `${p.y}%`, scale: 1, opacity: 1 }}
            animate={{
              x: `${p.x + (Math.random() * 60 - 30)}%`,
              y: `${p.y - 60 - Math.random() * 40}%`,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-2.5 h-2.5 rounded-full pointer-events-none z-20"
            style={{ background: p.color, top: 0, left: 0 }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase !== "revealed" ? (
          /* Hold to reveal */
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="glass rounded-3xl p-5 flex flex-col items-center gap-4 cursor-pointer select-none"
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
          >
            {/* Progress ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                <motion.circle
                  cx="30" cy="30" r="26"
                  stroke="url(#reveal-grad)"
                  strokeWidth="3" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (circumference * progress) / 100}
                />
                <defs>
                  <linearGradient id="reveal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#52c895" />
                    <stop offset="100%" stopColor="#4a9ede" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                animate={{ scale: phase === "holding" ? [1, 1.1, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <Sparkles size={20} color="rgba(255,255,255,0.7)" />
              </motion.div>
            </div>

            <div className="text-center">
              <p className="text-white/50 text-xs mb-0.5 font-medium">
                {phase === "holding" ? "Drž pro odhalení…" : "Podržte pro odhalení slevy"}
              </p>
              <p className="text-white/30 text-xs">{placeName}</p>
            </div>

            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #3d9970, #4a9ede)",
                }}
              />
            </div>
          </motion.div>
        ) : (
          /* Revealed */
          <motion.div
            key="revealed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-3xl p-5 flex flex-col items-center gap-4 overflow-hidden relative"
            style={{
              background: free
                ? "linear-gradient(135deg, rgba(61,153,112,0.4), rgba(45,125,210,0.3))"
                : "linear-gradient(135deg, rgba(27,58,107,0.6), rgba(45,90,158,0.5))",
              border: "1px solid rgba(82,200,149,0.4)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Holographic shine sweep */}
            <div className="absolute inset-0 holo-shine opacity-50 pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
              className="text-6xl font-black tracking-tight"
              style={{
                background: free
                  ? "linear-gradient(135deg, #52c895, #fff)"
                  : "linear-gradient(135deg, #fff, #a5c8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {label}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/70 text-sm font-medium text-center"
            >
              {free ? "Vstup zdarma s kartou" : `Sleva ${label} — ukažte QR kód`}
            </motion.p>

            {/* QR code area */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="w-full rounded-2xl p-4 flex flex-col items-center gap-2"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center">
                <QrCode size={56} color="#0f2547" strokeWidth={1.5} />
              </div>
              <p className="text-white/50 text-xs">Naskenujte u pokladny</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
