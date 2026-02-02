import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const hasCompletedRef = useRef(false); // Guard against double firing

  useEffect(() => {
    // Safety check: if already done, don't restart
    if (hasCompletedRef.current) return;

    const interval = setInterval(() => {
      setPercent((prev) => {
        // Increment logic
        const next = prev + Math.floor(Math.random() * 5) + 2;

        if (next >= 100) {
          clearInterval(interval);

          // TRIGGER COMPLETION LOGIC HERE
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setTimeout(() => {
              onComplete();
            }, 800); // 800ms delay to admire the 100% state
          }

          return 100;
        }
        return next;
      });
    }, 60); // Slightly faster tick rate

    return () => clearInterval(interval);
  }, [onComplete]);

  // Calculate opacity/blur based on percent
  const opacity = Math.max(0.2, percent / 100);
  const blurAmount = Math.max(0, 10 - percent / 10);

  return (
    <motion.div
      className={styles.loaderContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }} // Faster exit
      key="preloader"
    >
      {/* LOGO */}
      <div className={styles.logoWrapper}>
        <img
          src="/logos/D logo 120 x 120.png"
          alt="Loading..."
          className={styles.logo}
          style={{
            opacity: opacity,
            filter: `blur(${blurAmount}px)`,
            transform: `scale(${0.9 + percent / 1000})`,
          }}
        />
      </div>

      {/* PROGRESS BAR */}
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar} style={{ width: `${percent}%` }} />
      </div>

      {/* TERMINAL TEXT */}
      <div className={styles.terminalText}>
        <span className={styles.percent}>{percent}%</span>
        <span style={{ opacity: 0.5, marginLeft: "8px" }}>
          {percent < 100 ? "decrypting_assets..." : "system_ready"}
        </span>
      </div>
    </motion.div>
  );
}
