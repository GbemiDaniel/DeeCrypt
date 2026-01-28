import type { LucideIcon } from "lucide-react";
import styles from "./ModuleCard.module.css";
import type { ReactNode } from "react";

interface ModuleCardProps {
  title: string;
  subtitle?: string; // This is our narrative intro
  topRight?: ReactNode;
  icon?: LucideIcon;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string; // Allow passing external styles
}

export default function ModuleCard({
  title,
  subtitle,
  topRight,
  icon: Icon,
  footer,
  children,
  className,
}: ModuleCardProps) {
  return (
    <article className={`${styles.card} ${className || ""}`}>
      <div className={styles.head}>
        <div className={styles.left}>
          {Icon && (
            <div className={styles.iconWrap}>
              <Icon size={20} className={styles.icon} />
            </div>
          )}
          <div className={styles.titleBlock}>
            <h3 className={styles.title}>{title}</h3>
            {/* The Narrative Microcopy */}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        {topRight && <div className={styles.topRight}>{topRight}</div>}
      </div>

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
