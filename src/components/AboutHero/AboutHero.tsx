import { useRef, MouseEvent } from "react";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "./AboutHero.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCinematicIntro } from "@/hooks/useCinematicIntro";
import { GlassPlaque } from "@/components/GlassPlaque/GlassPlaque";

// --- VARIANTS ---
const avatarPop: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -10 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

// --- STORY-DRIVEN ASSEMBLY VARIANTS ---
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
  // Spring physics makes it look like physical hardware clicking into place
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 15 } },
};

type Props = { isLoading: boolean; };

export function AboutHero({ isLoading }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { text, showCursor, sequencePhase } = useCinematicIntro(isLoading);
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
        <motion.div className={styles.heroSection} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          
          {/* AVATAR */}
          <motion.div variants={avatarPop} className="z-10">
            <div ref={avatarRef} className={styles.tiltContainer} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ touchAction: "none" }}>
              <div className={styles.avatarWrapper}>
                <img src="/logos/D logo 120 x 120.png" alt="Gbemi Daniel" className={styles.avatar} />
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 300 }} className={styles.statusBadge}>
                  <span className={styles.statusDot} /> Open to Work
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* TYPEWRITER SEQUENCE */}
          <div className={styles.textContainer}>
            <AnimatePresence mode="wait">
              {sequencePhase !== "final" && (
                <motion.div key="typewriter" className={styles.codeFont} initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}>
                  {text} 
                  {/* The literal <_ CRT cursor */}
                  {showCursor && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className={styles.cursor}>&lt;_</motion.span>}
                </motion.div>
              )}

              {/* FINAL HEADER (The Hardware Dashboard) */}
              {sequencePhase === "final" && (
                <motion.div key="finalHeader" className={styles.finalHeaderWrapper} initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, ease: "easeOut" }}>
                  
                  {/* Perfectly sized, Ash-Green metallic lead-in with ambient sweep */}
                  <h2 className={styles.metallicHeader}>I'm Gbemi Daniel</h2>
                  
                  {/* The Physical Hardware Chains */}
                  <div className={styles.chainContainer}>
                    <div className={styles.chainLeft} />
                    <div className={styles.chainRight} />
                  </div>

                  <GlassPlaque variant="default" className={styles.deecryptPlaque}>
                    <span className={styles.pulseDeecrypt}>Deecrypt</span>
                  </GlassPlaque>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FINAL BIO CONTENT (The Module Boot-Up) */}
          {sequencePhase === "final" && (
            <motion.div className={styles.introText} variants={bioContainer} initial="hidden" animate="visible">
              
              <p className={styles.paragraph}>
                <motion.span variants={textChunk} className="inline-block">
                  I build web applications, test digital products, and write about what keeps me curious—
                </motion.span>
                
                <motion.span variants={badgePop} className="inline-block">
                  <GlassPlaque variant="inline">
                    <span className={styles.pulseFrontend}>frontend dev</span>
                  </GlassPlaque>
                </motion.span>
                
                <motion.span variants={textChunk} className="inline-block">, </motion.span>
                
                <motion.span variants={badgePop} className="inline-block">
                  <GlassPlaque variant="inline">
                    <span className={styles.pulseAI}>emerging AI</span>
                  </GlassPlaque>
                </motion.span>
                
                <motion.span variants={textChunk} className="inline-block">
                  , and the evolving{" "}
                </motion.span>
                
                <motion.span variants={badgePop} className="inline-block">
                  <GlassPlaque variant="inline">
                    <span className={styles.pulseWeb3}>Web3 space</span>
                  </GlassPlaque>
                </motion.span>
                
                <motion.span variants={textChunk} className="inline-block">.</motion.span>
              </p>

              <motion.div variants={textChunk} className={styles.summaryBox}>
                Want to know how I got here and where I'm heading? Scroll down.
                
                <motion.div variants={badgePop}>
                  <GlassPlaque variant="icon" className={styles.arrowPlaqueWrapper}>
                    <ArrowDown className={styles.pulseArrow} />
                  </GlassPlaque>
                </motion.div>
              </motion.div>

            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}