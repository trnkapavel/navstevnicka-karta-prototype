"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, QrCode, CheckCircle2, ChevronRight,
  Tag, ShieldCheck, Clock,
} from "lucide-react";
import type { DiscountInfo } from "@/lib/discounts";
import { useGame } from "@/lib/game-context";
import SavingsCelebration from "./SavingsCelebration";

interface DiscountFlowProps {
  placeId: string;
  placeName: string;
  category: string;
  discountInfo: DiscountInfo;
  onClose: () => void;
}

type Step = "intro" | "reveal" | "qr" | "confirm";

export default function DiscountFlow({
  placeId,
  placeName,
  category,
  discountInfo,
  onClose,
}: DiscountFlowProps) {
  const [step, setStep] = useState<Step>("intro");
  const [phase, setPhase] = useState<"locked" | "holding" | "revealed">("locked");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; color: string }[]>([]);
  const [celebration, setCelebration] = useState<{
    savedKc: number;
    pointsEarned: number;
    leveledUp: boolean;
    newAchievement?: string;
  } | null>(null);

  const { redeemDiscount, hasRedeemed } = useGame();
  const alreadyUsed = hasRedeemed(placeId);

  const spawnParticles = useCallback(() => {
    const colors = ["#52c895", "#f59e0b", "#4a9ede", "#e879f9", "#fff"];
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        color: colors[i % colors.length],
      }))
    );
    setTimeout(() => setParticles([]), 900);
  }, []);

  const startHold = useCallback(() => {
    if (phase !== "locked" || alreadyUsed) return;
    setPhase("holding");
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(intervalRef.current!);
        setPhase("revealed");
        spawnParticles();
        setTimeout(() => setStep("qr"), 800);
      }
    }, 25);
  }, [phase, alreadyUsed, spawnParticles]);

  const cancelHold = useCallback(() => {
    if (phase !== "holding") return;
    clearInterval(intervalRef.current!);
    setPhase("locked");
    setProgress(0);
  }, [phase]);

  const handleConfirm = () => {
    const result = redeemDiscount({
      placeId,
      placeName,
      savedKc: discountInfo.estimatedSaving,
      pointsReward: discountInfo.pointsReward,
      category,
    });
    setCelebration({
      savedKc: discountInfo.estimatedSaving,
      pointsEarned: discountInfo.pointsReward,
      leveledUp: result.leveledUp,
      newAchievement: result.newAchievement,
    });
  };

  const circumference = 2 * Math.PI * 30;
  const steps: Step[] = ["intro", "reveal", "qr", "confirm"];
  const stepIndex = steps.indexOf(step);

  if (celebration) {
    return (
      <SavingsCelebration
        {...celebration}
        placeName={placeName}
        onClose={() => {
          setCelebration(null);
          onClose();
        }}
      />
    );
  }

  if (alreadyUsed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 text-center"
      >
        <CheckCircle2 size={40} color="#52c895" className="mx-auto mb-3" />
        <p className="text-gray-900 font-bold text-base mb-1">Sleva již uplatněna</p>
        <p className="text-gray-500 text-sm mb-4">U tohoto místa jste slevu již využili.</p>
        <button
          onClick={onClose}
          className="text-green-400 text-sm font-semibold"
        >
          Zavřít
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Step indicator */}
      <div className="flex gap-1.5 mb-4">
        {steps.map((s, i) => (
          <div
            key={s}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{
              background:
                i <= stepIndex
                  ? "linear-gradient(90deg, #3d9970, #4a9ede)"
                  : "rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-3xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} color="#1a7a5e" />
              <p className="text-gray-900 font-bold text-sm">Jak uplatnit slevu</p>
            </div>

            <div className="glass-green rounded-2xl p-4 mb-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Odhadovaná úspora</p>
              <p className="text-3xl font-black text-green-700">{discountInfo.estimatedSaving} Kč</p>
              <p className="text-gray-600 text-xs mt-1">{discountInfo.description}</p>
            </div>

            {[
              { icon: ShieldCheck, text: "Aktivní karta v aplikaci" },
              { icon: QrCode, text: "Ukažte QR kód u pokladny" },
              { icon: Clock, text: "Platí před zaplacením" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3 py-2.5"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(26,122,94,0.10)" }}>
                  <Icon size={15} color="#1a7a5e" />
                </div>
                <p className="text-gray-700 text-sm">{text}</p>
              </motion.div>
            ))}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep("reveal")}
              className="w-full mt-4 py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}
            >
              Pokračovat
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}

        {step === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ left: `${p.x}%`, top: "50%", opacity: 1, scale: 1 }}
                animate={{ top: "10%", opacity: 0, scale: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute w-2 h-2 rounded-full pointer-events-none z-20"
                style={{ background: p.color }}
              />
            ))}

            {phase !== "revealed" ? (
              <div
                className="glass rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer select-none touch-none"
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 68 68">
                    <circle cx="34" cy="34" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />
                    <circle
                      cx="34" cy="34" r="30"
                      stroke="url(#flow-grad)"
                      strokeWidth="3" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (circumference * progress) / 100}
                    />
                    <defs>
                      <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#52c895" />
                        <stop offset="100%" stopColor="#4a9ede" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <motion.div
                    animate={{ scale: phase === "holding" ? [1, 1.15, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center glass-green"
                  >
                    <Sparkles size={22} color="#52c895" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="text-gray-900 font-bold text-base mb-1">
                    {phase === "holding" ? "Držte…" : "Podržte pro odhalení"}
                  </p>
                  <p className="text-gray-500 text-xs">Vaše sleva se zobrazí jen vám</p>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.08)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #3d9970, #4a9ede)",
                    }}
                  />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-green rounded-3xl p-6 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 holo-shine opacity-40 pointer-events-none" />
                <p
                  className="text-5xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg, #52c895, #fff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {discountInfo.label}
                </p>
                <p className="text-gray-600 text-sm">{discountInfo.description}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === "qr" && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-3xl p-5"
          >
            <p className="text-gray-900 font-bold text-center mb-1">Ukažte u pokladny</p>
            <p className="text-gray-500 text-xs text-center mb-4">Personál naskenuje QR kód vaší karty</p>

            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="bg-white rounded-2xl p-4 mx-auto w-fit mb-4 relative"
            >
              <div className="absolute inset-2 border-2 border-dashed border-green-400/30 rounded-xl pointer-events-none" />
              <QrCode size={120} color="#0f2547" strokeWidth={1.2} />
            </motion.div>

            <div className="glass-dark rounded-xl px-3 py-2 mb-4 flex items-center justify-between">
              <span className="text-gray-500 text-xs">Platnost kódu</span>
              <span className="text-green-400 text-xs font-bold font-mono">04:59</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep("confirm")}
              className="w-full py-3.5 rounded-2xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}
            >
              Sleva byla uplatněna
            </motion.button>
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-3xl p-5 text-center"
          >
            <p className="text-gray-900 font-bold text-base mb-2">Potvrdit uplatnění?</p>
            <p className="text-gray-600 text-sm mb-4">
              Přidáme <span className="text-green-400 font-semibold">{discountInfo.estimatedSaving} Kč</span> do vašich úspor
              a <span className="text-amber-400 font-semibold">+{discountInfo.pointsReward} Berounských bodů</span>
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              className="w-full py-4 rounded-2xl font-bold text-white mb-2"
              style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}
            >
              Ano, sleva uplatněna ✓
            </motion.button>
            <button onClick={() => setStep("qr")} className="text-gray-500 text-sm py-2">
              Zpět k QR kódu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
