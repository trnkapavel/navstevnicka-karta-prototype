"use client";

import { motion } from "framer-motion";
import { Ticket, Utensils, BedDouble, TreePine } from "lucide-react";

interface SlideProps {
  onNext: () => void;
  onSkip: () => void;
}

const benefits = [
  {
    icon: Ticket,
    label: "Zážitky",
    desc: "Slevy 15–25 % na jeskyně, hrady a aquaparky",
    color: "#22c98a",
  },
  {
    icon: Utensils,
    label: "Restaurace",
    desc: "Dezert nebo nápoj zdarma k hlavnímu jídlu",
    color: "#3b82f6",
  },
  {
    icon: BedDouble,
    label: "Ubytování",
    desc: "Zvýhodněné ceny u prověřených penzionů",
    color: "#f59e0b",
  },
  {
    icon: TreePine,
    label: "Příroda",
    desc: "100+ tipů na výlety v CHKO Brdy a Křivoklátsku",
    color: "#a78bfa",
  },
];

export default function SlideDiscover({ onNext, onSkip }: SlideProps) {
  return (
    <div className="relative flex flex-col h-full w-full bg-[#0f2547]">
      {/* Hero image */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
          alt="Výlety v regionu"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,37,71,0.2) 0%, rgba(15,37,71,0.98) 100%)" }} />

        <div className="absolute top-0 right-0 px-6 pt-14 safe-top">
          <button onClick={onSkip} className="text-white/50 text-sm font-medium">
            Přeskočit
          </button>
        </div>
      </div>

      {/* Nadpis */}
      <div className="px-6 pt-5 pb-4 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 400 }}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3"
          style={{ background: "rgba(34,201,138,0.15)", border: "1px solid rgba(34,201,138,0.3)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-300 text-xs font-semibold">20 partnerů v regionu</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 28 }}
          className="text-2xl font-black text-white leading-tight"
        >
          Stovky výhod<br />v jedné kartě
        </motion.h2>
      </div>

      {/* Feature list — informativní, ne klikatelný */}
      <div className="flex-1 px-6 flex flex-col justify-center gap-4 pb-4">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.09, type: "spring", stiffness: 300, damping: 28 }}
              className="flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${b.color}22` }}
              >
                <Icon size={18} color={b.color} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-none mb-0.5">{b.label}</p>
                <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.50)" }}>{b.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA — jediný interaktivní prvek */}
      <div className="px-5 pb-10 safe-bottom flex-shrink-0">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-bold text-base text-white active:scale-95 transition-transform shadow-xl"
          style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)", boxShadow: "0 8px 32px rgba(26,122,94,0.35)" }}
        >
          Jak to funguje →
        </motion.button>
      </div>
    </div>
  );
}
