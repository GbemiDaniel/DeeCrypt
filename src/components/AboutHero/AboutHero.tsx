import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./AboutHero.module.css";
import { useCinematicIntro } from "@/hooks/useCinematicIntro";
import { GlassPlaque } from "@/components/GlassPlaque/GlassPlaque";
import { PersonaCard } from "@/components/PersonaCard/PersonaCard";

// --- VARIANTS ---
const avatarPop: Variants = {
  cardHidden: { scale: 0, opacity: 0, rotate: -10 },
  cardVisible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

const bioContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  },
};

const textChunk: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 15 } },
};

type Props = { isLoading: boolean; };

export function AboutHero({ isLoading }: Props) {
  const { text, showCursor, sequencePhase } = useCinematicIntro(isLoading);

  // THE FIX: We trigger the card flip earlier! 
  // As soon as the system starts deleting "Loading Identity..." to type "Welcome", the card flips in.
  const isIdentityLoaded = ["deleting1", "typing2", "pause2", "fading", "final"].includes(sequencePhase);

  return (
    <section className={styles.heroScreen}>
      <div className={styles.contentWrapper}>
        <motion.div className={styles.heroSection} initial="hidden" whileInView="visible" viewport={{ once: true }}>

          {/* PERSONA CARD — Triggered by `isIdentityLoaded` */}
          <motion.div
            variants={avatarPop}
            className={styles.cardAnchor}
            initial="cardHidden"
            animate={isIdentityLoaded ? "cardVisible" : "cardHidden"}
          >
            <PersonaCard flipTrigger={isIdentityLoaded} />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              // The status badge waits until the very end to "boot up" with the rest of the bio
              animate={sequencePhase === "final" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className={styles.statusBadge}
            >
              <span className={styles.statusDot} /> Open to Work
            </motion.div>
          </motion.div>

          {/* TYPEWRITER SEQUENCE */}
          <div className={styles.textContainer}>
            <AnimatePresence mode="wait">
              {sequencePhase !== "final" && (
                <motion.div
                  key="typewriter"
                  className={`${styles.codeFont} ${styles.typewriterAbsolute}`}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
                >
                  {text}
                  {showCursor && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className={styles.cursor}>&lt;_</motion.span>}
                </motion.div>
              )}

              {/* FINAL HEADER */}
              <motion.div
                key="finalHeader"
                className={styles.finalHeaderWrapper}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={
                  sequencePhase === "final"
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 20, filter: "blur(5px)" }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  pointerEvents: sequencePhase === "final" ? "auto" : "none",
                }}
              >
                <h2 className={styles.metallicHeader}>I'm Gbemi Daniel</h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FINAL BIO CONTENT */}
          <motion.div
            className={styles.introText}
            variants={bioContainer}
            initial="hidden"
            animate={sequencePhase === "final" ? "visible" : "hidden"}
            style={{
              pointerEvents: sequencePhase === "final" ? "auto" : "none",
            }}
          >
            <motion.p variants={textChunk} className={styles.paragraph} style={{ marginBottom: "1rem" }}>
              I design and build digital experiences that reflect the identity of brands, professionals, and products while balancing clarity, usability, and strong visual direction.
            </motion.p>

            <motion.p variants={textChunk} className={styles.paragraph}>
              My work combines frontend engineering, product thinking, and creative execution to create experiences that feel intentional, distinct, and built for the people they serve.
            </motion.p>

            <motion.div variants={textChunk} className={styles.summaryBox}>
              <span style={{ opacity: 0.6, fontSize: "0.85rem", letterSpacing: "0.02em" }}>
                Building across modern web, emerging AI, and digital products.
              </span>

              <motion.div variants={badgePop}>
                <GlassPlaque variant="icon" className={styles.arrowPlaqueWrapper}>
                  <ArrowDown className={styles.pulseArrow} />
                </GlassPlaque>
              </motion.div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}