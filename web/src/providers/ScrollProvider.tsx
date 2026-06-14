"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { connectLenisScroll, refreshScrollLayout } from "@/lib/gsap/connectLenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

export type JourneyScrollContextValue = {
  activeBeat: number;
  scrollProgress: number;
  chapterProgress: number;
  isPinned: boolean;
  scrollReady: boolean;
  prefersReducedMotion: boolean;
  setActiveBeat: (beat: number) => void;
  setChapterProgress: (progress: number) => void;
  setIsPinned: (pinned: boolean) => void;
};

export const JourneyScrollContext =
  createContext<JourneyScrollContextValue | null>(null);

type ScrollProviderProps = {
  children: ReactNode;
};

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [activeBeat, setActiveBeatState] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);

  const setActiveBeat = useCallback((beat: number) => {
    setActiveBeatState(beat);
  }, []);

  const setChapterProgressStable = useCallback((progress: number) => {
    setChapterProgress(progress);
  }, []);

  const isPinnedRef = useRef(false);
  const unpinnedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Pin okamžitě; odpin až po krátké prodlevě — méně blikání Alfreda na hraně pin zóny */
  const setIsPinnedStable = useCallback((pinned: boolean) => {
    if (pinned) {
      if (unpinnedTimerRef.current) {
        clearTimeout(unpinnedTimerRef.current);
        unpinnedTimerRef.current = null;
      }
      if (!isPinnedRef.current) {
        isPinnedRef.current = true;
        setIsPinned(true);
      }
      return;
    }

    if (!isPinnedRef.current) return;

    unpinnedTimerRef.current = setTimeout(() => {
      isPinnedRef.current = false;
      setIsPinned(false);
      unpinnedTimerRef.current = null;
    }, 320);
  }, []);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = motionQuery.matches;
    setPrefersReducedMotion(reduced);

    const updateScrollProgress = () => {
      const scrollPos = lenisRef.current?.scroll ?? window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? scrollPos / max : 0);
    };

    let nativeScrollHandler: (() => void) | null = null;

    if (!reduced) {
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
        autoResize: true,
      });
      lenisRef.current = lenis;
      connectLenisScroll(lenis);

      lenis.on("scroll", updateScrollProgress);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };
      tickerRef.current = ticker;
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    } else {
      nativeScrollHandler = () => {
        updateScrollProgress();
        ScrollTrigger.update();
      };
      window.addEventListener("scroll", nativeScrollHandler, { passive: true });
    }

    setScrollReady(true);
    updateScrollProgress();
    refreshScrollLayout();

    const onResize = () => refreshScrollLayout();
    window.addEventListener("resize", onResize);

    const onMotionChange = () => {
      setPrefersReducedMotion(motionQuery.matches);
      refreshScrollLayout();
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
      if (nativeScrollHandler) {
        window.removeEventListener("scroll", nativeScrollHandler);
      }
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
        tickerRef.current = null;
      }
      if (unpinnedTimerRef.current) {
        clearTimeout(unpinnedTimerRef.current);
        unpinnedTimerRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      setScrollReady(false);
    };
  }, []);

  useEffect(() => {
    if (!scrollReady) return;
    const id = window.setTimeout(() => refreshScrollLayout(), 150);
    return () => window.clearTimeout(id);
  }, [scrollReady]);

  const value = useMemo<JourneyScrollContextValue>(
    () => ({
      activeBeat,
      scrollProgress,
      chapterProgress,
      isPinned,
      scrollReady,
      prefersReducedMotion,
      setActiveBeat,
      setChapterProgress: setChapterProgressStable,
      setIsPinned: setIsPinnedStable,
    }),
    [
      activeBeat,
      scrollProgress,
      chapterProgress,
      isPinned,
      scrollReady,
      prefersReducedMotion,
      setActiveBeat,
      setChapterProgressStable,
      setIsPinnedStable,
    ],
  );

  return (
    <JourneyScrollContext.Provider value={value}>
      {children}
    </JourneyScrollContext.Provider>
  );
}
