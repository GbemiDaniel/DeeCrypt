import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CircularProgress } from "./CircularProgress";
import { ExternalLink } from "lucide-react";
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

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0.05, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      mass: 2.5,
      stiffness: 60,
      damping: 20,
    },
  },
};

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

  // 1. Ref to track the card element
  const cardRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Track hover for desktop
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 2. Click Outside Logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the card exists and the click target is NOT inside the card...
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        // ...close the active item.
        setActiveIndex(null);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <article
      ref={cardRef} // 3. Attach ref here
      className={cn(styles.card, className)}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {Icon && (
            <div className={styles.iconWrap}>
              <Icon size={20} className={styles.icon} />
            </div>
          )}
          <div className={styles.titleWrap}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        {topRight && <div className={styles.topRight}>{topRight}</div>}
      </div>

      {/* Projects list */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={cn(
          styles.projectList,
          scrollMobile && styles.scrollMobile,
          scrollDesktop && styles.scrollDesktop,
        )}
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              variants={itemVariants}
              key={index}
              className={cn(
                styles.projectItem,
                isActive && styles.projectItemActive,
              )}
              onClick={() => handleItemClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
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
                  size={42}
                  strokeWidth={4}
                  animateToValue={isActive || isHovered}
                />

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      styles.externalLinkWrapper,
                      isActive && styles.iconActive,
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </article>
  );
}
