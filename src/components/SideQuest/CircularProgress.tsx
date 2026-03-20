import { useState, useEffect } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./CircularProgress.module.css";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  animateToValue?: boolean;
}

export function CircularProgress({
  value,
  size = 56,
  strokeWidth = 4,
  className,
  animateToValue = false,
}: CircularProgressProps) {
  // Use state to continuously track the current animated values
  const [dullCurrent, setDullCurrent] = useState(0);
  const [accentCurrent, setAccentCurrent] = useState(0);

  // Animate the dull background progress on mount
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(v) {
        setDullCurrent(v);
      },
    });
    return () => controls.stop();
  }, [value]);

  // Animate the active accent progress from 0 to target on interaction
  useEffect(() => {
    const targetValue = animateToValue ? value : 0;
    
    const controls = animate(accentCurrent, targetValue, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom energetic spring-like easing
      onUpdate(v) {
        setAccentCurrent(v);
      },
    });
    
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateToValue, value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dullOffset = circumference - (dullCurrent / 100) * circumference;
  const accentOffset = circumference - (accentCurrent / 100) * circumference;

  return (
    <div className={cn(styles.wrapper, className)}>
      <svg width={size} height={size} className={styles.svg}>
        {/* Background track (full circle, very faint) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.track}
          strokeWidth={strokeWidth}
        />
        {/* Dull Progress arc (shows the stipulated percentage by default) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.dullProgress}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dullOffset}
        />
        {/* Active Accent Progress arc (fills up when active) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.accentProgress}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={accentOffset}
        />
      </svg>
      {/* Percentage text - stably follows the dull load, highlights on hover */}
      <span className={cn(styles.percentage, animateToValue && styles.percentageActive)}>
        {Math.round(dullCurrent)}%
      </span>
    </div>
  );
}
