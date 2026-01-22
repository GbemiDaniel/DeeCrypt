import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircularProgress } from "./CircularProgress";
import { ExternalLink, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./SideQuestCard.module.css";

export interface SideProject {
  name: string;
  description: string;
  progress: number;
  url?: string;
}

interface SideQuestCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  projects: SideProject[];
  topRight?: React.ReactNode;
  className?: string;
}

export function SideQuestCard({
  title,
  subtitle,
  icon: Icon,
  projects,
  topRight,
  className,
}: SideQuestCardProps) {
  const scrollMobile = projects.length > 3;
  const scrollDesktop = projects.length > 2;

  // Track which item is active
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <article className={cn(styles.card, className)}>
      {/* Header (Unchanged) */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {Icon && (
            <div className={styles.iconWrap}>
              <Icon size={22} className={styles.icon} />
            </div>
          )}
          <div className={styles.titleWrap}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        {topRight && <div className={styles.topRight}>{topRight}</div>}
      </div>
      <span className={styles.border}></span>

      {/* Projects list */}
      <div
        className={cn(
          styles.projectList,
          scrollMobile && styles.scrollMobile,
          scrollDesktop && styles.scrollDesktop,
        )}
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            // Changed from NavLink to div to separate interactions
            <div
              key={index}
              className={cn(
                styles.projectItem,
                isActive && styles.projectItemActive,
              )}
              onClick={() => handleItemClick(index)}
            >
              <div className={styles.projectInfo}>
                <h4 className={styles.projectName}>{project.name}</h4>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
              </div>

              <div className={styles.projectItemRight}>
                <CircularProgress
                  value={project.progress}
                  size={48}
                  strokeWidth={4}
                />

                {/* The Link Icon: Only interactive when active */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      styles.externalLinkWrapper,
                      isActive && styles.iconActive,
                    )}
                    onClick={(e) => e.stopPropagation()} // Stop bubbling so it doesn't close the card
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
