"use client";

import { useJourneyScroll } from "@/hooks/useJourneyScroll";

/** ScrollTrigger vytvářet až po inicializaci Lenis — jinak se sekce překrývají. */
export function useScrollTriggersReady(): boolean {
  const { scrollReady, prefersReducedMotion } = useJourneyScroll();
  return scrollReady || prefersReducedMotion;
}
