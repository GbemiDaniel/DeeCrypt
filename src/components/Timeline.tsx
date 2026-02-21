"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import styles from "./Timeline.module.css";
import { cn } from "@/lib/utils";

export type TimelineType = "dev" | "writer" | "business" | "test";

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
  isActive,
  onActivate,
  onDeactivate,
}: {
  item: TimelineItemProps;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const { ref: customInViewRef, isInView } = useInView({ threshold: 0.2, triggerOnce: false });

  // Safely merge our fade-in hook with Framer Motion's ref
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof customInViewRef === "function") {
        customInViewRef(node);
      } else if (customInViewRef) {
        (customInViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [customInViewRef]
  );

  const isRight = index % 2 !== 0;
  const isLeft = !isRight;

  const themeClass =
    item.type === "writer"
      ? styles.themeWriter
      : (item.type === "business" || item.type === "test")
      ? styles.themeBiz
      : styles.themeDev;

  return (
    <motion.div
      ref={setRefs}
      className={cn(
        styles.row,
        isRight ? styles.rowRight : styles.rowLeft,
        themeClass,
        isInView ? styles.visible : styles.hidden,
        isActive && styles.active // CSS styling is now completely synced with parent state
      )}
      onViewportEnter={onActivate}
      onViewportLeave={onDeactivate}
      // Extremely tight trigger window so they don't overlap easily
      viewport={{ margin: "-45% 0px -45% 0px" }} 
    >
      <div className={styles.node} />
      <div className={styles.connector} />
      
      {/* The card's scale is now directly controlled by the parent's `isActive` state 
        using the `animate` prop, guaranteeing only one card pops forward at a time.
      */}
      <motion.div 
        className={styles.card}
        animate={{ 
          scale: isActive ? 1.02 : 1, 
          zIndex: isActive ? 20 : 1 
        }}
        whileHover={{ scale: 1.02, zIndex: 20 }} // Keep desktop hover feel
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div className={styles.header}>
          <span className={styles.yearBadge}>{item.year}</span>
          {item.icon && <div className={styles.icon}>{item.icon}</div>}
        </div>

        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </motion.div>
    </motion.div>
  );
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  // SINGLE SOURCE OF TRUTH: Only one index can be active at any given time.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.desktopSpine} />

      {items.map((item, index) => (
        <TimelineItem 
          key={index} 
          item={item} 
          index={index}
          isActive={activeIndex === index}
          onActivate={() => setActiveIndex(index)}
          // Only clear it if the one leaving is the currently active one
          onDeactivate={() => setActiveIndex((prev) => (prev === index ? null : prev))}
        />
      ))}
    </div>
  );
}