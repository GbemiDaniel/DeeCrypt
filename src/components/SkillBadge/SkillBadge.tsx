import type { LucideIcon } from "lucide-react";
// The 'cn' utility was requested but is not used in the current component.
// It is included here for future use if class name composition becomes necessary.
// import { cn } from "@/lib/utils"; 
import styles from "./SkillBadge.module.css";

interface SkillBadgeProps {
  name: string;
  icon?: LucideIcon;
  color?: string; // e.g., "#61DAFB"
  className?: string;
}

export default function SkillBadge({
  name,
  icon: Icon,
  color,
  className,
}: SkillBadgeProps) {
  return (
    <div
      className={styles.badge}
      style={{ "--badge-color": color || "#ffffff" } as React.CSSProperties}
    >
      {Icon && <Icon size={14} className={styles.icon} />}
      <span>{name}</span>
    </div>
  );
}
