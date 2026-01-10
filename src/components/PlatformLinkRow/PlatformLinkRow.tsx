import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import styles from "./PlatformLinkRow.module.css";

type PlatformLinkRowProps = {
  href: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
  className?: string;
};

export default function PlatformLinkRow({
  href,
  label,
  sublabel,
  icon,
  className,
}: PlatformLinkRowProps) {
  return (
    <a
      className={[styles.row, className].filter(Boolean).join(" ")}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className={styles.left}>
        <span className={styles.iconWrap}>{icon}</span>
        <span className={styles.labels}>
          <span className={styles.label}>{label}</span>
          {sublabel ? (
            <span className={styles.sublabel}>{sublabel}</span>
          ) : null}
        </span>
      </span>
      <ExternalLink className={styles.external} />
    </a>
  );
}
