"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Bug, PenTool, RefreshCw } from "lucide-react";
import styles from "./WhatDrivesMe.module.css";
import { cn } from "@/lib/utils";
import { GlassPlaque } from "@/components/GlassPlaque/GlassPlaque";

type Phase = "build" | "test" | "write" | "hidden";

const PHASES = [
  { id: "build", label: "Build.", icon: Code2, color: "#22d3ee" },
  { id: "test", label: "Test.", icon: Bug, color: "#f59e0b" },
  { id: "write", label: "Write.", icon: PenTool, color: "#a855f7" },
] as const;

// --- TRUE DEPTH-OF-FIELD SPOTLIGHT ---
const paragraphVariants = {
  hidden: {
    opacity: 0.05, // Turns into a ghost
    filter: "blur(12px)", // True out-of-focus camera blur
    y: 15, // Sinks slightly into the background
    transition: { duration: 0.5, ease: "easeOut" }
  },
  visible: {
    opacity: 1, 
    filter: "blur(0px)", // Snaps into crisp focus
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function WhatDrivesMe() {
  const [activePhase, setActivePhase] = useState<Phase>("build");

  const buildRef = useRef<HTMLParagraphElement>(null);
  const testRef = useRef<HTMLParagraphElement>(null);
  const writeRef = useRef<HTMLParagraphElement>(null);

  const scrollToPhase = (phase: Phase) => {
    setActivePhase(phase);
    const refs = { build: buildRef, test: testRef, write: writeRef, hidden: null };
    const target = refs[phase];
    
    if (target?.current) {
      target.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // --- THE TIGHT FOCUS BAND ---
  // -35% Top: Fades out completely WAY before it hits your sticky nav.
  // -35% Bottom: Waits for the text to reach the middle before lighting it up.
  // This leaves a precise 30% "Focus Zone" dead in the center of the screen.
  const spotlightViewport = { margin: "-35% 0px -35% 0px" };

  return (
    <section className={styles.section}>
      
      <div className={styles.ambientWrapper}>
        <div className={cn(styles.ambientLayer, styles.layerBuild)} style={{ opacity: activePhase === "build" ? 0.15 : 0 }} />
        <div className={cn(styles.ambientLayer, styles.layerTest)} style={{ opacity: activePhase === "test" ? 0.15 : 0 }} />
        <div className={cn(styles.ambientLayer, styles.layerWrite)} style={{ opacity: activePhase === "write" ? 0.15 : 0 }} />
      </div>

      <div className={styles.content}>

        {/* --- THE STICKY TACTILE SUB-NAV --- */}
        <motion.div 
          className={styles.stickyTracker}
          animate={{ 
            opacity: activePhase === "hidden" ? 0 : 1,
            y: activePhase === "hidden" ? -20 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.navTrack}>
            {PHASES.map((phase) => {
              const isActive = activePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => scrollToPhase(phase.id)}
                  className={cn(styles.navItem, isActive && styles.navItemActive)}
                  style={{ "--active-color": phase.color } as React.CSSProperties}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className={styles.activePillBackground}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className={styles.navContent}>
                    <phase.icon className={styles.navIcon} />
                    <span>{phase.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* --- THE PURE SPOTLIGHT STORY --- */}
        <div className={styles.storyScroller}>
          
          <motion.p
            ref={buildRef}
            className={styles.paragraph}
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => setActivePhase("build")}
            viewport={spotlightViewport}
          >
            I stay up at night because I see a future that doesn't exist yet.{" "}
            <span className={cn(styles.shimmer, activePhase === "build" && styles.shimmerBuild)}>
              Ideas that need building.
            </span>{" "}
            The only way forward? Push through the skills gap.
          </motion.p>

          <motion.p
            className={styles.paragraph}
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => setActivePhase("build")}
            viewport={spotlightViewport}
          >
            The entire creation process excites me—from idea to design,{" "}
            <span className={cn(styles.shimmer, activePhase === "build" && styles.shimmerBuild)}>
              debugging to refinement
            </span>,{" "}
            and finally, writing about what I learned. Coding is the tool. Creating is the goal.
          </motion.p>

          <motion.p
            ref={testRef}
            className={styles.paragraph}
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => setActivePhase("test")}
            viewport={spotlightViewport}
          >
            I care about UX because creators have a responsibility to simplify.{" "}
            <span className={cn(styles.shimmer, activePhase === "test" && styles.shimmerTest)}>
              Testing showed me how one bug ruins even the best idea.
            </span>{" "}
            Now I build with users in mind from day one.
          </motion.p>

          <motion.p
            ref={writeRef}
            className={styles.paragraph}
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => setActivePhase("write")}
            viewport={spotlightViewport}
          >
            I'm drawn to blockchain because it's an{" "}
            <span className={cn(styles.shimmer, activePhase === "write" && styles.shimmerWrite)}>
              empty canvas
            </span>—a solution to our trust crisis. Precise, unbiased, trustless.
          </motion.p>

          <motion.p
            className={styles.paragraph}
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => setActivePhase("write")}
            viewport={spotlightViewport}
          >
            That's why I'm building DeeCrypt. To journal the journey into Web3, explore{" "}
            <span className={cn(styles.shimmer, activePhase === "write" && styles.shimmerWrite)}>
              emerging tech
            </span>, and break down complex concepts for anyone curious enough to dive in.
          </motion.p>
        </div>

        {/* --- THE CLIMAX (Pinned Plaque) --- */}
        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <motion.div 
            className={styles.pinWrapper}
            onViewportEnter={() => setActivePhase("hidden")}
            viewport={{ margin: "-40% 0px -40% 0px" }}
          >
            <div className={styles.pin} />
          </motion.div>

          <GlassPlaque variant="default">
            
            <div className={styles.climaxWrapper}>
              <h3 className={styles.climax}>
                
                <span className={styles.word}>
                  <span className={styles.litBuild}>B</span>
                  <span className={cn(styles.glassText, styles.glassReflectBuild)}>uild.</span>
                </span>
                
                <span className={styles.word}>
                  <span className={styles.litTest}>T</span>
                  <span className={cn(styles.glassText, styles.glassReflectTest)}>est.</span>
                </span>
                
                <span className={styles.word}>
                  <span className={styles.litWrite}>W</span>
                  <span className={cn(styles.glassText, styles.glassReflectWrite)}>rite.</span>
                </span>

              </h3>
            </div>

          </GlassPlaque>
        </motion.div>
      </div>
    </section>
  );
}