import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./SectionHeader.module.css";
import type { LucideIcon } from "lucide-react";

// --- ANIMATION VARIANTS (Internalized) ---
const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const lineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const pillVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export type HeaderVariant = "default" | "writer" | "trophy" | "contact";

type Props = {
  title: string;
  icon: LucideIcon;
  variant?: HeaderVariant;
  className?: string;
};

export function SectionHeader({
  title,
  icon: Icon,
  variant = "default",
  className,
}: Props) {
  // Map the variant string to the CSS module class
  const variantClass = variant !== "default" ? styles[variant] : "";

  return (
    <motion.div
      className={cn(styles.sectionHeader, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={headerVariants}
    >
      <motion.div variants={lineVariant} className={styles.headerLine} />

      <motion.div
        variants={pillVariant}
        className={cn(styles.headerPill, variantClass)}
      >
        <Icon className={styles.headerIcon} />
        <span>{title}</span>
      </motion.div>

      <motion.div variants={lineVariant} className={styles.headerLine} />
    </motion.div>
  );
}