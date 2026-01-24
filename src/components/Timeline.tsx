import React from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Timeline.module.css";
import { cn } from "@/lib/utils";

// Define the allowed types
export type TimelineType = "dev" | "writer" | "business";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  type: TimelineType; // <--- The visual driver
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

  // Map type to Card Class
  const cardVariantClass =
    item.type === "writer"
      ? styles.cardWriter
      : item.type === "business"
        ? styles.cardBusiness
        : styles.cardDev; // default to dev

  // Map type to Dot Class
  const dotVariantClass =
    item.type === "writer"
      ? styles.dotWriter
      : item.type === "business"
        ? styles.dotBusiness
        : styles.dotDev;

  return (
    <div
      ref={ref}
      className={cn(
        styles.row,
        isEven ? styles.rowEven : styles.rowOdd,
        isInView ? styles.visible : styles.hidden,
      )}
    >
      {/* DOT: Uses variant class for color */}
      <div
        className={cn(
          styles.dot,
          dotVariantClass,
          isInView && styles.dotActive,
        )}
      />

      {/* SPACER (Desktop) */}
      <div className="hidden md:block w-1/2" />

      {/* CARD: Uses variant class for style */}
      <div
        className={cn(
          styles.card,
          cardVariantClass,
          isInView && styles.cardVisible,
        )}
      >
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
      <div className={styles.trunkLine} />
      <div>
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
