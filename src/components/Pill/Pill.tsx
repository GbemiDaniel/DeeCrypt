import styles from "./Pill.module.css";

type Tone = "default" | "accent" | "success";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

export default function Pill({ children, tone = "default", className }: Props) {
  const toneClass =
    tone === "accent"
      ? styles.accent
      : tone === "success"
      ? styles.success
      : styles.default;

  return (
    <span
      className={[styles.pill, toneClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
}
