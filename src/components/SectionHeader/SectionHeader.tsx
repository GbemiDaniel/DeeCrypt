import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import styles from "./SectionHeader.module.css";
import React from "react";

export type SectionHeaderVariant = "default" | "writer" | "trophy" | "contact";

interface Props {
  title: string;
  icon: LucideIcon;
  variant?: SectionHeaderVariant;
}

// Extracting exact RGB values so CSS can manipulate opacities
const themeMap: Record<SectionHeaderVariant, { hex: string; rgb: string }> = {
  default: { hex: "#22d3ee", rgb: "34, 211, 238" }, // Cyan
  writer: { hex: "#a78bfa", rgb: "167, 139, 250" }, // Violet
  trophy: { hex: "#facc15", rgb: "250, 204, 21" }, // Gold
  contact: { hex: "#22d3ee", rgb: "34, 211, 238" }, // Cyan
};

export function SectionHeader({ title, icon: Icon, variant = "default" }: Props) {
  const activeTheme = themeMap[variant];

  return (
    <div
      className={styles.headerContainer}
      style={{
        "--theme-hex": activeTheme.hex,
        "--theme-rgb": activeTheme.rgb,
      } as React.CSSProperties}
    >
      <motion.div
        className={styles.iconWrapper}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Icon size={20} className={styles.icon} strokeWidth={1.5} />
      </motion.div>

      <motion.h2
        className={`text-metal ${styles.title}`}
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        {title}
      </motion.h2>

      <motion.div
        className={styles.line}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      />
    </div>
  );
}