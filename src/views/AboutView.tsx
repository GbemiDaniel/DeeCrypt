import type { Mode } from "../app/modes";
// 1. UPDATED IMPORTS: Premium Industrial Icons (No Emojis)
import { Terminal, Hexagon, Fingerprint } from "lucide-react";
import styles from "./AboutView.module.css";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { setSectionLabel } from "../hooks/useScrollSpy";
import { useMediaQuery } from "../hooks/useMediaQuery";

import { TIMELINE_DATA, ARSENAL_DATA, BADGES_DATA } from "@/data/about";
import { Timeline } from "@/components/Timeline";
import { BadgeCard } from "@/components/BadgeCard/BadgeCard";
import { ContactPanel } from "@/components/ContactPanel/ContactPanel";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { AboutHero } from "@/components/AboutHero/AboutHero";
import { SkillCard } from "@/components/SkillCard/SkillCard";
// import { WhatDrivesMe } from "@/components/WhatDrivesMe/WhatDrivesMe";
// import { BeyondTheCode } from "@/components/BeyondTheCode/BeyondTheCode";
import { siteConfig } from "@/config/site";

// --- Framer Motion Variants ---
const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
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
};

export default function AboutView({ mode }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // === PERFORMANCE FIX: INCREASED DELAY ===
  const spyConfig = {
    rootMargin: "-45% 0px -45% 0px",
    triggerOnce: false,
    delay: 250, // Waits 250ms before updating Navbar text
  };

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

  // const { ref: driveSpy } = useInView({
  //   ...spyConfig,
  //   onChange: (v) => v && setSectionLabel("VISION"),
  // });

  const { ref: badgesSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("MILESTONES"),
  });

  // const { ref: personalSpy } = useInView({
  //   ...spyConfig,
  //   onChange: (v) => v && setSectionLabel("PERSONAL"),
  // });

  const { ref: contactSpy } = useInView({
    ...spyConfig,
    onChange: (v) => v && setSectionLabel("GET IN TOUCH"),
  });

  const viewConfig = { once: true, margin: isMobile ? "-50px" : "-100px" };

  return (
    <div className={styles.container} data-theme={mode}>
      <div ref={heroSpy}>
        <AboutHero isLoading={false} />
      </div>

      <section className={styles.flowSection} ref={arsenalSpy}>
        <div className={styles.contentWrapper}>
          <SectionHeader
            title="The Arsenal"
            icon={Terminal}
            variant="default"
            centered
          />
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
                  tech={item.tech}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.flowSection} ref={journeySpy}>
        <div className={styles.contentWrapper}>
          <SectionHeader
            title="The Journey"
            icon={Fingerprint}
            variant="writer"
            centered
          />
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

      {/* 
      <section className={styles.flowSection} ref={driveSpy}>
        <div className={styles.contentWrapper}>
          <SectionHeader
            title="What Drives Me"
            icon={Activity}
            variant="default"
            centered
          />
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
      */}

      <section className={styles.flowSection} ref={badgesSpy}>
        <div className={styles.contentWrapper}>
          <SectionHeader
            title="Badges & Milestones"
            icon={Hexagon}
            variant="default"
            centered
          />
          <motion.div
            className={styles.certGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ ...viewConfig, amount: 0.1 }}
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

      {/* 
      <section className={styles.flowSection} ref={personalSpy}>
        <div className={styles.contentWrapper}>
          <SectionHeader
            title="Beyond The Code"
            icon={Compass}
            variant="default"
            centered
          />
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
      */}

      <section className={styles.flowSection} ref={contactSpy}>
        <div className={styles.contentWrapper}>

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
                email={siteConfig.email}
                resumeUrl={siteConfig.resumeUrl}
                socials={{
                  github: siteConfig.socials.github,
                  twitter: siteConfig.socials.twitter,
                  linkedin: siteConfig.socials.linkedin,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}