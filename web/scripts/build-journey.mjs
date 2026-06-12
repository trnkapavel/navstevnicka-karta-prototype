/**
 * Generuje src/data/journey.generated.ts z content/journey.yaml.
 * Spouští se před dev/build (npm run generate:journey).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const yamlPath = join(root, "..", "content", "journey.yaml");
const outPath = join(root, "src", "data", "journey.generated.ts");

const raw = readFileSync(yamlPath, "utf8");
const doc = parse(raw);

const meta = doc.meta ?? {};
const finale = doc.final_cta ?? {};
const epilogue = doc.epilogue ?? null;
const sections = doc.sections ?? [];

function emphasisFromMeta(m) {
  const em = String(m.hero_h1_em ?? "od A do Z").trim();
  return em.endsWith(",") ? em : `${em},`;
}

function buildHero(m) {
  return {
    h1Line1: m.hero_h1_line1 ?? "",
    h1Line2Prefix: "Vašeho hosta",
    h1Emphasis: emphasisFromMeta(m),
    h1Line3: m.hero_h1_line3 ?? "",
    subtitle: m.hero_subtitle ?? "",
  };
}

function normalizeMotion(motion, fallbackProfile) {
  return {
    profile: motion?.profile ?? fallbackProfile,
    pinVh: motion?.pin_vh ?? 150,
  };
}

const journeyMeta = {
  title: meta.title ?? "Customer Journey — Previo",
  eyebrow: meta.eyebrow ?? "Customer Journey · Previo",
  chapterIntro: meta.chapter_intro ?? meta.hero_subtitle ?? "",
  hero: buildHero(meta),
};

const journeySections = sections.map((section) => ({
  id: section.id,
  index: section.index,
  tag: section.tag,
  h3: section.h3,
  layout: section.layout,
  motion: normalizeMotion(section.motion, `chapter-${section.index}`),
  features: section.features ?? null,
  cards: section.cards ?? null,
  screenshotCta: section.screenshot_cta ?? null,
}));

const finaleCta = {
  h2Line1: finale.h2_line1 ?? "",
  h2Em: finale.h2_em ?? "",
  h2Line2: finale.h2_line2 ?? "",
  buttonLabel: finale.button_label ?? "",
  buttonHref: finale.button_href ?? "#",
  motion: normalizeMotion(finale.motion, "finale"),
};

const epilogueContent = epilogue
  ? {
      bridge: {
        h3: epilogue.bridge?.h3 ?? "",
        body: epilogue.bridge?.body ?? "",
      },
      panels: (epilogue.panels ?? []).map((panel) => ({
        id: panel.id,
        h3: panel.h3,
        body: panel.body,
        screenshotCta: panel.screenshot_cta ?? null,
      })),
    }
  : null;

const output = `/* eslint-disable */
/**
 * AUTO-GENERATED — neupravuj ručně.
 * Zdroj: content/journey.yaml
 * Regenerace: npm run generate:journey
 */
import type { EpilogueContent, JourneySection, FinaleCta, JourneyMeta } from "./journey.types";

export const journeyMeta: JourneyMeta = ${JSON.stringify(journeyMeta, null, 2)} as const;

export const JOURNEY_BEAT_COUNT = ${journeySections.length} as const;

export const journeySections: JourneySection[] = ${JSON.stringify(journeySections, null, 2)};

export const finaleCta: FinaleCta = ${JSON.stringify(finaleCta, null, 2)} as const;

export const epilogueContent: EpilogueContent | null = ${JSON.stringify(epilogueContent, null, 2)};
`;

writeFileSync(outPath, output, "utf8");
console.log(`✓ journey.generated.ts (${journeySections.length} kapitol)`);
