import type { MotionProfile } from "@/data/journeyData";
import styles from "./ChapterVisual.module.css";

type ChapterVisualProps = {
  profile: MotionProfile;
  theme: "dark" | "light";
};

export function ChapterVisual({ profile, theme }: ChapterVisualProps) {
  const stroke =
    theme === "light" ? "rgba(181, 0, 0, 0.22)" : "rgba(181, 0, 0, 0.35)";
  const fill =
    theme === "light" ? "rgba(181, 0, 0, 0.06)" : "rgba(181, 0, 0, 0.12)";

  return (
    <div className={styles.wrap} aria-hidden data-profile={profile}>
      <svg className={styles.svg} viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        {profile === "constellation" && (
          <>
            <circle cx="80" cy="140" r="5" fill={fill} stroke={stroke} />
            <circle cx="160" cy="90" r="5" fill={fill} stroke={stroke} />
            <circle cx="240" cy="160" r="5" fill={fill} stroke={stroke} />
            <circle cx="320" cy="110" r="7" fill={fill} stroke={stroke} />
            <path
              d="M80 140 L160 90 L240 160 L320 110"
              stroke={stroke}
              strokeWidth="1.5"
              fill="none"
            />
          </>
        )}
        {profile === "rate-field" && (
          <>
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 7 }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={40 + col * 48}
                  y={40 + row * 40}
                  width="36"
                  height="28"
                  rx="4"
                  fill={(row + col) % 3 === 0 ? fill : "transparent"}
                  stroke={stroke}
                  strokeWidth="1"
                />
              )),
            )}
          </>
        )}
        {profile === "itinerary-stream" && (
          <>
            <rect x="130" y="30" width="140" height="220" rx="20" fill="none" stroke={stroke} strokeWidth="2" />
            <rect x="148" y="60" width="90" height="14" rx="7" fill={fill} />
            <rect x="148" y="88" width="72" height="10" rx="5" fill={fill} opacity="0.7" />
            <rect x="148" y="118" width="100" height="14" rx="7" fill={fill} />
            <rect x="148" y="146" width="64" height="10" rx="5" fill={fill} opacity="0.7" />
            <rect x="148" y="176" width="88" height="14" rx="7" fill={fill} />
          </>
        )}
        {profile === "threshold" && (
          <>
            <rect x="100" y="40" width="200" height="200" fill="none" stroke={stroke} strokeWidth="2" />
            <path d="M100 40 L200 140 L300 40" fill={fill} stroke={stroke} strokeWidth="1.5" />
            <circle cx="200" cy="150" r="24" fill={fill} stroke={stroke} strokeWidth="2" />
          </>
        )}
        {profile === "quiet-light" && (
          <>
            <path
              d="M40 200 Q200 40 360 200"
              fill="none"
              stroke={stroke}
              strokeWidth="2"
            />
            <circle cx="200" cy="118" r="40" fill={fill} stroke={stroke} strokeWidth="1.5" />
          </>
        )}
        {profile === "swipe-complete" && (
          <>
            <rect x="50" y="100" width="90" height="80" rx="10" fill={fill} stroke={stroke} />
            <rect x="155" y="100" width="90" height="80" rx="10" fill={fill} stroke={stroke} />
            <rect x="260" y="100" width="90" height="80" rx="10" fill={fill} stroke={stroke} />
            <path d="M145 140 H155 M250 140 H260" stroke={stroke} strokeWidth="2" />
          </>
        )}
        {profile === "ripple" && (
          <>
            <circle cx="200" cy="140" r="30" fill="none" stroke={stroke} strokeWidth="1.5" />
            <circle cx="200" cy="140" r="55" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.7" />
            <circle cx="200" cy="140" r="80" fill="none" stroke={stroke} strokeWidth="1" opacity="0.45" />
            <circle cx="200" cy="140" r="8" fill={fill} stroke={stroke} />
          </>
        )}
        {!["constellation", "rate-field", "itinerary-stream", "threshold", "quiet-light", "swipe-complete", "ripple"].includes(profile) && (
          <path
            d="M40 200 C120 80 280 80 360 200"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeDasharray="6 8"
          />
        )}
      </svg>
    </div>
  );
}
