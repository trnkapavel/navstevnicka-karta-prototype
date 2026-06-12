"use client";

import { motion, useReducedMotion } from "motion/react";
import type { JourneySection } from "@/data/journeyData";
import { getItemIndexVariant } from "@/lib/chapterTheme";
import {
  fadeUp,
  indexReveal,
  revealTransition,
  revealViewportRepeat,
  scaleIn,
} from "@/lib/motion/scrollReveal";
import styles from "./ChapterContent.module.css";

type ChapterContentProps = {
  section: JourneySection;
};

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function formatIndex(n: number) {
  return String(n).padStart(2, "0");
}

type ItemIndexProps = {
  n: number;
  variant: ReturnType<typeof getItemIndexVariant>;
  className: string;
  reduced: boolean;
  delay: number;
};

function ItemIndex({ n, variant, className, reduced, delay }: ItemIndexProps) {
  if (variant === "none") return null;

  if (variant === "prominent") {
    return (
      <motion.span
        className={className}
        aria-hidden
        variants={indexReveal}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewportRepeat}
        transition={revealTransition(reduced, delay)}
      >
        {formatIndex(n)}
      </motion.span>
    );
  }

  return (
    <span className={className} aria-hidden>
      {formatIndex(n)}
    </span>
  );
}

export function ChapterContent({ section }: ChapterContentProps) {
  const reduced = useReducedMotion() ?? false;
  const { layout, features, cards, screenshotCta, motion: chapterMotion } =
    section;
  const indexVariant = getItemIndexVariant(chapterMotion.profile);
  const isScreenFirst =
    layout === "screen-text" || layout === "cards-3" || layout === "cards-4";

  const textBlock =
    features && features.length > 0 ? (
      <ul
        className={styles.featureList}
        data-index-variant={indexVariant}
      >
        {features.map((feature, i) => (
          <motion.li
            key={i}
            className={styles.featureItem}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewportRepeat}
            transition={revealTransition(reduced, i * 0.04)}
          >
            <ItemIndex
              n={i + 1}
              variant={indexVariant}
              className={styles.featureIndex}
              reduced={reduced}
              delay={i * 0.06}
            />
            <div className={styles.featureBody}>
              {feature.text && (
                <p className={styles.body}>
                  <RichText html={feature.text} />
                </p>
              )}
              {feature.cta && (
                <a className={styles.linkCta} href={feature.cta.href}>
                  <span>{feature.cta.label}</span>
                  <span className={styles.linkArrow} aria-hidden>
                    →
                  </span>
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    ) : null;

  const cardsBlock =
    cards && cards.length > 0 ? (
      <div
        className={styles.cardGrid}
        data-count={cards.length > 3 ? "4" : "3"}
        data-index-variant={indexVariant}
      >
        {cards.map((card, i) => (
          <motion.article
            key={i}
            className={styles.card}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewportRepeat}
            transition={revealTransition(reduced, i * 0.05)}
          >
            <ItemIndex
              n={i + 1}
              variant={indexVariant}
              className={styles.cardIndex}
              reduced={reduced}
              delay={i * 0.07}
            />
            <p className={styles.body}>
              <RichText html={card.text} />
            </p>
            {card.cta && (
              <a className={styles.linkCta} href={card.cta.href}>
                <span>{card.cta.label}</span>
                <span className={styles.linkArrow} aria-hidden>
                  →
                </span>
              </a>
            )}
          </motion.article>
        ))}
      </div>
    ) : null;

  const isCardLayout = layout === "cards-3" || layout === "cards-4";
  const copyBlock = textBlock ?? cardsBlock;
  const showScreenshot =
    !isCardLayout &&
    (layout === "text-screen" || layout === "screen-text" || !!screenshotCta);

  const screenshot = showScreenshot ? (
    <motion.div
      className={styles.screenshot}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewportRepeat}
      transition={revealTransition(reduced, 0.15)}
    >
      <div className={styles.screenshotGlow} aria-hidden />
      <div className={styles.screenshotFrame}>
        <span className={styles.screenshotLabel}>Previo screenshot</span>
      </div>
      {screenshotCta && (
        <a className={styles.screenshotCta} href={screenshotCta.href}>
          <span>{screenshotCta.label}</span>
          <span className={styles.linkArrow} aria-hidden>
            →
          </span>
        </a>
      )}
    </motion.div>
  ) : null;

  if (!copyBlock && !screenshot) return null;

  if (isCardLayout) {
    return (
      <div className={styles.layoutFull} data-index-variant={indexVariant}>
        {cardsBlock}
      </div>
    );
  }

  return (
    <div
      className={styles.layout}
      data-layout={layout}
      data-screen-first={isScreenFirst || undefined}
      data-index-variant={indexVariant}
    >
      {isScreenFirst ? (
        <>
          {screenshot}
          {copyBlock}
        </>
      ) : (
        <>
          {copyBlock}
          {screenshot}
        </>
      )}
    </div>
  );
}
