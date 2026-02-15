import type { Mode } from "../app/modes";
import {
  Code,
  Award,
  User,
  Mail,
} from "lucide-react";
import styles from "./AboutView.module.css";
import { useState } from "react";

// --- LIBRARIES ---
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { setSectionLabel } from "../hooks/useScrollSpy";
import { useMediaQuery } from "../hooks/useMediaQuery";

// --- DATA & HOOKS ---
import { TIMELINE_DATA, ARSENAL_DATA, BADGES_DATA } from "@/data/about";

// --- COMPONENTS ---
import { Timeline } from "@/components/Timeline";
import { BadgeCard } from "@/components/BadgeCard/BadgeCard";
import { ContactPanel } from "@/components/ContactPanel/ContactPanel";
import { Preloader } from "@/components/Preloader/Preloader";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { AboutHero } from "@/components/AboutHero/AboutHero";
import { SkillCard } from "@/components/SkillCard/SkillCard"; // <--- NEW IMPORT

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 15, mass: 1.2 },
  },
};

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

export default function AboutView({ mode }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);

  // --- SCROLL SPY ---
  const { ref: heroSpy } = useInView({ threshold: 0, onChange: (v) => v && setSectionLabel(null) });
  const { ref: arsenalSpy } = useInView({ threshold: 0.1, onChange: (v) => v && setSectionLabel("THE ARSENAL") });
  const { ref: journeySpy } = useInView({ threshold: 0.1, onChange: (v) => v && setSectionLabel("THE JOURNEY") });
  const { ref: badgesSpy } = useInView({ threshold: 0.1, onChange: (v) => v && setSectionLabel("MILESTONES") });
  const { ref: contactSpy } = useInView({ threshold: 0.1, onChange: (v) => v && setSectionLabel("GET IN TOUCH") });

  const viewConfig = { once: false, amount: isMobile ? 0.2 : 0.3 };

  return (
    <div className={styles.container} data-theme={mode}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <div className={styles.fixedBackground} />

          {/* === HERO SECTION === */}
          <div ref={heroSpy}>
             <AboutHero isLoading={isLoading} />
          </div>

          {/* === ARSENAL SECTION === */}
          <section className={styles.flowSection} ref={arsenalSpy}>
            <div className={styles.contentWrapper}>
              <SectionHeader title="The Arsenal" icon={Code} variant="default" />
              <motion.div
                className={styles.gridSection}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                {ARSENAL_DATA.map((item, index) => (
                  <motion.div key={index} variants={cardVariant}>
                    {/* Replaced inline HTML with SkillCard */}
                    <SkillCard 
                      title={item.title} 
                      description={item.description} 
                      icon={item.icon} 
                      type={item.type} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* === JOURNEY SECTION === */}
          <section className={styles.flowSection} ref={journeySpy}>
            <div className={styles.contentWrapper}>
              <SectionHeader title="The Journey" icon={User} variant="writer" />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div variants={cardVariant}>
                  <Timeline items={TIMELINE_DATA} />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* === BADGES SECTION === */}
          <section className={styles.flowSection} ref={badgesSpy}>
            <div className={styles.contentWrapper}>
              <SectionHeader title="Badges & Milestones" icon={Award} variant="trophy" />
              <motion.div
                className={styles.certGrid}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                {BADGES_DATA.map((badge, i) => (
                  <motion.div key={i} variants={cardVariant}>
                    <BadgeCard {...badge} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* === CONTACT SECTION === */}
          <section className={styles.flowSection} ref={contactSpy}>
            <div className={styles.contentWrapper}>
              <SectionHeader title="Get In Touch" icon={Mail} variant="contact" />
              <motion.div
                className={styles.ctaSection}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div
                  variants={cardVariant}
                  className="w-full flex justify-center"
                >
                  <ContactPanel
                    email="your-email@example.com"
                    resumeUrl="/resume.pdf"
                    socials={{
                      github: "https://github.com/yourusername",
                      twitter: "https://twitter.com/yourusername",
                      linkedin: "https://linkedin.com/in/yourusername",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}