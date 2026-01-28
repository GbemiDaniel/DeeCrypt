import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  variant?: "dev" | "writer";
  delay?: number;
  split?: "words" | "none";
  className?: string;
};

const variants = {
  dev: {
    initial: { opacity: 0, y: 12, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: (delay = 0) => ({
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }),
  },
  writer: {
    initial: { opacity: 0, y: 15, rotateX: 10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: (delay = 0) => ({
      duration: 0.9,
      delay,
      ease: [0.2, 0.65, 0.3, 0.9],
    }),
  },
};

export default function TextReveal({
  children,
  variant = "dev",
  delay = 0,
  split = "none",
  className,
}: TextRevealProps) {
  const v = variants[variant] || variants.dev;

  const isString = typeof children === "string";
  const shouldSplit = split === "words" && isString;
  const words = shouldSplit ? (children as string).split(" ") : [];

  // CASE 1: Word-splitting animation (for "Writer" mode)
  // This maintains the original structure which works for non-gradient text.
  if (shouldSplit) {
    return (
      <span className={className} style={{ display: "inline-block" }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            initial={v.initial}
            animate={v.animate}
            transition={v.transition(delay + i * 0.08)}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  // CASE 2: Single block animation (for "Dev" mode gradient)
  // This returns only the motion.span and applies the className directly to it,
  // making it compatible with the background-clip: text requirement.
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial={v.initial}
      animate={v.animate}
      transition={v.transition(delay)}
    >
      {children}
    </motion.span>
  );
}
