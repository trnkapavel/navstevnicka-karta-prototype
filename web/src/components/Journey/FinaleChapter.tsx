"use client";

import { useRef } from "react";
import type { FinaleCta } from "@/data/journeyData";
import { useScrollTriggersReady } from "@/hooks/useScrollTriggers";
import { useJourneyScroll } from "@/hooks/useJourneyScroll";
import {
  gsap,
  registerGsapPlugins,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap/register";
import styles from "./FinaleChapter.module.css";

type FinaleChapterProps = {
  finale: FinaleCta;
};

export function FinaleChapter({ finale }: FinaleChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggersReady = useScrollTriggersReady();
  const {
    setActiveBeat,
    setChapterProgress,
    setIsPinned,
    prefersReducedMotion,
  } = useJourneyScroll();

  const { pinVh } = finale.motion;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!triggersReady || !sectionRef.current) return;

      const meshCore = sectionRef.current.querySelector(`.${styles.meshCore}`);
      const meshGrid = sectionRef.current.querySelector(`.${styles.meshGrid}`);
      const meshBloom = sectionRef.current.querySelector(`.${styles.meshBloom}`);
      const headline = sectionRef.current.querySelector(`.${styles.headline}`);
      const line1 = sectionRef.current.querySelector(`.${styles.line1}`);
      const line2 = sectionRef.current.querySelector(`.${styles.line2}`);
      const cta = sectionRef.current.querySelector(`.${styles.cta}`);
      const ctaGlow = sectionRef.current.querySelector(`.${styles.ctaGlow}`);
      const fade = sectionRef.current.querySelector(`.${styles.fade}`);
      const vignette = sectionRef.current.querySelector(`.${styles.vignette}`);

      if (prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => setActiveBeat(8),
          onEnterBack: () => setActiveBeat(8),
        });
        gsap.set(
          [meshCore, meshGrid, meshBloom, headline, line1, line2, cta, ctaGlow],
          { clearProps: "all", opacity: 1, scale: 1, y: 0 },
        );
        gsap.set(fade, { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${pinVh}%`,
          pin: sectionRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => setActiveBeat(8),
          onEnterBack: () => setActiveBeat(8),
          onUpdate: (self) => {
            setChapterProgress(self.progress);
            setIsPinned(self.isActive && self.progress > 0 && self.progress < 1);
          },
          onLeave: () => setIsPinned(false),
          onLeaveBack: () => setIsPinned(false),
        },
      });

      gsap.set([meshCore, meshGrid, meshBloom], {
        scale: 0.55,
        opacity: 0,
        transformOrigin: "50% 55%",
      });
      gsap.set(fade, { opacity: 0 });
      gsap.set(vignette, { opacity: 0.4 });
      gsap.set(headline, { opacity: 0 });
      gsap.set([line1, line2], { opacity: 0, y: 36 });
      gsap.set([cta, ctaGlow], { opacity: 0, scale: 0.88 });

      tl.to(
        meshCore,
        { opacity: 1, scale: 1.15, duration: 0.22, ease: "power2.out" },
        0,
      )
        .to(
          meshGrid,
          { opacity: 0.55, scale: 1, duration: 0.18, ease: "power2.out" },
          0.06,
        )
        .to(
          meshBloom,
          { opacity: 0.75, scale: 1.25, duration: 0.2, ease: "power1.out" },
          0.08,
        )
        .to(headline, { opacity: 1, duration: 0.08 }, 0.14)
        .to(
          line1,
          { opacity: 1, y: 0, duration: 0.12, ease: "power3.out" },
          0.16,
        )
        .to(
          line2,
          { opacity: 1, y: 0, duration: 0.12, ease: "power3.out" },
          0.22,
        )
        .to(
          ctaGlow,
          { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
          0.3,
        )
        .to(
          cta,
          { opacity: 1, scale: 1, duration: 0.12, ease: "back.out(1.6)" },
          0.32,
        )
        .to(
          [meshCore, meshBloom],
          { scale: 1.35, duration: 0.2, ease: "none" },
          0.42,
        )
        .to(
          meshGrid,
          { opacity: 0.75, rotate: 6, duration: 0.25, ease: "none" },
          0.45,
        )
        .to(vignette, { opacity: 0.85, duration: 0.2, ease: "power1.in" }, 0.58)
        .to(fade, { opacity: 1, duration: 0.32, ease: "power2.in" }, 0.62)
        .to(
          [line1, line2, cta],
          { opacity: 0, y: -12, duration: 0.22, ease: "power2.in" },
          0.68,
        )
        .to(
          [meshCore, meshGrid, meshBloom],
          { opacity: 0.2, scale: 1.5, duration: 0.28, ease: "power2.in" },
          0.65,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [pinVh, prefersReducedMotion, triggersReady],
    },
  );

  return (
    <section
      ref={sectionRef}
      id="finale"
      className={styles.section}
      data-profile="finale"
      aria-label="Závěrečná výzva"
    >
      <div className={styles.atmosphere} aria-hidden>
          <div className={styles.meshCore} />
          <div className={styles.meshGrid} />
          <div className={styles.meshBloom} />
          <div className={styles.vignette} />
        </div>

        <div className={styles.fade} aria-hidden />

        <div className={styles.inner}>
          <p className={styles.eyebrow}>Finále</p>
          <h2 className={styles.headline}>
            <span className={styles.line1}>
              Začněte s <em>{finale.h2Em}</em>.
            </span>
            <span className={styles.line2}>{finale.h2Line2}</span>
          </h2>

          <div className={styles.ctaWrap}>
            <span className={styles.ctaGlow} aria-hidden />
            <a className={styles.cta} href={finale.buttonHref}>
              {finale.buttonLabel}
            </a>
          </div>
        </div>
    </section>
  );
}
