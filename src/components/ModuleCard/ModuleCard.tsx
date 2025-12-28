import styles from "./ModuleCard.module.css";

type ModuleCardProps = {
  title: string;
  subtitle?: string;
  topRight?: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export default function ModuleCard({
  title,
  subtitle,
  topRight,
  icon,
  footer,
  children,
}: ModuleCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <div className={styles.left}>
          {icon ? <div className={styles.iconWrap}>{icon}</div> : null}
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
