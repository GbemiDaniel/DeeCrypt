import styles from "./MiniIcon.module.css";

type MiniIconProps = {
  variant?: "accent" | "accent2" | "neutral";
};

export default function MiniIcon({ variant = "neutral" }: MiniIconProps) {
  return (
    <span className={`${styles.dot} ${styles[variant]}`} aria-hidden="true" />
  );
}
