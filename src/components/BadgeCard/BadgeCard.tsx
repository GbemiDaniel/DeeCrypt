import React, { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./BadgeCard.module.css";

export type BadgeType = "dev" | "writer";

interface BadgeCardProps {
  type: BadgeType;
  title: string;
  subtitle: string;
  date: string;
  status: "Completed" | "In Progress";
  link: string;
  image?: string;
  icon?: React.ReactNode;
}

export function BadgeCard({
  type,
  title,
  subtitle,
  date,
  status,
  link,
  image,
  icon,
}: BadgeCardProps) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isWriter = type === "writer";

  // "Click Outside" logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className={cn(
        styles.card,
        isWriter ? styles.cardWriter : styles.cardDev,
        isActive && styles.active,
      )}
      onClick={() => setIsActive(true)}
    >
      {/* 1. ICON ZONE */}
      <div className={styles.iconZone}>
        {image ? (
          <img src={image} alt={title} className={styles.badgeImage} />
        ) : (
          <div
            className={styles.badgeImage}
            style={{ display: "grid", placeItems: "center" }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* 2. CONTENT */}
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.date}>{date}</span>
          <span
            className={cn(
              styles.statusPill,
              status === "Completed"
                ? styles.statusCompleted
                : styles.statusOngoing,
            )}
          >
            {status}
          </span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* 3. LINK PORTAL */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkWrapper}
        onClick={(e) => {
          if (!isActive) e.preventDefault();
        }}
        aria-label="View Project"
      >
        <ExternalLink size={20} className={styles.linkIcon} />
      </a>
    </div>
  );
}
