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
          <TextReveal variant={mode} split="words">
            {headlineTop}
          </TextReveal>
        </span>

        {/*
          FIX: The gradient effect requires the text not to be split into multiple
          elements. We pass the style class directly to TextReveal and disable
          the word-splitting animation only for the 'dev' mode.
        */}
        <TextReveal
          className={styles.bottom}
          variant={mode}
          split={mode === "dev" ? "none" : "words"}
          delay={0.2}
        >
          {headlineBottom}
        </TextReveal>
      </h1>

      <div className={styles.bottomRow}>
        <div className={styles.subcopy}>
          {subcopy && (
            <TextReveal variant={mode} split="words" delay={0.5}>
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