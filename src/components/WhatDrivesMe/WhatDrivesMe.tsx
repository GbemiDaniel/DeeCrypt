import React from "react";
import { motion } from "framer-motion";
import styles from "./WhatDrivesMe.module.css";

export function WhatDrivesMe() {
  // Animation Variants for the Card Content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className={styles.textWrapper}>
        <motion.p variants={itemVariants} className={styles.lead}>
          I build because of the ideas that <span className={styles.highlight}>keep me awake at night.</span>
        </motion.p>

        <motion.p variants={itemVariants}>
          Not the next trend or bubble—I'm interested in solving problems that
          matter. Digital solutions that make life better for people, systems
          that work more fairly, products that actually help.
        </motion.p>

        <motion.p variants={itemVariants}>
          The trust-based systems we operate on are falling apart like Rome
          did—gradually, then suddenly. It's a good thing that trustless
          systems are being built. I want to be part of that transformation.
        </motion.p>

        <motion.p variants={itemVariants} className={styles.vision}>
          <strong className={styles.highlight}>In 1-3 years,</strong> I see myself
          as part of the blockchain community—not just as a builder, but as
          someone who inspires others to join, regardless of their field. If I
          can do it, so can you.
        </motion.p>
      </div>
    </motion.div>
  );
}