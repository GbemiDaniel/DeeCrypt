import styles from "./Hero.module.css";
import Pill from "../Pill/Pill";
import type { ReactNode } from "react";

// import TextReveal from "../motion/TextReveal";
import TextReveal from "../motion/TextReveal";
type HeroProps = {
  availabilityLabel?: React.ReactNode;
  headlineTop: React.ReactNode;
  headlineBottom: React.ReactNode;
  subcopy?: React.ReactNode;
  mode: "dev" | "writer";
  modeToggleSlot?: React.ReactNode;
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
    <section className={styles.hero}>
      <div className={styles.availability}>
        <Pill tone="accent">{availabilityLabel}</Pill>
      </div>

      <h1 className={styles.headline}>
        <span className={styles.top}>
          <TextReveal variant="dev" split="words">
            {headlineTop}
          </TextReveal>
        </span>
        <span className={`${styles.bottom} ${".text-metal"}`}>
          <TextReveal variant="dev" split="words" delay={0.59}>
            {headlineBottom}
          </TextReveal>
        </span>
      </h1>

      <div className={styles.bottomRow}>
        <p className={styles.subcopy}>
          <TextReveal variant="dev" split="words" delay={0.99}>
            {subcopy}
          </TextReveal>
        </p>
        {modeToggleSlot ? (
          <div className={styles.modeSlot}>{modeToggleSlot}</div>
        ) : null}
      </div>
    </section>
  );
}
