import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { setSectionLabel, SPY_CONFIG } from "../hooks/useScrollSpy";
import { useMediaQuery } from "../hooks/useMediaQuery";

import { TIMELINE_DATA, ARSENAL_DATA, BADGES_DATA } from "@/data/about";
import { Timeline } from "@/components/Timeline";
import { BadgeCard } from "@/components/BadgeCard/BadgeCard";
import { ContactPanel } from "@/components/ContactPanel/ContactPanel";
import { AboutHero } from "@/components/AboutHero/AboutHero";
import { SkillCard } from "@/components/SkillCard/SkillCard";
import { WhatDrivesMe } from "@/components/WhatDrivesMe/WhatDrivesMe";
import { BeyondTheCode } from "@/components/BeyondTheCode/BeyondTheCode";
import { AboutSectionLabel } from "@/components/AboutSectionLabel/AboutSectionLabel";
import { siteConfig } from "@/config/site";

import styles from "./AboutView.module.css";

// ─── Framer Motion Variants ────────────────────────────────────────────────

// Physical-weight spring — Industrial Hardware standard
const SPRING: Variants = {
  hidden: { y: 30, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 2.5, stiffness: 60, damping: 20 },
  },
};

// Orchestrator — stagger children within a section
const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────

type Props = {
  mode: Mode;
};

export default function AboutView({ mode }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const viewConfig = { once: true, margin: isMobile ? "-50px" : "-100px" };

  // ─── Scroll Spy Refs ──────────────────────────────────────────────────
  const { ref: heroSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel(null),
  });

  const { ref: arsenalSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel("THE ARSENAL"),
  });

  const { ref: journeySpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel("THE JOURNEY"),
  });

  const { ref: visionSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel("VISION"),
  });

  const { ref: badgesSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel("MILESTONES"),
  });

  const { ref: personalSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel("PERSONAL"),
  });

  const { ref: contactSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (v) => v && setSectionLabel("GET IN TOUCH"),
  });

  return (
    <motion.div
      className={styles.container}
      data-theme={mode}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ── Dual Ambient Lighting — Two Fixed Neon Lanterns ── */}
      <div className={styles.ambientCyan} aria-hidden="true" />
      <div className={styles.ambientViolet} aria-hidden="true" />

      {/* ════════════════════════════════════════════════
              HERO — The cinematic typewriter sequence
              (AboutHero preserves its full existing design)
          ════════════════════════════════════════════════ */}
      <div ref={heroSpy}>
        <AboutHero isLoading={false} />
      </div>

      {/* ════════════════════════════════════════════════
              TIER 1 — THE ARSENAL
              Bento grid: primary card (2-col) + secondaries.
              Tone: Cyan — Technical, precise, builder.
          ════════════════════════════════════════════════ */}
      <section
        className={`${styles.flowSection} ${styles.flowSectionTight}`}
        ref={arsenalSpy}
      >
        <div className={styles.contentWrapper}>
          <AboutSectionLabel title="The Arsenal" tone="cyan" />

          <motion.div
            className={styles.arsenalBento}
            initial="hidden"
            whileInView="visible"
            viewport={viewConfig}
            variants={STAGGER}
          >
            {ARSENAL_DATA.map((item, index) => (
              <motion.div key={index} variants={SPRING}>
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

      {/* ════════════════════════════════════════════════
              TIER 2 — THE JOURNEY (Timeline)
              The spine of the page — single column, narrow.
              Tone: Violet — Writer, voice, introspective.
          ════════════════════════════════════════════════ */}
      <section
        className={`${styles.flowSection} ${styles.flowSectionTight}`}
        ref={journeySpy}
      >
        <div className={styles.contentWrapperNarrow}>
          <AboutSectionLabel title="The Journey" tone="violet" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewConfig}
            variants={STAGGER}
          >
            <motion.div variants={SPRING}>
              <Timeline items={TIMELINE_DATA} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
              TIER 3 — STICKY DIPTYCH
              Left (60%): WhatDrivesMe scroll story
              Right (40%): Badges — sticky as you scroll
              Tone: Synthesis (both) on WhatDrivesMe
                    Gold on Badges (earned achievements)
          ════════════════════════════════════════════════ */}
      <section
        className={`${styles.flowSection} ${styles.flowSectionWide}`}
        ref={visionSpy}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.diptychOuter}>

            {/* LEFT — WhatDrivesMe */}
            <div className={styles.diptychLeft}>
              <div className={styles.diptychBlock}>
                <AboutSectionLabel title="What Drives Me" tone="synthesis" />
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewConfig}
                  variants={STAGGER}
                >
                  <motion.div variants={SPRING}>
                    <WhatDrivesMe />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT — Badges (sticky panel) */}
            <div className={styles.diptychRight} ref={badgesSpy}>
              <div className={styles.diptychBlock}>
                <AboutSectionLabel title="Badges & Milestones" tone="gold" />
                <motion.div
                  className={styles.badgeGrid}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ ...viewConfig, amount: 0.1 }}
                  variants={STAGGER}
                >
                  {BADGES_DATA.map((badge, i) => (
                    <motion.div key={i} variants={SPRING}>
                      <BadgeCard {...badge} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
              TIER 4 — CLOSING DIPTYCH
              BeyondTheCode (Violet) + ContactPanel
              The human side of the synthesis closes the page.
          ════════════════════════════════════════════════ */}
      <section
        className={`${styles.flowSection} ${styles.flowSectionTight}`}
        ref={personalSpy}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.closingDiptych}>

            {/* Beyond The Code */}
            <div className={styles.diptychBlock}>
              <AboutSectionLabel title="Beyond The Code" tone="violet" />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={STAGGER}
              >
                <motion.div variants={SPRING}>
                  <BeyondTheCode />
                </motion.div>
              </motion.div>
            </div>

            {/* Contact Panel */}
            <div className={styles.diptychBlock} ref={contactSpy}>
              {/* <AboutSectionLabel title="Get In Touch" tone="cyan" /> */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={STAGGER}
                className={styles.ctaSection}
              >
                <motion.div variants={SPRING} style={{ width: "100%" }}>
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

          </div>
        </div>
      </section>
    </motion.div>
  );
}
