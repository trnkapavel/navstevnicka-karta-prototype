"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { EpilogueContent, EpiloguePanel } from "@/data/journeyData";
import { useScrollTriggersReady } from "@/hooks/useScrollTriggers";
import { useJourneyScroll } from "@/hooks/useJourneyScroll";
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import {
  fadeUp,
  revealTransition,
  revealViewport,
  revealViewportRepeat,
  staggerParent,
} from "@/lib/motion/scrollReveal";
import styles from "./EpilogueSection.module.css";

type EpilogueSectionProps = {
  epilogue: EpilogueContent;
};

function formatIndex(n: number) {
  return String(n).padStart(2, "0");
}

function StackCard({
  panel,
  index,
  theme,
}: {
  panel: EpiloguePanel;
  index: number;
  theme: "dark" | "light";
}) {
  return (
    <article
      className={styles.stackCard}
      data-theme={theme}
      data-index={index}
    >
      <div className={styles.cardCopy}>
        <span className={styles.cardIndex} aria-hidden>
          {formatIndex(index + 1)}
        </span>
        <h3 className={styles.cardTitle}>{panel.h3}</h3>
        <p className={styles.cardBody}>{panel.body}</p>
        {panel.screenshotCta && (
          <a className={styles.cardCta} href={panel.screenshotCta.href}>
            <span>{panel.screenshotCta.label}</span>
            <span className={styles.linkArrow} aria-hidden>
              →
            </span>
          </a>
        )}
      </div>
      <div className={styles.cardVisual}>
        <div className={styles.screenshotGlow} aria-hidden />
        <div className={styles.screenshotFrame}>
          <span>Previo screenshot</span>
        </div>
      </div>
    </article>
  );
}

export function EpilogueSection({ epilogue }: EpilogueSectionProps) {
  const reduced = useReducedMotion() ?? false;
  const triggersReady = useScrollTriggersReady();
  const { setIsPinned, prefersReducedMotion } = useJourneyScroll();
  const blockRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { bridge, panels } = epilogue;
  const panelCount = panels.length;
  const pinVh = Math.max(panelCount * 105, 280);

  useGSAP(
    () => {
      if (!triggersReady || !pinRef.current || !viewportRef.current || !trackRef.current) {
        return;
      }
      registerGsapPlugins();

      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        if (prefersReducedMotion) return;

        const track = trackRef.current!;
        const viewport = viewportRef.current!;
        const cards = gsap.utils.toArray<HTMLElement>(
          track.querySelectorAll(`.${styles.stackCard}`),
        );
        const dots = gsap.utils.toArray<HTMLElement>(
          progressRef.current?.querySelectorAll(`.${styles.progressDot}`) ?? [],
        );

        const getScrollDistance = () =>
          Math.max(track.scrollWidth - viewport.clientWidth, 0);

        cards.forEach((card) => {
          gsap.set(card, {
            force3D: true,
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            zIndex: 10,
          });
        });

        const st = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: `+=${pinVh}%`,
          pin: viewportRef.current,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => setIsPinned(true),
          onLeave: () => setIsPinned(false),
          onEnterBack: () => setIsPinned(true),
          onLeaveBack: () => setIsPinned(false),
          onUpdate: (self) => {
            const progress = self.progress;
            const distance = getScrollDistance();
            gsap.set(track, { x: -progress * distance, force3D: true });

            cards.forEach((card, i) => {
              const segment = 1 / Math.max(panelCount - 1, 1);
              const cardCenter = i * segment;
              const delta = progress - cardCenter;
              const behind = delta > segment * 0.38;
              const ahead = delta < -segment * 0.22;
              const stackDepth = behind
                ? Math.min(
                    panelCount - 1,
                    Math.floor((progress - cardCenter) / segment) + 1,
                  )
                : 0;

              if (behind) {
                gsap.set(card, {
                  scale: Math.max(0.9, 0.97 - stackDepth * 0.03),
                  opacity: Math.max(0.72, 0.98 - stackDepth * 0.1),
                  x: stackDepth * 12,
                  y: stackDepth * -8,
                  zIndex: 10 + i,
                });
              } else if (ahead) {
                gsap.set(card, {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: 0,
                  zIndex: 20 + i,
                });
              } else {
                const local = gsap.utils.clamp(
                  0,
                  1,
                  (progress - (cardCenter - segment * 0.38)) / (segment * 0.76),
                );
                gsap.set(card, {
                  scale: 0.96 + local * 0.04,
                  opacity: 0.92 + local * 0.08,
                  x: (1 - local) * 16,
                  y: (1 - local) * -6,
                  zIndex: 30 + i,
                });
              }
            });

            dots.forEach((dot, i) => {
              const active =
                progress >= i / panelCount - 0.05 &&
                progress < (i + 1) / panelCount + 0.05;
              dot.classList.toggle(styles.progressDotActive, active);
            });
          },
        });

        if (bridgeRef.current) {
          gsap.fromTo(
            bridgeRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -32,
              ease: "none",
              scrollTrigger: {
                trigger: pinRef.current,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            },
          );
        }

        return () => st.kill();
      });

      return () => mm.revert();
    },
    {
      scope: blockRef,
      dependencies: [
        panelCount,
        pinVh,
        triggersReady,
        prefersReducedMotion,
        setIsPinned,
      ],
    },
  );

  return (
    <div ref={blockRef} className={styles.block} aria-label="Doplňující informace o Previo">
      <section ref={bridgeRef} className={styles.bridge} data-theme="light">
        <motion.div
          className={styles.bridgeInner}
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.p className={styles.bridgeLabel} variants={fadeUp}>
            A ještě víc
          </motion.p>
          <motion.h2 className={styles.bridgeTitle} variants={fadeUp}>
            {bridge.h3}
          </motion.h2>
          <motion.p
            className={styles.bridgeBody}
            variants={fadeUp}
            transition={revealTransition(reduced, 0.08)}
          >
            {bridge.body}
          </motion.p>
        </motion.div>
      </section>

      <div
        ref={pinRef}
        className={styles.stackSection}
        style={{ "--stack-pin-vh": pinVh } as CSSProperties}
      >
        <div ref={viewportRef} className={styles.stackViewport}>
          <div className={styles.stackHeader}>
            <p className={styles.stackEyebrow}>A ještě víc</p>
            <p className={styles.stackHint}>
              Posouvejte dolů — karty se skládají vodorovně
            </p>
            <div ref={progressRef} className={styles.progress} aria-hidden>
              {panels.map((panel, i) => (
                <span
                  key={panel.id}
                  className={styles.progressDot}
                  data-active={i === 0 || undefined}
                />
              ))}
            </div>
          </div>

          <div className={styles.trackWrap}>
            <div ref={trackRef} className={styles.stackTrack}>
              {panels.map((panel, index) => (
                <StackCard
                  key={panel.id}
                  panel={panel}
                  index={index}
                  theme={index % 2 === 0 ? "dark" : "light"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobil — vertikální stack bez pinu */}
      <div className={styles.mobileStack}>
        {panels.map((panel, index) => (
          <motion.section
            key={`m-${panel.id}`}
            className={styles.mobileCard}
            data-theme={index % 2 === 0 ? "dark" : "light"}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewportRepeat}
            transition={revealTransition(reduced, index * 0.05)}
          >
            <StackCard panel={panel} index={index} theme={index % 2 === 0 ? "dark" : "light"} />
          </motion.section>
        ))}
      </div>
    </div>
  );
}
