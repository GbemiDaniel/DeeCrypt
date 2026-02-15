import { useRef, MouseEvent } from "react";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "./AboutHero.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCinematicIntro } from "@/hooks/useCinematicIntro";

// --- VARIANTS (Moved from View) ---
const avatarPop: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const introContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};

const introLine: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

type Props = {
  isLoading: boolean;
};

export function AboutHero({ isLoading }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Hook usage moved here!
  const { text, showCursor, sequencePhase } = useCinematicIntro(isLoading);

  // Tilt Logic moved here!
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    avatarRef.current.style.setProperty("--rX", `${-y * 20}deg`);
    avatarRef.current.style.setProperty("--rY", `${x * 20}deg`);
  };

  const handleMouseLeave = () => {
    if (isMobile || !avatarRef.current) return;
    avatarRef.current.style.setProperty("--rX", `0deg`);
    avatarRef.current.style.setProperty("--rY", `0deg`);
  };

  return (
    <section className={styles.heroScreen}>
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.heroSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* AVATAR */}
          <motion.div variants={avatarPop} className="z-10">
            <div
              ref={avatarRef}
              className={styles.tiltContainer}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ touchAction: "none" }}
            >
              <div className={styles.avatarWrapper}>
                <img
                  src="/logos/D logo 120 x 120.png"
                  alt="Gbemi Daniel"
                  className={styles.avatar}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  className={styles.statusBadge}
                >
                  <span className={styles.statusDot} />
                  Open to Work
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* TEXT SEQUENCE */}
          <div className={styles.textContainer}>
            <AnimatePresence mode="wait">
              {sequencePhase !== "final" && (
                <motion.div
                  key="typewriter"
                  className={styles.codeFont}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
                >
                  {text}
                  {showCursor && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={styles.cursor}
                    />
                  )}
                </motion.div>
              )}

              {sequencePhase === "final" && (
                <motion.h1
                  key="finalHeader"
                  className={styles.finalHeader}
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Here&apos;s my story.
                  <ArrowDown className={styles.arrowIcon} />
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* STATIC INTRO TEXT */}
          {sequencePhase === "final" && (
            <motion.div
              className={styles.introText}
              variants={introContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={introLine}>
                I’m <strong className="text-foreground">Gbemi Daniel</strong> (aka <em>Deecrypt</em>).
              </motion.div>
              <motion.div variants={introLine}>
                I sit at the intersection of <strong>Frontend Engineering</strong>
              </motion.div>
              <motion.div variants={introLine}>
                and <strong>Web3 Storytelling</strong>.
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}