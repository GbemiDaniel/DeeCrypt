import React from "react";
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
  image?: string; // Path to image (e.g., "/badges/google.png")
  icon?: React.ReactNode; // Fallback icon if no image
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
  const isWriter = type === "writer";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(styles.card, isWriter ? styles.cardWriter : styles.cardDev)}
    >
      {/* 1. GLORIFIED BADGE ZONE */}
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

      {/* 3. HOVER LINK INDICATOR */}
      <ExternalLink size={18} className={styles.linkIcon} />
    </a>
  );
}
