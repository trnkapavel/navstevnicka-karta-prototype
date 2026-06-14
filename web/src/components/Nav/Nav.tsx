import { JOURNEY_BEAT_COUNT } from "@/data/journeyData";
import styles from "./Nav.module.css";

type NavProps = {
  activeBeat?: number;
};

export function Nav({ activeBeat = 1 }: NavProps) {
  const progress = (activeBeat / JOURNEY_BEAT_COUNT) * 100;

  return (
    <header className={styles.nav}>
      <span className={styles.logo}>Previo</span>
      <div className={styles.dots} aria-label="Průběh kapitol">
        {Array.from({ length: JOURNEY_BEAT_COUNT }, (_, i) => {
          const n = i + 1;
          return (
            <span
              key={n}
              className={styles.dot}
              data-active={n === activeBeat || undefined}
              aria-current={n === activeBeat ? "step" : undefined}
            />
          );
        })}
      </div>
      <span className={styles.counter}>
        {String(activeBeat).padStart(2, "0")} /{" "}
        {String(JOURNEY_BEAT_COUNT).padStart(2, "0")}
      </span>
      <div
        className={styles.progress}
        style={{ width: `${progress}%` }}
        aria-hidden
      />
    </header>
  );
}
