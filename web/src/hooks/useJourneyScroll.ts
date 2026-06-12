"use client";

import { useContext } from "react";
import {
  JourneyScrollContext,
  type JourneyScrollContextValue,
} from "@/providers/ScrollProvider";

export function useJourneyScroll(): JourneyScrollContextValue {
  const ctx = useContext(JourneyScrollContext);
  if (!ctx) {
    throw new Error("useJourneyScroll musí být uvnitř ScrollProvider");
  }
  return ctx;
}
