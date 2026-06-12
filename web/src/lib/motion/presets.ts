import type { Transition } from "motion/react";

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
};

export const springTravel: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 28,
  mass: 0.75,
};

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

/** Jemné vstupy/výstupy — Alfred, bubliny */
export const gentleEase = [0.25, 0.82, 0.3, 1] as const;

export const springAlfred: Transition = {
  type: "spring",
  stiffness: 68,
  damping: 18,
  mass: 0.9,
};

export function motionTransition(
  reduced: boolean,
  transition: Transition,
): Transition {
  return reduced ? { duration: 0 } : transition;
}
