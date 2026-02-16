import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  variant?: "dev" | "writer";
  delay?: number;
  split?: "words" | "none";
  direction?: "top" | "bottom"; // <--- NEW CONTROL
  className?: string;
};

export default function TextReveal({
  children,
  variant = "dev",
  delay = 0,
  split = "none",
  direction = "bottom", // Default to rising up
  className,
}: TextRevealProps) {
  
  // 1. CALCULATE START POSITION
  // If "top", start at -20 (above). If "bottom", start at 20 (below).
  const yStart = direction === "top" ? -25 : 25;

  // 2. DEFINE ANIMATION VARIANTS
  // We define these inside the component now so they can read 'yStart'
  const variants = {
    hidden: { 
      opacity: 0, 
      y: yStart, 
      filter: "blur(8px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 0.5,     // Fast, confident snap
        ease: [0.2, 0.65, 0.3, 0.9], // "Out Back" ease (slight overshoot feel)
      }
    }
  };

  const isString = typeof children === "string";
  const shouldSplit = split === "words" && isString;
  const words = shouldSplit ? (children as string).split(" ") : [];

  // CASE 1: Word-splitting (The "Domino" Effect)
  if (shouldSplit) {
    return (
      <span className={className} style={{ display: "inline-block" }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            initial="hidden"
            animate="visible"
            variants={variants}
            // TIGHT STAGGER: 0.02s creates a "wave" rather than a "read"
            transition={{ 
              delay: delay + i * 0.02,
              duration: 0.5,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  // CASE 2: Single block animation (The "Slam" Effect)
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ 
        delay: delay,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }}
    >
      {children}
    </motion.span>
  );
}