import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import styles from "./MinimalCTA.module.css";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  href: string;
  icon?: LucideIcon;
  download?: boolean;
}

interface MinimalCTAProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction: Action;
  secondaryAction?: Action;
  className?: string;
}

export function MinimalCTA({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: MinimalCTAProps) {
  return (
    <motion.div 
      className={cn(styles.wrapper, className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.card}>
        {/* LEFT: Context */}
        <div className={styles.content}>
          <div className={styles.iconWrap}>
            <Icon size={22} className={styles.icon} />
          </div>
          
          <div className={styles.textBlock}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
        </div>

        {/* RIGHT: Controls */}
        <div className={styles.actions}>
          {secondaryAction && (
            <a 
              href={secondaryAction.href}
              className={cn(styles.button, styles.secondary)}
              download={secondaryAction.download}
              target={secondaryAction.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {secondaryAction.icon && <secondaryAction.icon size={16} />}
              {secondaryAction.label}
            </a>
          )}

          <a 
            href={primaryAction.href}
            className={cn(styles.button, styles.primary)}
            target={primaryAction.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {primaryAction.icon && <primaryAction.icon size={16} />}
            {primaryAction.label}
            {/* Contextual Arrow: Shows up-right for links, nothing for mailto */}
            {primaryAction.href.startsWith("http") && <ArrowUpRight size={16} />}
          </a>
        </div>
      </div>
    </motion.div>
  );
}