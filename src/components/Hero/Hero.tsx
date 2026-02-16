import styles from "./Hero.module.css";
import Pill from "../Pill/Pill";
import type { ReactNode } from "react";
import TextReveal from "../motion/TextReveal";

type HeroProps = {
  availabilityLabel?: ReactNode;
  headlineTop: ReactNode;
  headlineBottom: ReactNode;
  subcopy?: ReactNode;
  mode: "dev" | "writer";
  modeToggleSlot?: ReactNode;
};

export default function Hero({
  availabilityLabel = "AVAILABLE FOR HIRE",
  headlineTop,
  headlineBottom,
  subcopy,
  mode,
  modeToggleSlot,
}: HeroProps) {
  return (
    <section className={styles.hero} data-mode={mode}>
      <div className={styles.availability}>
        <Pill tone="accent">{availabilityLabel}</Pill>
      </div>

      <h1 className={styles.headline}>
        <span className={styles.top}>
          {/* LINE 1: FALLS FROM TOP */}
          <TextReveal 
            variant={mode} 
            split="words" 
            direction="top"  // <--- NEW
            delay={0.1}      // Starts almost immediately
          >
            {headlineTop}
          </TextReveal>
        </span>

        {/* LINE 2: RISES FROM BOTTOM */}
        <TextReveal
          className={styles.bottom}
          variant={mode}
          split={mode === "dev" ? "none" : "words"}
          direction="bottom" // <--- NEW
          delay={0.3}        // Slight delay for impact
        >
          {headlineBottom}
        </TextReveal>
      </h1>

      <div className={styles.bottomRow}>
        <div className={styles.subcopy}>
          {subcopy && (
            // LINE 3: RISES FROM BOTTOM (Anchors the layout)
            <TextReveal 
              variant={mode} 
              split="words" 
              direction="bottom" 
              delay={0.5} 
            >
              {subcopy}
            </TextReveal>
          )}
        </div>
        {modeToggleSlot ? (
          <div className={styles.modeSlot}>{modeToggleSlot}</div>
        ) : null}
      </div>
    </section>
  );
}