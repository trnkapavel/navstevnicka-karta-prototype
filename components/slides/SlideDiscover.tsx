"use client";

import { motion } from "framer-motion";
import { Utensils, Bed, TreePine, Ticket } from "lucide-react";

interface SlideProps {
  onNext: () => void;
  onSkip: () => void;
}

const benefits = [
  {
    icon: Ticket,
    label: "Zážitky",
    desc: "Slevy až 50 %",
    color: "#3d9970",
    bg: "rgba(61,153,112,0.12)",
  },
  {
    icon: Utensils,
    label: "Restaurace",
    desc: "Jídlo zdarma",
    color: "#2d7dd2",
    bg: "rgba(45,125,210,0.12)",
  },
  {
    icon: Bed,
    label: "Ubytování",
    desc: "Výhodné ceny",
    color: "#e07b39",
    bg: "rgba(224,123,57,0.12)",
  },
  {
    icon: TreePine,
    label: "Příroda",
    desc: "100+ výletů",
    color: "#5c6bc0",
    bg: "rgba(92,107,192,0.12)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 28,
      delay: 0.15 + i * 0.08,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 28, delay: 0.1 } },
};

export default function SlideDiscover({ onNext, onSkip }: SlideProps) {
  return (
    <div className="relative flex flex-col h-full w-full bg-[#0f2547]">
      {/* Top image strip */}
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
          alt="Výlety v regionu"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,37,71,0.2) 0%, rgba(15,37,71,0.95) 100%)",
          }}
        />
        {/* Skip */}
        <div className="absolute top-0 right-0 px-6 pt-14 safe-top">
          <button
            onClick={onSkip}
            className="text-white/50 text-sm font-medium"
          >
            Přeskočit
          </button>
        </div>

        <div className="absolute bottom-5 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, type: "spring", stiffness: 400 }}
            className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 rounded-full px-3 py-1 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">200+ partnerů v regionu</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-3xl font-bold text-white leading-tight"
          >
            Stovky výhod
            <br />v jedné kartě
          </motion.h2>
        </div>
      </div>

      {/* Benefit cards */}
      <div className="flex-1 px-5 pt-5 pb-28 overflow-hidden">
        <div className="grid grid-cols-2 gap-3 h-full">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col justify-between p-4 rounded-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: b.bg }}
                >
                  <Icon size={20} color={b.color} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-semibold text-base">{b.label}</p>
                  <p className="text-white/50 text-sm mt-0.5">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 safe-bottom">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 300 }}
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}
        >
          Jak to funguje →
        </motion.button>
      </div>
    </div>
  );
}
