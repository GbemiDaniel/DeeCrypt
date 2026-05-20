import { ArrowDown, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./AboutHero.module.css";
import { useCinematicIntro } from "@/hooks/useCinematicIntro";
import { GlassPlaque } from "@/components/GlassPlaque/GlassPlaque";
import { PersonaCard } from "@/components/PersonaCard/PersonaCard";
import { cn } from "@/lib/utils";

// --- CUSTOM BRAND ICONS ---
const CustomXIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
);
const MediumIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>
);
const DevToIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.01v1.76h2.84v1.6H9.32V8.53h4.33v1.3zM22.75 9h-1.73l-1.46 4.68h-.06L18.16 9h-1.72l2.07 7.3h1.83L22.75 9z" /></svg>
);

// --- VARIANTS ---
const avatarPop: Variants = {
  cardHidden: { scale: 0, opacity: 0, rotate: -10 },
  cardVisible: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const bioContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
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

  const isIdentityLoaded = ["deleting1", "typing2", "pause2", "fading", "final"].includes(sequencePhase);
  const isBentoActive = sequencePhase === "final";

  return (
    <section className={cn(styles.heroScreen, isBentoActive && styles.bentoActive)}>
      <div className={styles.contentWrapper}>

        {/* =========================================
            VIEW A: THE CINEMATIC BOOT SEQUENCE
            ========================================= */}
        {!isBentoActive && (
          <motion.div className={styles.heroSection} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={avatarPop} className={styles.cardAnchor} initial="cardHidden" animate={isIdentityLoaded ? "cardVisible" : "cardHidden"}>
              <PersonaCard flipTrigger={isIdentityLoaded} layoutId="hero-avatar" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={sequencePhase === "final" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className={styles.statusBadge}
              >
                <span className={styles.statusDot} /> Open to Work
              </motion.div>
            </motion.div>

            <div className={styles.textContainer}>
              <AnimatePresence mode="wait">
                {sequencePhase !== "final" && (
                  <motion.div key="typewriter" className={`${styles.codeFont} ${styles.typewriterAbsolute}`} initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}>
                    {text}
                    {showCursor && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className={styles.cursor}>&lt;_</motion.span>}
                  </motion.div>
                )}
                <motion.div key="finalHeader" className={styles.finalHeaderWrapper} initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} animate={sequencePhase === "final" ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(5px)" }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ pointerEvents: sequencePhase === "final" ? "auto" : "none" }}>
                  <h2 className={styles.metallicHeader}>Gbemi Daniel</h2>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div className={styles.introText} variants={bioContainer} initial="hidden" animate={sequencePhase === "final" ? "visible" : "hidden"} style={{ pointerEvents: sequencePhase === "final" ? "auto" : "none" }}>
              <motion.p variants={textChunk} className={styles.paragraph} style={{ marginBottom: "1rem" }}>
                I design and build digital experiences that reflect the identity of brands, professionals, and products while balancing clarity, usability, and strong visual direction.
              </motion.p>
              <motion.p variants={textChunk} className={styles.paragraph}>
                My work combines frontend engineering, product thinking, and creative execution to create experiences that feel intentional, distinct, and built for the people they serve.
              </motion.p>
              <motion.div variants={textChunk} className={styles.summaryBox}>
                <span style={{ opacity: 0.6, fontSize: "0.85rem", letterSpacing: "0.02em" }}>Building across modern web, emerging AI, and digital products.</span>
                <motion.div variants={badgePop}>
                  <GlassPlaque variant="icon" className={styles.arrowPlaqueWrapper}>
                    <ArrowDown className={styles.pulseArrow} />
                  </GlassPlaque>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* =========================================
            VIEW B: THE 3-PANE MATRIX
            ========================================= */}
        {isBentoActive && (
          <div className={styles.bentoGrid}>

            {/* GRID AREA: AVATAR */}
            <div className={styles.areaAvatar}>
              <img src="/GbemiDaniel_Face.png" alt="Gbemi Daniel" className={styles.rawMobileAvatar} />
              <PersonaCard flipTrigger={true} layoutId="hero-avatar" className={styles.desktopBentoAvatar} />
            </div>

            {/* GRID AREA: MOBILE TITLES */}
            <div className={styles.areaTitles}>
              <h3 className={styles.mobileName}>Gbemi Daniel</h3>
              <p className={styles.mobileRole}>Frontend Engineer</p>
            </div>

            {/* GRID AREA: MOBILE DIVIDER */}
            <div className={styles.areaDivider} />

            {/* GRID AREA: MOBILE SOCIAL SIDEBAR (5 Icons) */}
            <div className={styles.areaSocialsMobile}>
              <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                <CustomXIcon />
              </motion.button>
              <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                <Github />
              </motion.button>
              <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                <Linkedin />
              </motion.button>
              <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                <MediumIcon />
              </motion.button>
              <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                <DevToIcon />
              </motion.button>
            </div>

            {/* GRID AREA: DESKTOP NAV */}
            <div className={styles.areaNav}>
              <div className={styles.navIdentity}>
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img src="/GbemiDaniel_Face.png" alt="Gbemi Daniel" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={styles.mobileName}>Gbemi Daniel</h3>
                  <p className={styles.mobileRole}>Frontend Engineer</p>
                </div>
              </div>
              <div className={styles.navActions}>
                <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                  <CustomXIcon />
                </motion.button>
                <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                  <Github />
                </motion.button>
                <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                  <Linkedin />
                </motion.button>
                <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                  <MediumIcon />
                </motion.button>
                <motion.button style={{ transformOrigin: "center" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={styles.glassPillIcon}>
                  <DevToIcon />
                </motion.button>
              </div>
            </div>

            {/* GRID AREA: CORE TEXT */}
            <div className={styles.areaText}>
              {/* THE FIX: Swapped strict Tailwind text sizes for the fluid .headline class */}
              <h1 className={`${styles.headline} mb-4 md:mb-0`}>
                Designing for identity,<br className="hidden md:block" /> building for <span className="text-muted-foreground italic font-medium">impact.</span>
              </h1>

              <p className={styles.paragraph} style={{ textAlign: "left", maxWidth: "100%" }}>
                I design and build digital experiences that reflect the identity of brands, professionals, and products while balancing clarity, usability, and strong visual direction. My work combines frontend engineering, product thinking, and creative execution to create experiences that feel intentional, distinct, and built for the people they serve.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}