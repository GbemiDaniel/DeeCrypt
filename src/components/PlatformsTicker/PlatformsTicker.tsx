import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import PlatformLinkRow from "../PlatformLinkRow/PlatformLinkRow";
import styles from "./PlatformsTicker.module.css";

export type PlatformsTickerItem = {
  href: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
};

type PlatformsTickerProps = {
  items: PlatformsTickerItem[];
  intervalMs?: number;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return reduced;
}

export default function PlatformsTicker({
  items,
  intervalMs = 2800,
}: PlatformsTickerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resetting, setResetting] = useState(false);

  const loopItems = useMemo(() => {
    if (items.length === 0) return [];
    return [...items, items[0]];
  }, [items]);

  useEffect(() => {
    if (prefersReducedMotion || paused || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => prev + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused, items.length, intervalMs]);

  if (items.length === 0) return null;

  return (
    <div
      className={styles.ticker}
      aria-label="Platform links"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className={styles.viewport}>
        <div
          className={[
            styles.track,
            resetting ? styles.noTransition : "",
          ].join(" ")}
          style={{
            transform: `translateY(-${index * 100}%)`,
          }}
          onTransitionEnd={() => {
            if (index !== items.length) return;
            setResetting(true);
            setIndex(0);
            requestAnimationFrame(() => setResetting(false));
          }}
        >
          {loopItems.map((item, i) => (
            <PlatformLinkRow
              key={`${item.href}-${i}`}
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
  );
}
