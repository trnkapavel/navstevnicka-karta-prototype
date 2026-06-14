export type MotionProfile =
  | "constellation"
  | "rate-field"
  | "itinerary-stream"
  | "form-morph"
  | "threshold"
  | "quiet-light"
  | "swipe-complete"
  | "ripple"
  | "finale"
  | `chapter-${number}`;

export type ChapterMotion = {
  profile: MotionProfile;
  pinVh: number;
};

export type JourneyCta = {
  label: string;
  href: string;
  variant?: string;
};

export type JourneyFeature = {
  text: string | null;
  cta: JourneyCta | null;
};

export type JourneyCard = {
  text: string;
  cta: JourneyCta | null;
};

export type JourneySection = {
  id: string;
  index: number;
  tag: string;
  h3: string;
  layout: string;
  motion: ChapterMotion;
  features: JourneyFeature[] | null;
  cards: JourneyCard[] | null;
  screenshotCta: JourneyCta | null;
};

export type JourneyHero = {
  h1Line1: string;
  h1Line2Prefix: string;
  h1Emphasis: string;
  h1Line3: string;
  subtitle: string;
};

export type JourneyMeta = {
  title: string;
  eyebrow: string;
  chapterIntro: string;
  hero: JourneyHero;
};

export type FinaleCta = {
  h2Line1: string;
  h2Em: string;
  h2Line2: string;
  buttonLabel: string;
  buttonHref: string;
  motion: ChapterMotion;
};

export type EpiloguePanel = {
  id: string;
  h3: string;
  body: string;
  screenshotCta: JourneyCta | null;
};

export type EpilogueContent = {
  bridge: {
    h3: string;
    body: string;
  };
  panels: EpiloguePanel[];
};
