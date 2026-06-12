import type { JourneySection } from "@/data/journeyData";
import { ChapterShell } from "./ChapterShell";
import { Ch04FormMorph } from "./chapters/Ch04FormMorph";

type ChapterRendererProps = {
  section: JourneySection;
};

export function ChapterRenderer({ section }: ChapterRendererProps) {
  switch (section.motion.profile) {
    case "form-morph":
      return <Ch04FormMorph section={section} />;
    default:
      return <ChapterShell section={section} />;
  }
}
