import React from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Timeline.module.css";
import { cn } from "@/lib/utils";

export type TimelineType = "dev" | "writer" | "business";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  type: TimelineType;
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

  // Logic: Odd = Right, Even = Left
  const isRight = index % 2 !== 0;
  const isLeft = !isRight;

  const themeClass =
    item.type === "writer"
      ? styles.themeWriter
      : item.type === "business"
        ? styles.themeBiz
        : styles.themeDev;

  return (
    <div
      ref={ref}
      className={cn(
        styles.row,
        isRight ? styles.rowRight : styles.rowLeft,
        themeClass,
        isInView ? styles.visible : styles.hidden,
      )}
    >
      {/* DOM ORDER: [Node] -> [Connector] -> [Card]
        
        - Desktop Left: CSS `row-reverse` flips this to [Card]<-[Conn]<-[Node]
        - Desktop Right: Renders as is [Node]->[Conn]->[Card]
        - Mobile: CSS Grid places them in specific columns (Zig-Zag)
      */}

      <div className={styles.node} />

      <div className={styles.connector} />

      <div className={styles.card}>
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
      {/* Desktop Spine (Straight Line) */}
      <div className={styles.desktopSpine} />

      {items.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
