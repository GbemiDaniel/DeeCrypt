"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Bug, PenTool, RefreshCw } from "lucide-react";
import styles from "./WhatDrivesMe.module.css";
import { cn } from "@/lib/utils";

type Phase = "build" | "test" | "write" | "hidden";

export function WhatDrivesMe() {
  const [activePhase, setActivePhase] = useState<Phase>("build");

  return (
    <section className={styles.section}>
      
      {/* 1. ATMOSPHERIC BACKGROUND (GPU-Optimized Crossfade) */}
      <div className={styles.ambientWrapper}>
        <div className={cn(styles.ambientLayer, styles.layerBuild)} style={{ opacity: activePhase === "build" ? 0.15 : 0 }} />
        <div className={cn(styles.ambientLayer, styles.layerTest)} style={{ opacity: activePhase === "test" ? 0.15 : 0 }} />
        <div className={cn(styles.ambientLayer, styles.layerWrite)} style={{ opacity: activePhase === "write" ? 0.15 : 0 }} />
      </div>

      <div className={styles.content}>

        {/* 2. THE STICKY SUB-NAV */}
        <motion.div 
          className={styles.stickyTracker}
          animate={{ 
            opacity: activePhase === "hidden" ? 0 : 1,
            y: activePhase === "hidden" ? -20 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.navPill}>
            {/* BUILD */}
            <div className={cn(styles.navItem, activePhase === "build" && styles.activeBuild)}>
              <Code2 className={styles.navIcon} />
              <span>Build.</span>
            </div>
            <div className={styles.navSeparator} />
            {/* TEST */}
            <div className={cn(styles.navItem, activePhase === "test" && styles.activeTest)}>
              <Bug className={styles.navIcon} />
              <span>Test.</span>
            </div>
            <div className={styles.navSeparator} />
            {/* WRITE */}
            <div className={cn(styles.navItem, activePhase === "write" && styles.activeWrite)}>
              <PenTool className={styles.navIcon} />
              <span>Write.</span>
            </div>
          </div>
        </motion.div>

        {/* 3. THE SPOTLIGHT STORY */}
        <div className={styles.storyScroller}>
          
          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setActivePhase("build")}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            transition={{ duration: 0.4 }}
          >
            I stay up at night because I see a future that doesn't exist yet.{" "}
            <span className={cn(styles.shimmer, styles.shimmerBuild)}>Ideas that need building.</span>{" "}
            The only way forward? Push through the skills gap.
          </motion.p>

          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setActivePhase("build")}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            transition={{ duration: 0.4 }}
          >
            The entire creation process excites me—from idea to design,{" "}
            <span className={cn(styles.shimmer, styles.shimmerBuild)}>debugging to refinement</span>,{" "}
            and finally, writing about what I learned. Coding is the tool. Creating is the goal.
          </motion.p>

          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setActivePhase("test")}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            transition={{ duration: 0.4 }}
          >
            I care about UX because creators have a responsibility to simplify.{" "}
            <span className={cn(styles.shimmer, styles.shimmerTest)}>Testing showed me how one bug ruins even the best idea.</span>{" "}
            Now I build with users in mind from day one.
          </motion.p>

          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setActivePhase("write")}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            transition={{ duration: 0.4 }}
          >
            I'm drawn to blockchain because it's an{" "}
            <span className={cn(styles.shimmer, styles.shimmerWrite)}>empty canvas</span>—a solution to our trust crisis. Precise, unbiased, trustless.
          </motion.p>

          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setActivePhase("write")}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            transition={{ duration: 0.4 }}
          >
            That's why I'm building DeeCrypt. To journal the journey into Web3, explore{" "}
            <span className={cn(styles.shimmer, styles.shimmerWrite)}>emerging tech</span>, and break down complex concepts for anyone curious enough to dive in.
          </motion.p>
        </div>

        {/* 4. THE CLIMAX */}
        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => setActivePhase("hidden")}
          viewport={{ margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.climax}>
            <span className={styles.climaxBuild}>Build.</span>{" "}
            <span className={styles.climaxTest}>Test.</span>{" "}
            <span className={styles.climaxWrite}>Write.</span>
          </h3>
          <RefreshCw className={styles.repeatIcon} />
        </motion.div>
      </div>
    </section>
  );
}