"use client";

import { motion } from "framer-motion";

interface SlideProps {
  onNext: () => void;
  onSkip: () => void;
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
};

export default function SlideWelcome({ onNext, onSkip }: SlideProps) {
  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
          alt="Region Berounska"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Gradient overlay — text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,37,71,0.35) 0%, rgba(15,37,71,0.1) 40%, rgba(15,37,71,0.85) 70%, rgba(15,37,71,0.97) 100%)",
          }}
        />
      </div>

      {/* Skip button */}
      <div className="relative z-10 flex justify-end px-6 pt-14 safe-top">
        <button
          onClick={onSkip}
          className="text-white/60 text-sm font-medium px-3 py-1 rounded-full hover:text-white/90 transition-colors"
        >
          Přeskočit
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto px-6 pb-28">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 350, damping: 25 }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-5"
        >
          <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
            Berounsko · Brd · Podbrdsko
          </span>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-white leading-tight mb-3"
          >
            Návštěvnická
            <br />
            <span className="text-green-400">karta regionu</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/75 text-base leading-relaxed mb-8">
            Stovky slev na výlety, ubytování a gastronomii — vše v jediné kartě.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <button
              onClick={onNext}
              className="w-full bg-white text-navy font-semibold text-base py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
              style={{ color: "#1b3a6b" }}
            >
              Začít zdarma
            </button>
            <button
              onClick={onSkip}
              className="w-full border border-white/30 text-white font-medium text-base py-4 rounded-2xl active:scale-95 transition-transform backdrop-blur-sm"
            >
              Mám již kartu
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
