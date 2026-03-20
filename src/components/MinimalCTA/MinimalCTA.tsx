import { motion } from "framer-motion";
import { type LucideIcon, ArrowUpRight } from "lucide-react";
import styles from "./MinimalCTA.module.css";
import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

interface Action {
  label: string;
  href: string;
  icon?: LucideIcon;
  download?: boolean;
}

interface MinimalCTAProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  primaryAction: Action;
  secondaryAction?: Action;
  className?: string;
}

export function MinimalCTA({
  icon: Icon,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  className,
}: MinimalCTAProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const { left, top, width, height } =
        cardRef.current.getBoundingClientRect();
      const mx = ((e.clientX - left) / width) * 100;
      const my = ((e.clientY - top) / height) * 100;
      cardRef.current.style.setProperty("--mx", `${mx.toFixed(1)}%`);
      cardRef.current.style.setProperty("--my", `${my.toFixed(1)}%`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    cardRef.current?.style.removeProperty("--mx");
    cardRef.current?.style.removeProperty("--my");
  }, []);

  return (
    <motion.div 
      className={cn(styles.wrapper, className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div 
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* LEFT/TOP: Context */}
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <div className={styles.iconWrap}>
              <Icon size={22} className={styles.icon} />
            </div>
            <div className={styles.titleBlock}>
              <h3 className={styles.title}>{title}</h3>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
        </div>
        
        {/* RIGHT/BOTTOM: Controls */}
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
          </a>
        </div>
      </div>
    </motion.div>
  );
}