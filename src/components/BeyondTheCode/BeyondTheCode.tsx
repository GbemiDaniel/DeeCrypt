import React from "react";
import { motion } from "framer-motion";
import { Coffee, Target } from "lucide-react";
import styles from "./BeyondTheCode.module.css";
import { cn } from "@/lib/utils";

// Import the data
import { LIFESTYLE_ITEMS, FOCUS_AREAS } from "@/data/about";

export function BeyondTheCode() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <motion.div 
      className={styles.grid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* === CARD 1: HOW I RECHARGE === */}
      <motion.div variants={cardVariants} className={cn(styles.card, styles.rechargeCard)}>
        <div className={styles.cardHeader}>
          <Coffee className={styles.cardIcon} size={20} />
          <h3 className={styles.cardTitle}>The Human Side</h3>
        </div>
        
        <p className={styles.text}>
          Great code requires a clear mind. When I step away from the screen, 
          I focus on things that spark creativity—whether it's analyzing character arcs in 
          Better Call Saul or journaling to untangle complex thoughts.
        </p>

        <div className={styles.hobbyGrid}>
          {LIFESTYLE_ITEMS.map((item, idx) => (
            <div key={idx} className={styles.hobbyTag}>
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* === CARD 2: WHERE I CAN HELP === */}
      <motion.div variants={cardVariants} className={cn(styles.card, styles.workCard)}>
        <div className={styles.cardHeader}>
          <Target className={styles.cardIcon} size={20} />
          <h3 className={styles.cardTitle}>Where I Can Help</h3>
        </div>

        <p className={styles.text}>
          I thrive in environments where technical precision meets bold ideas. 
          I am currently open to roles that challenge me to bridge the gap between 
          complex backend logic and intuitive frontend experiences.
        </p>

        <div className={styles.checklist}>
          {FOCUS_AREAS.map((item, idx) => (
            <div key={idx} className={styles.checkItem}>
              {/* Clone element to add class if needed, or just wrap */}
              <span className={styles.checkIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}