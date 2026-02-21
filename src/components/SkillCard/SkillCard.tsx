import type { ReactNode } from "react";
import { 
  Code2, 
  FileType, 
  Wind, 
  Framer, 
  Bug, 
  Search, 
  FileText, 
  BookOpen, 
  Globe 
} from "lucide-react";
import styles from "./SkillCard.module.css";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  type: string;
  tech?: string[];
};

// Helper to map tech names to icons
const getTechIcon = (name: string) => {
  const size = 12; // Small icon size for pills
  const lowerName = name.toLowerCase();

  if (lowerName.includes("react")) return <Code2 size={size} />;
  if (lowerName.includes("type")) return <FileType size={size} />;
  if (lowerName.includes("tail")) return <Wind size={size} />;
  if (lowerName.includes("framer")) return <Framer size={size} />;
  
  if (lowerName.includes("test")) return <Bug size={size} />;
  if (lowerName.includes("flow")) return <Search size={size} />;
  if (lowerName.includes("jira") || lowerName.includes("bug")) return <Bug size={size} />;
  
  if (lowerName.includes("doc")) return <FileText size={size} />;
  if (lowerName.includes("blog")) return <BookOpen size={size} />;
  if (lowerName.includes("web3")) return <Globe size={size} />;

  return null; // No icon fallback
};

export function SkillCard({ title, description, icon, type, tech }: Props) {
  return (
    <article className={styles.skillCard} data-type={type}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          {icon}
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <p className={styles.description}>
        {description}
      </p>

      {/* TECH PILLS WITH ICONS */}
      {tech && (
        <div className={styles.techStack}>
          {tech.map((item) => (
            <span key={item} className={styles.techPill}>
              {/* Render icon if it exists */}
              {getTechIcon(item) && (
                <span className={styles.pillIcon}>{getTechIcon(item)}</span>
              )}
              {item}
            </span>
          ))}
        </div>
      )}
      
      <div className={styles.glow} />
    </article>
  );
}