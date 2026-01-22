import type { LucideIcon } from "lucide-react";
import styles from "./ModuleCard.module.css";

type ModuleCardProps = {
  title: string;
  subtitle?: string;
  topRight?: React.ReactNode;
  icon?: LucideIcon;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export default function ModuleCard({
  title,
  subtitle,
  topRight,
  icon: Icon,
  footer,
  children,
}: ModuleCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <div className={styles.left}>
          {Icon && (
            <div className={styles.iconWrap}>
              <Icon size={22} className={styles.icon} />
            </div>
          )}
          <div>
            <h3 className={styles.title}>{title}</h3>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>
        </div>

        {topRight ? <div className={styles.topRight}>{topRight}</div> : null}
      </div>

      {children ? <div className={styles.body}>{children}</div> : null}

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  );
}
