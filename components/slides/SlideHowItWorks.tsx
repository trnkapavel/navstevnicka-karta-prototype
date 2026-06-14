"use client";

import { motion } from "framer-motion";
import { UserPlus, CreditCard, Tag } from "lucide-react";

interface SlideProps {
  onNext: () => void;
  onSkip: () => void;
}

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Zaregistruj se",
    desc: "Rychlá registrace online během 30 sekund. E-mail a hotovo.",
    color: "#3d9970",
    gradFrom: "#0f4d35",
    gradTo: "#1a7a55",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Získej kartu",
    desc: "Digitální karta ihned v aplikaci. Fyzická karta zdarma poštou nebo u partnera.",
    color: "#4a9ede",
    gradFrom: "#0d3460",
    gradTo: "#1b5599",
  },
  {
    icon: Tag,
    step: "03",
    title: "Uplatňuj slevy",
    desc: "Ukáž kartu v mobilu a sleva je tvá. U 200+ partnerů v celém regionu.",
    color: "#e07b39",
    gradFrom: "#4d2a0a",
    gradTo: "#8a4515",
  },
];

export default function SlideHowItWorks({ onNext, onSkip }: SlideProps) {
  return (
    <div className="relative flex flex-col h-full w-full bg-[#0a1f3d]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #3d9970 0%, transparent 50%), radial-gradient(circle at 80% 80%, #2d7dd2 0%, transparent 50%)",
        }}
      />

      {/* Skip */}
      <div className="relative z-10 flex justify-end px-6 pt-14 safe-top">
        <button onClick={onSkip} className="text-white/40 text-sm font-medium">
          Přeskočit
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-10 px-6 pt-4 pb-6"
      >
        <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-2">
          Jednoduché jako 1 · 2 · 3
        </p>
        <h2 className="text-3xl font-bold text-white leading-tight">
          Jak karta
          <br />funguje?
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="relative z-10 flex-1 px-5 flex flex-col gap-3 overflow-y-auto pb-36">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.25 + i * 0.14,
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})`,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Icon + step number */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Icon size={24} color={s.color} strokeWidth={2} />
                </div>
                <div
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white font-black text-[10px]"
                  style={{ backgroundColor: s.color }}
                >
                  {i + 1}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base mb-0.5">{s.title}</p>
                <p className="text-white/60 text-sm leading-snug">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-8 pt-4 safe-bottom" style={{ background: "linear-gradient(to top, #0a1f3d 70%, transparent)" }}>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-bold text-base text-[#0a1f3d] active:scale-95 transition-transform shadow-xl"
          style={{
            background: "linear-gradient(135deg, #52c895, #3d9970)",
            boxShadow: "0 8px 32px rgba(61,153,112,0.4)",
          }}
        >
          Zaregistrovat se zdarma
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          onClick={onSkip}
          className="w-full py-3 mt-2 text-white/50 text-sm font-medium"
        >
          Prozatím jen procházet
        </motion.button>
      </div>
    </div>
  );
}
