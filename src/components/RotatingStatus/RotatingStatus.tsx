"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./RotatingStatus.module.css";

const words = [
  "Collaboration",
  "Partnerships",
  "Projects",
  "Creative Work",
  "Select Work",
];

export default function RotatingStatus() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 8, 
      filter: shouldReduceMotion ? "blur(0px)" : "blur(3px)" 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)" 
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -8, 
      filter: shouldReduceMotion ? "blur(0px)" : "blur(3px)" 
    }
  };

  return (
    <span className={styles.container}>
      <span className={styles.staticText}>Open for</span>
      <span className={styles.wordWrapper}>
        {words.map((word) => (
          <span key={`measure-${word}`} className={styles.invisibleMeasure} aria-hidden="true">
            {word}
          </span>
        ))}
        <AnimatePresence initial={false}>
          <motion.span
            key={index}
            className={styles.rotatingWord}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{
              duration: shouldReduceMotion ? 0.4 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
