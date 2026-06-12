/**
 * Re-export generovaných dat z journey.yaml.
 * Po změně YAML: npm run generate:journey
 */
export {
  journeyMeta,
  JOURNEY_BEAT_COUNT,
  journeySections,
  epilogueContent,
  finaleCta,
} from "./journey.generated";

export type {
  ChapterMotion,
  EpilogueContent,
  EpiloguePanel,
  FinaleCta,
  JourneyCard,
  JourneyCta,
  JourneyFeature,
  JourneyHero,
  JourneyMeta,
  JourneySection,
  MotionProfile,
} from "./journey.types";
