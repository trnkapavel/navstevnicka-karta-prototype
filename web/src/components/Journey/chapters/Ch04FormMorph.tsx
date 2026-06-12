"use client";

import { useRef, type CSSProperties } from "react";
import type { JourneySection } from "@/data/journeyData";
import { useScrollTriggersReady } from "@/hooks/useScrollTriggers";
import { useJourneyScroll } from "@/hooks/useJourneyScroll";
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import styles from "./Ch04FormMorph.module.css";

const FORM_FIELDS = [
  { label: "Jméno a příjmení", value: "Anna Svobodová" },
  { label: "Datum narození", value: "15. 3. 1988" },
  { label: "Číslo dokladu", value: "•••• 4821" },
  { label: "E-mail", value: "anna@email.cz" },
] as const;

const PIN_DIGITS = ["4", "7", "2", "9"] as const;

const ORBIT_ANGLES = [-90, 0, 90, 180] as const;

type Ch04FormMorphProps = {
  section: JourneySection;
};

export function Ch04FormMorph({ section }: Ch04FormMorphProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggersReady = useScrollTriggersReady();
  const {
    setActiveBeat,
    setChapterProgress,
    setIsPinned,
    prefersReducedMotion,
  } = useJourneyScroll();

  const { index: beat, tag, h3, motion, cards } = section;
  const { pinVh } = motion;
  const capabilities =
    cards?.map((card) => ({
      label: card.cta?.label ?? "Služba",
      hint: card.text.slice(0, 72) + (card.text.length > 72 ? "…" : ""),
    })) ?? [];

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!triggersReady || !sectionRef.current || !stageRef.current) return;

      const header = sectionRef.current.querySelector(`.${styles.header}`);
      const fields = sectionRef.current.querySelectorAll(`.${styles.field}`);
      const valueBars = sectionRef.current.querySelectorAll(`.${styles.valueBar}`);
      const pinDigits = sectionRef.current.querySelectorAll(`.${styles.pinDigit}`);
      const orbitCards = sectionRef.current.querySelectorAll(
        `.${styles.orbitItem}`,
      );
      const formPanel = sectionRef.current.querySelector(`.${styles.formPanel}`);
      const orbitRing = sectionRef.current.querySelector(`.${styles.orbitRing}`);
      const orbitRingFill = sectionRef.current.querySelector(
        `.${styles.orbitRingFill}`,
      );
      const ringCircumference = 2 * Math.PI * 46;

      if (prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => setActiveBeat(beat),
          onEnterBack: () => setActiveBeat(beat),
        });
        gsap.set(
          [header, ...fields, ...orbitCards, formPanel, ...pinDigits],
          { clearProps: "all", opacity: 1, scale: 1, y: 0 },
        );
        gsap.set(valueBars, { scaleX: 1 });
        if (orbitRingFill) {
          gsap.set(orbitRingFill, {
            strokeDasharray: ringCircumference,
            strokeDashoffset: ringCircumference * 0.15,
          });
        }
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
          onEnter: () => setActiveBeat(beat),
          onEnterBack: () => setActiveBeat(beat),
          onUpdate: (self) => {
            setChapterProgress(self.progress);
            setIsPinned(self.isActive && self.progress > 0 && self.progress < 1);
          },
          onLeave: () => setIsPinned(false),
          onLeaveBack: () => setIsPinned(false),
        },
      });

      gsap.set(orbitCards, { opacity: 0 });
      gsap.set(valueBars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(pinDigits, { opacity: 0, scale: 0.4, y: 8 });
      gsap.set(formPanel, { opacity: 0.6, scale: 0.96 });
      gsap.set(header, { opacity: 0, y: 36 });
      if (orbitRingFill) {
        gsap.set(orbitRingFill, {
          strokeDasharray: ringCircumference,
          strokeDashoffset: ringCircumference,
        });
      }

      tl.to(header, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0)
        .to(
          formPanel,
          { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" },
          0.04,
        )
        .to(
          fields,
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.08, ease: "power1.out" },
          0.1,
        )
        .to(
          valueBars,
          {
            scaleX: 1,
            stagger: 0.06,
            duration: 0.1,
            ease: "power2.inOut",
          },
          0.14,
        )
        .to(
          pinDigits,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.07,
            ease: "back.out(2)",
          },
          0.38,
        )
        .to(
          orbitRingFill,
          {
            strokeDashoffset: 0,
            duration: 0.55,
            ease: "none",
          },
          0.06,
        )
        .to(
          orbitRing,
          { rotate: 6, duration: 0.25, ease: "none" },
          0.48,
        )
        .to(
          orbitCards,
          {
            opacity: 1,
            stagger: 0.07,
            duration: 0.12,
            ease: "power2.out",
          },
          0.52,
        )
        .to(
          orbitRing,
          { rotate: 0, duration: 0.15, ease: "power2.out" },
          0.72,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [beat, pinVh, prefersReducedMotion, triggersReady],
    },
  );

  return (
    <section
      ref={sectionRef}
      id={`chapter-${String(beat).padStart(2, "0")}`}
      className={styles.section}
      data-chapter={beat}
      data-profile="form-morph"
      aria-label={tag}
    >
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.index}>{String(beat).padStart(2, "0")}</span>
          <span className={styles.tag}>{tag}</span>
        </div>
        <h2 className={styles.title}>{h3}</h2>
      </header>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.orbitRing} aria-hidden>
          <svg className={styles.orbitSvg} viewBox="0 0 100 100">
            <circle className={styles.orbitRingTrack} cx="50" cy="50" r="46" />
            <circle className={styles.orbitRingFill} cx="50" cy="50" r="46" />
          </svg>
          {capabilities.map((cap, i) => (
            <div
              key={cap.label}
              className={styles.orbitSlot}
              style={
                {
                  "--orbit-angle": `${ORBIT_ANGLES[i % ORBIT_ANGLES.length]}deg`,
                } as CSSProperties
              }
            >
              <article className={styles.orbitItem}>
                <span className={styles.orbitIcon} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.orbitLabel}>{cap.label}</h3>
                <p className={styles.orbitHint}>{cap.hint}</p>
              </article>
            </div>
          ))}
        </div>

        <div className={styles.formPanel}>
          <div className={styles.alfredHub}>
            <span className={styles.alfredMark} aria-hidden>
              A
            </span>
            <div>
              <p className={styles.alfredName}>Alfréd</p>
              <p className={styles.alfredRole}>Virtuální recepční</p>
            </div>
            <span className={styles.alfredPulse} aria-hidden />
          </div>

          <div className={styles.formFields}>
            {FORM_FIELDS.map((field) => (
              <div key={field.label} className={styles.field}>
                <span className={styles.fieldLabel}>{field.label}</span>
                <div className={styles.valueTrack}>
                  <span className={styles.valueText}>{field.value}</span>
                  <span className={styles.valueBar} aria-hidden />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pinBlock}>
            <span className={styles.pinLabel}>PIN k pokoji</span>
            <div className={styles.pinRow}>
              {PIN_DIGITS.map((digit, i) => (
                <span key={i} className={styles.pinDigit}>
                  {digit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
