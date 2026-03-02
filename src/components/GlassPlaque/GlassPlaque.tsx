"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./GlassPlaque.module.css";
import { cn } from "@/lib/utils";

interface GlassPlaqueProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "inline" | "icon";
}

export function GlassPlaque({ children, className, variant = "default" }: GlassPlaqueProps) {
  if (variant === "inline") {
    return (
      <span className={cn(styles.plaque, styles.variantInline, className)}>
        {children}
      </span>
    );
  }

  return (
    <div className={cn(styles.perspectiveWrapper, variant === "icon" && styles.iconWrapper, className)}>
      <motion.div
        className={cn(styles.plaque, variant === "icon" ? styles.variantIcon : styles.variantDefault)}
        initial={{ opacity: 0, y: 30, rotateX: 15, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        /* FIX: Removed the strict margin trap. Now fires when 10% of it is visible */
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}