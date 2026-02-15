import type { Mode } from "../app/modes";
import {
  Code,
  Award,
  User,
  Mail,
  Heart,
  Smile,
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
import { SkillCard } from "@/components/SkillCard/SkillCard";
import { WhatDrivesMe } from "@/components/WhatDrivesMe/WhatDrivesMe";
import { BeyondTheCode } from "@/components/BeyondTheCode/BeyondTheCode";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { delayChildren: 0.2, staggerChildren: 0.1 } 
  },
};

const cardVariant: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 15, mass: 1 },
  },
};

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

export default function AboutView({ mode }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);

  // --- SCROLL SPY CONFIG ---
  const spyConfig = {
    rootMargin: "-45% 0px -45% 0px",
    triggerOnce: false,
  };

  // --- SCROLL SPIES ---
  const { ref: heroSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel(null),
  });

  const { ref: arsenalSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("THE ARSENAL"),
  });

  const { ref: journeySpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("THE JOURNEY"),
  });

  const { ref: driveSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("VISION"),
  });

  const { ref: badgesSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("MILESTONES"),
  });

  const { ref: personalSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("PERSONAL"),
  });

  const { ref: contactSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("GET IN TOUCH"),
  });

  // Slightly earlier trigger for mobile so animations feel responsive
  const viewConfig = { once: true, margin: isMobile ? "-50px" : "-100px" };

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

          {/* === WHAT DRIVES ME SECTION (FIXED ANIMATION) === */}
          <section className={styles.flowSection} ref={driveSpy}>
            <div className={styles.contentWrapper}>
              <SectionHeader title="What Drives Me" icon={Heart} variant="default" />
              
              {/* Wrapped in motion.div to match other sections */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div variants={cardVariant}>
                  <WhatDrivesMe />
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

          {/* === BEYOND THE CODE (FIXED ANIMATION) === */}
          <section className={styles.flowSection} ref={personalSpy}>
            <div className={styles.contentWrapper}>
              <SectionHeader title="Beyond The Code" icon={Smile} variant="default" />
              
              {/* Wrapped in motion.div to match other sections */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div variants={cardVariant}>
                  <BeyondTheCode />
                </motion.div>
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