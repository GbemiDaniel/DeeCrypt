import React from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Timeline.module.css";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function TimelineItem({
  item,
  index,
}: {
  item: TimelineItemProps;
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: false });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        styles.row,
        isEven ? styles.rowEven : styles.rowOdd, // Desktop switching
        isInView ? styles.visible : styles.hidden,
      )}
    >
      {/* DOT */}
      <div className={cn(styles.dot, isInView && styles.dotActive)} />

      {/* SPACER (Desktop) */}
      <div className="hidden md:block w-1/2" />

      {/* CARD */}
      <div className={cn(styles.card, isInView && styles.cardVisible)}>
        <div className={styles.header}>
          <span className={styles.yearBadge}>{item.year}</span>
          {item.icon && <div className={styles.icon}>{item.icon}</div>}
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  );
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  return (
    <div className={styles.container}>
      {/* TRUNK LINE */}
      <div className={styles.trunkLine} />

      {/* ITEMS */}
      <div>
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
