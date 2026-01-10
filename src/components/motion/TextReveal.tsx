import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  variant?: "dev" | "writer";
  delay?: number;
  split?: "words" | "none";
};

const variants = {
  dev: {
    initial: {
      opacity: 0,
      y: 16,
      filter: "blur(6px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    transition: (delay = 0) => ({
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }),
  },

  writer: {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: (delay = 0) => ({
      duration: 1.1,
      delay,
      ease: "easeOut",
    }),
  },
};

export default function TextReveal({
  children,
  variant = "dev",
  delay = 0,
  split = "none",
}: TextRevealProps) {
  const v = variants[variant];

  const text = typeof children === "string" ? children : "";
  const words = split === "words" ? text.split(" ") : [];

  return (
    <span style={{ display: "inline-block" }}>
      {split === "words" ? (
        words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            initial={v.initial}
            animate={v.animate}
            transition={v.transition(delay + i * 0.08)}
          >
            {word}
          </motion.span>
        ))
      ) : (
        <motion.span
          style={{ display: "inline-block" }}
          initial={v.initial}
          animate={v.animate}
          transition={v.transition(delay)}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}
