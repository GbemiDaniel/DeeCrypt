import { cn } from "@/lib/utils";
import { CircularProgress } from "./CircularProgress";
import { ExternalLink, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./SideQuestCard.module.css";
import { NavLink } from "../NavLink";

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

  return (
    <article className={cn(styles.card, className)}>
      {/* Header */}
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
        {projects.map((project, index) => (
          <NavLink
            key={index}
            href={project.url}
            className={styles.projectItem}
          >
            <div className={styles.projectInfo}>
              <h4 className={styles.projectName}>{project.name}</h4>
              <p className={styles.projectDescription}>{project.description}</p>
            </div>
            <div className={styles.projectItemRight}>
              <CircularProgress
                value={project.progress}
                size={48}
                strokeWidth={4}
              />
              {/* The external icon is only shown if there is a URL */}
              {project.url && (
                <ExternalLink size={16} className={styles.externalIcon} />
              )}
            </div>
          </NavLink>
        ))}
      </div>
    </article>
  );
}
