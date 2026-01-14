import { useState } from "react";
import styles from "./PreviewCard.module.css";
import IconButton from "../IconButton/IconButton";

type PreviewCardProps = {
  title: string;
  subtitle: string;
  imageSrc?: string; // hover preview image
  onOpen: () => void; // open dialog
  icon?: React.ReactNode;
  topRight?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function PreviewCard({
  title,
  subtitle,
  imageSrc,
  onOpen,
  icon,
  topRight,
  footer,
}: PreviewCardProps) {
  const [active, setActive] = useState(false);

  return (
    <article
      className={`${styles.card} ${active ? styles.active : ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
    >
      {imageSrc ? (
        <div className={styles.previewLayer} aria-hidden="true">
          <img className={styles.previewMedia} src={imageSrc} alt="" />
          <div className={styles.previewTint} />
        </div>
      ) : null}

      <div className={styles.head}>
        <div className={styles.left}>
          {topRight ? <div className={styles.iconWrap}>{topRight}</div> : null}
          <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.topRight}>
            <IconButton label="Preview" onClick={onOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  );
}
