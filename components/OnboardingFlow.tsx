"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import SlideWelcome from "./slides/SlideWelcome";
import SlideDiscover from "./slides/SlideDiscover";
import SlideHowItWorks from "./slides/SlideHowItWorks";

const SLIDES = [SlideWelcome, SlideDiscover, SlideHowItWorks];
const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const transition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 35,
  mass: 0.8,
};

export default function OnboardingFlow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    if (current < SLIDES.length - 1) {
      goTo(current + 1);
    } else {
      router.push("/register");
    }
  }, [current, goTo, router]);

  const goPrev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  const handleSkip = useCallback(() => {
    router.push("/app");
  }, [router]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -500) {
        goNext();
      } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 500) {
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  const SlideComponent = SLIDES[current];

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden bg-navy-dark">
      {/* Slides */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 flex flex-col"
          style={{ touchAction: "pan-y" }}
        >
          <SlideComponent onNext={goNext} onSkip={handleSkip} />
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-0 left-0 right-0 pb-safe flex justify-center gap-2 pb-8 z-50 pointer-events-none">
        {SLIDES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            className="pointer-events-auto"
            animate={{
              width: i === current ? 24 : 8,
              backgroundColor:
                i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ height: 8, borderRadius: 4 }}
            aria-label={`Přejít na slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
