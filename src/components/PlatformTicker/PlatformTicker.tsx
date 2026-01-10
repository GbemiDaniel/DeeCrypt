import type { ReactNode } from "react";
import PlatformLinkRow from "../PlatformLinkRow/PlatformLinkRow";
import styles from "./PlatformTicker.module.css";

export type PlatformTickerItem = {
  href: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
};

type PlatformTickerProps = {
  items: PlatformTickerItem[];
};

export default function PlatformTicker({ items }: PlatformTickerProps) {
  if (items.length === 0) return null;

  return (
    <div className={styles.ticker} aria-label="Platform links">
      <div className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.group}>
            {items.map((item) => (
              <PlatformLinkRow
                key={item.href}
                href={item.href}
                label={item.label}
                sublabel={item.sublabel}
                icon={item.icon}
                className={styles.row}
              />
            ))}
          </div>
          <div className={styles.group} aria-hidden="true">
            {items.map((item) => (
              <PlatformLinkRow
                key={`${item.href}-clone`}
                href={item.href}
                label={item.label}
                sublabel={item.sublabel}
                icon={item.icon}
                className={styles.row}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
