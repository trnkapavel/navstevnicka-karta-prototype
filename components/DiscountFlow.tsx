"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, QrCode, CheckCircle2, ChevronRight, Tag, ShieldCheck, Clock } from "lucide-react";
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

const DARK = "#0a1a10";
const DARK2 = "#07111e";

export default function DiscountFlow({ placeId, placeName, category, discountInfo, onClose }: DiscountFlowProps) {
  const [step, setStep] = useState<Step>("intro");
  const [phase, setPhase] = useState<"locked" | "holding" | "revealed">("locked");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [celebration, setCelebration] = useState<{ savedKc: number; pointsEarned: number; leveledUp: boolean; newAchievement?: string } | null>(null);

  const { redeemDiscount, hasRedeemed } = useGame();
  const alreadyUsed = hasRedeemed(placeId);

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
        setTimeout(() => setStep("qr"), 700);
      }
    }, 25);
  }, [phase, alreadyUsed]);

  const cancelHold = useCallback(() => {
    if (phase !== "holding") return;
    clearInterval(intervalRef.current!);
    setPhase("locked");
    setProgress(0);
  }, [phase]);

  const handleConfirm = () => {
    const result = redeemDiscount({ placeId, placeName, savedKc: discountInfo.estimatedSaving, pointsReward: discountInfo.pointsReward, category });
    setCelebration({ savedKc: discountInfo.estimatedSaving, pointsEarned: discountInfo.pointsReward, leveledUp: result.leveledUp, newAchievement: result.newAchievement });
  };

  const circumference = 2 * Math.PI * 30;
  const steps: Step[] = ["intro", "reveal", "qr", "confirm"];
  const stepIndex = steps.indexOf(step);

  if (celebration) {
    return (
      <SavingsCelebration
        {...celebration}
        placeId={placeId}
        placeName={placeName}
        onClose={() => { setCelebration(null); onClose(); }}
      />
    );
  }

  if (alreadyUsed) {
    return (
      <div className="p-6 text-center">
        <CheckCircle2 size={48} color="#1a7a5e" className="mx-auto mb-4" />
        <p className="font-black text-xl mb-2" style={{ color: "var(--text-main)" }}>Sleva již uplatněna</p>
        <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>U tohoto místa jste slevu již využili.</p>
        <button onClick={onClose} className="font-bold text-base" style={{ color: "var(--green)" }}>Zavřít</button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6 px-1">
        {steps.map((s, i) => (
          <div key={s} className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: i <= stepIndex ? "linear-gradient(90deg, #1a7a5e, #2563eb)" : "rgba(0,0,0,0.10)" }} />
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── INTRO ── */}
        {step === "intro" && (
          <motion.div key="intro"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
          >
            {/* Sleva highlight */}
            <div className="rounded-3xl p-5 mb-5 text-center"
              style={{ background: `linear-gradient(135deg, ${DARK}, ${DARK2})` }}>
              <p className="text-base font-semibold mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                S Návštěvnickou kartou ušetříte
              </p>
              <p className="font-black leading-none mb-2"
                style={{ fontSize: 56, fontFamily: "var(--font-outfit)", background: "linear-gradient(135deg, #34d99a, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {discountInfo.estimatedSaving} Kč
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>{discountInfo.description}</p>
            </div>

            {/* Instrukce */}
            {[
              { icon: ShieldCheck, text: "Mějte aplikaci aktivní na mobilu" },
              { icon: QrCode,      text: "Ukažte QR kód u pokladny" },
              { icon: Clock,       text: "Uplatněte před zaplacením" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div key={text}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07 }}
                className="flex items-center gap-4 py-3 border-b"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(26,122,94,0.10)" }}>
                  <Icon size={18} color="#1a7a5e" />
                </div>
                <p className="text-base font-medium" style={{ color: "var(--text-sub)" }}>{text}</p>
              </motion.div>
            ))}

            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("reveal")}
              className="w-full mt-6 py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}>
              Zobrazit mou slevu
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* ── REVEAL ── */}
        {step === "reveal" && (
          <motion.div key="reveal"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            {phase !== "revealed" ? (
              <div className="rounded-3xl p-8 flex flex-col items-center gap-6 cursor-pointer select-none touch-none"
                style={{ background: `linear-gradient(135deg, ${DARK}, ${DARK2})` }}
                onPointerDown={startHold} onPointerUp={cancelHold} onPointerLeave={cancelHold}>

                {/* Kruhový progress */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 68 68">
                    <circle cx="34" cy="34" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" fill="none" />
                    <circle cx="34" cy="34" r="30"
                      stroke="url(#fg)" strokeWidth="3.5" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (circumference * progress) / 100} />
                    <defs>
                      <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d99a" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <motion.div
                    animate={{ scale: phase === "holding" ? [1, 1.12, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 0.55 }}
                    className="w-16 h-16 rounded-3xl flex items-center justify-center"
                    style={{ background: "rgba(34,201,138,0.18)" }}>
                    <Sparkles size={28} color="#34d99a" />
                  </motion.div>
                </div>

                <div className="text-center">
                  <p className="font-black text-2xl text-white mb-2">
                    {phase === "holding" ? "Držte…" : "Podržte pro odhalení"}
                  </p>
                  <p className="text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Vaše sleva se zobrazí jen vám
                  </p>
                </div>

                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, background: "linear-gradient(90deg, #34d99a, #2563eb)" }} />
                </div>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="rounded-3xl p-8 text-center"
                style={{ background: `linear-gradient(135deg, ${DARK}, ${DARK2})` }}>
                <p className="font-black leading-none mb-3"
                  style={{ fontSize: 72, fontFamily: "var(--font-outfit)", background: "linear-gradient(135deg, #34d99a, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {discountInfo.label}
                </p>
                <p className="text-base" style={{ color: "rgba(255,255,255,0.55)" }}>{discountInfo.description}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── QR ── */}
        {step === "qr" && (
          <motion.div key="qr"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>

            <div className="text-center mb-5">
              <p className="font-black text-2xl mb-1" style={{ color: "var(--text-main)" }}>Ukažte u pokladny</p>
              <p className="text-base" style={{ color: "var(--text-muted)" }}>Personál naskenuje QR kód vaší karty</p>
            </div>

            <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
              className="bg-white rounded-3xl p-5 mx-auto w-fit mb-4 shadow-lg relative">
              <div className="absolute inset-3 border-2 border-dashed rounded-2xl pointer-events-none" style={{ borderColor: "rgba(26,122,94,0.25)" }} />
              <QrCode size={160} color="#0a1a10" strokeWidth={1.2} />
            </motion.div>

            <div className="rounded-2xl px-4 py-3 mb-6 flex items-center justify-between"
              style={{ background: "rgba(26,122,94,0.08)", border: "1px solid rgba(26,122,94,0.15)" }}>
              <span className="text-base font-semibold" style={{ color: "var(--text-sub)" }}>Platnost kódu</span>
              <span className="font-black text-lg font-mono" style={{ color: "var(--green)" }}>04:59</span>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("confirm")}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}>
              Sleva byla uplatněna ✓
            </motion.button>
          </motion.div>
        )}

        {/* ── CONFIRM ── */}
        {step === "confirm" && (
          <motion.div key="confirm"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>

            <div className="rounded-3xl p-6 mb-5 text-center"
              style={{ background: `linear-gradient(135deg, ${DARK}, ${DARK2})` }}>
              <p className="font-black text-2xl text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Potvrdit uplatnění?
              </p>
              <p className="text-base mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Přidáme do vašich úspor</p>
              <p className="font-black text-4xl mb-1"
                style={{ background: "linear-gradient(135deg, #34d99a, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-outfit)" }}>
                {discountInfo.estimatedSaving} Kč
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Sparkles size={16} color="#d97706" />
                <span className="font-bold text-base" style={{ color: "#d97706" }}>+{discountInfo.pointsReward} bodů</span>
              </div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirm}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white mb-3 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}>
              Ano, potvrdit ✓
            </motion.button>
            <button onClick={() => setStep("qr")}
              className="w-full py-3 text-base font-semibold" style={{ color: "var(--text-muted)" }}>
              ← Zpět k QR kódu
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
