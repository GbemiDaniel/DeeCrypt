import styles from "./Hero.module.css";
import Pill from "../Pill/Pill";

type HeroProps = {
  availabilityLabel?: string;
  headlineTop: string; // e.g. "Architecting the"
  headlineBottom: string; // e.g. "On-Chain Narrative"
  subcopy: string;
  modeToggleSlot?: React.ReactNode;
};

export default function Hero({
  availabilityLabel = "AVAILABLE FOR HIRE",
  headlineTop,
  headlineBottom,
  subcopy,
  modeToggleSlot,
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.availability}>
        <Pill tone="accent">{availabilityLabel}</Pill>
      </div>

      <h1 className={styles.headline}>
        <span className={styles.top}>{headlineTop}</span>
        <span className={styles.bottom}>{headlineBottom}</span>
      </h1>

      <div className={styles.bottomRow}>
        <p className={styles.subcopy}>{subcopy}</p>
        {modeToggleSlot ? (
          <div className={styles.modeSlot}>{modeToggleSlot}</div>
        ) : null}
      </div>
    </section>
  );
}
