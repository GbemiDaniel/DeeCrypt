import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CircularProgress } from "./CircularProgress";
import { ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./ConceptLabsCard.module.css";
import type { ConceptProject } from "../../data/conceptlabs";

// THE FIX: Restored relative static import so Vite compiles it instantly
import PreviewDialog from "../PreviewDialog/PreviewDialog";

interface ConceptLabsCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  projects: ConceptProject[];
  topRight?: React.ReactNode;
  className?: string;
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0.05, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 2.5, stiffness: 60, damping: 20 },
  },
};

export function ConceptLabsCard({
  title,
  subtitle,
  icon: Icon,
  projects = [],
  topRight,
  className,
}: ConceptLabsCardProps) {
  const scrollMobile = projects.length > 3;
  const scrollDesktop = projects.length > 2;

  const cardRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [selectedProject, setSelectedProject] = useState<ConceptProject | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActiveIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!Array.isArray(projects)) return null;

  return (
    <article ref={cardRef} className={cn(styles.card, className)}>
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
              className={cn(styles.projectItem, isActive && styles.projectItemActive)}
              onClick={() => handleItemClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.projectInfo}>
                <h4 className={styles.projectName}>{project?.name}</h4>
                <p className={styles.projectDescription}>{project?.description}</p>
              </div>

              <div className={styles.projectItemRight}>
                <CircularProgress
                  value={project?.progress || 0}
                  size={42}
                  strokeWidth={4}
                  animateToValue={isActive || isHovered}
                />

                {project?.modalDetails && (
                  <button
                    type="button"
                    className={cn(styles.externalLinkWrapper, isActive && styles.iconActive)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {selectedProject != null && selectedProject.modalDetails != null && (
        <PreviewDialog
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.name ?? "Untitled"}
          layout="flipped"
          imageSrc={selectedProject?.modalDetails?.previewImages?.[0] || undefined}
          gallery={selectedProject?.modalDetails?.previewImages?.slice(1) ?? []}
          description={
            selectedProject?.modalDetails
              ? `${selectedProject.modalDetails.problemStatement ?? ""}\n\nThought Process:\n${selectedProject.modalDetails.thoughtProcess ?? ""}`
              : undefined
          }
          highlightsTitle="Current Direction"
          highlights={selectedProject?.modalDetails?.currentDirection ?? []}
          primaryHref={selectedProject?.modalDetails?.optionalLink?.url ?? undefined}
          primaryLabel={selectedProject?.modalDetails?.optionalLink?.label ?? undefined}
          secondaryHref={(selectedProject as Record<string, unknown>)?.url as string | undefined}
          meta={[
            { label: "Status", value: "Research / UI", accent: true },
            { label: "Completion", value: `${selectedProject?.progress ?? 0}%` },
          ]}
        />
      )}
    </article>
  );
}