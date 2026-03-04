import type { LucideIcon } from "lucide-react";
import styles from "./ModuleCard.module.css";
import type { ReactNode } from "react";
import { useRef, useCallback } from "react";

interface ModuleCardProps {
  title: string;
  subtitle?: string;
  topRight?: ReactNode;
  icon?: LucideIcon;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function ModuleCard({
  title,
  subtitle,
  topRight,
  icon: Icon,
  footer,
  children,
  className,
}: ModuleCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // P5: Dynamic specular highlight — the glint follows the cursor
  // like a real machined metallic surface (GPU-composited via CSS custom props)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
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

  // Clean up: reset specular to default position, cancel any pending rAF
  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    cardRef.current?.style.removeProperty("--mx");
    cardRef.current?.style.removeProperty("--my");
  }, []);

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${className || ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.head}>
        <div className={styles.left}>
          {Icon && (
            <div className={styles.iconWrap}>
              <Icon size={20} className={styles.icon} />
            </div>
          )}
          <div className={styles.titleBlock}>
            <h3 className={styles.title}>{title}</h3>
            {/* The Narrative Microcopy */}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        {topRight && <div className={styles.topRight}>{topRight}</div>}
      </div>

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
