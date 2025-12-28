import styles from "./ModeToggle.module.css";
import { MODES, type Mode } from "../../app/modes";

type ModeToggleProps = {
  mode: Mode;
  onChange: (m: Mode) => void;
};

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className={styles.wrap} role="group" aria-label="Mode toggle">
      <button
        type="button"
        className={`${styles.btn} ${mode === MODES.DEV ? styles.active : ""}`}
        onClick={() => onChange(MODES.DEV)}
        aria-pressed={mode === MODES.DEV}
      >
        Builder
      </button>

      <button
        type="button"
        className={`${styles.btn} ${
          mode === MODES.WRITER ? styles.active : ""
        }`}
        onClick={() => onChange(MODES.WRITER)}
        aria-pressed={mode === MODES.WRITER}
      >
        Writer
      </button>
    </div>
  );
}
