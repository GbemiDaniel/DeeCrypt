"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Dumbbell, BookOpen, TreePine, MousePointerClick } from "lucide-react";
import styles from "./BeyondTheCode.module.css";
import { cn } from "@/lib/utils";

const HOBBIES = [
  {
    id: "movies",
    label: "Movies",
    icon: Film,
    color: "#22d3ee", // Cyan 
    title: "Fictional Systems & Chaos",
    tags: ["Westworld", "Silicon Valley", "Sci-Fi"],
    description: "Watching Pied Piper almost lose their network to a 51% attack sparked my deep-dive into blockchain consensus. I study these narratives because they are the ultimate case studies in architecture, edge cases, and unintended consequences.",
  },
  {
    id: "walks",
    label: "Walks",
    icon: TreePine,
    color: "#f59e0b", // Amber 
    title: "The Offline Reset",
    tags: ["Nature", "Debugging", "Clarity"],
    description: "Great code requires a quiet mind. Casual, long walks in nature act as my ultimate debugging tool. Stepping away from the glowing rectangles allows me to untangle complex logic and let the best architectural solutions reveal themselves organically.",
  },
  {
    id: "workout",
    label: "Workout",
    icon: Dumbbell,
    color: "#f43f5e", // Rose
    title: "Discipline & Endurance",
    tags: ["Consistency", "Resilience", "Gains"],
    description: "The gym is where I train for the marathon of software development. Pushing through the final rep builds the exact same mental resilience needed to track down a memory leak at 2 AM. It's all about consistency, form, and incremental gains.",
  },
  {
    id: "journaling",
    label: "Journaling",
    icon: BookOpen,
    color: "#a855f7", // Purple
    title: "Untangling Logic",
    tags: ["Architecture", "Documentation", "Focus"],
    description: "Before I write a single line of code for a complex feature, I write it out in plain English. Journaling clears the mental cache. It helps me map out system architecture, document my thought process, and catch structural flaws before they hit production.",
  }
];

// Directional variants optimized for speed so it doesn't feel laggy
const textVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: { duration: 0.15 }, 
  }),
};

export function BeyondTheCode() {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  
  // THE GOVERNOR: Tracks the exact millisecond of the last interaction
  const lastActionTime = useRef(0);

  const activeHobby = HOBBIES[activeIndex];

  const paginate = (newDirection: number) => {
    const now = Date.now();
    
    // If less than 250ms have passed since the last click, ignore this click.
    // This gives Framer Motion room to finish its math without choking.
    if (now - lastActionTime.current < 250) return; 
    lastActionTime.current = now;

    const newIndex = (activeIndex + newDirection + HOBBIES.length) % HOBBIES.length;
    setPage([newIndex, newDirection]);
  };

  // NATIVE PAN LOGIC: Detects swipe without fighting the child physics
  const handlePanEnd = (event: any, info: any) => {
    const swipeThreshold = 20; // Highly sensitive for easy mobile swiping
    if (info.offset.x < -swipeThreshold) {
      paginate(1); // Swipe Left
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1); // Swipe Right
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.interactivePrompt}>
        <MousePointerClick size={16} className={styles.promptIcon} />
        <span>Swipe or click the icons below to see how it all connects</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={styles.masterCard}
        style={{ "--active-color": activeHobby.color } as React.CSSProperties}
      >
        {/* === TOP HALF: PAN-CONTROLLED ZONE === */}
        <motion.div 
          className={styles.carouselZone}
          onPanEnd={handlePanEnd} 
          style={{ touchAction: "pan-y" }} // Allows normal vertical scrolling
        >
          <div className={styles.carouselTrack}>
            {HOBBIES.map((hobby, index) => {
              // The bulletproof wrapping math
              let offset = index - activeIndex;
              if (offset > 2) offset -= HOBBIES.length;
              if (offset < -1) offset += HOBBIES.length;
              
              const isActive = offset === 0;
              const isEdge = Math.abs(offset) === 1;
              const isHidden = Math.abs(offset) > 1;
              
              return (
                <motion.div
                  key={hobby.id}
                  className={cn(styles.dialItem, isActive && styles.dialItemActive)}
                  onClick={() => {
                    if (offset !== 0) paginate(offset > 0 ? 1 : -1);
                  }}
                  initial={false}
                  animate={{
                    x: `${offset * 100}%`,
                    y: Math.abs(offset) * -15, 
                    scale: isActive ? 1 : isEdge ? 0.75 : 0.5,
                    opacity: isActive ? 1 : isEdge ? 0.4 : 0,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  style={{ pointerEvents: isHidden ? "none" : "auto" }}
                >
                  <div className={styles.dialIconBox} style={{ color: isActive ? hobby.color : "inherit" }}>
                    <hobby.icon size={28} />
                  </div>
                  <span className={styles.dialLabel}>{hobby.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className={styles.divider} />

        {/* === BOTTOM HALF: DYNAMIC STORY ZONE === */}
        <div className={styles.storyZone}>
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeHobby.id}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.storyContent}
            >
              <div className={styles.titleStack}>
                <h3 className={styles.storyTitle} style={{ color: activeHobby.color }}>
                  {activeHobby.title}
                </h3>
                <div className={styles.tagsRow}>
                  {activeHobby.tags.map((tag, i) => (
                    <span key={i} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className={styles.storyDescription}>
                {activeHobby.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.mantraFooter}>
          <span className={styles.mantraText}>Tech is my life. Code is my tool. Building is the goal.</span>
        </div>
      </motion.div>
    </section>
  );
}