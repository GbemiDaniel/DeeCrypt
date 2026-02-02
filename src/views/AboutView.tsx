import type { Mode } from "../app/modes";
import {
  Code,
  CheckCircle2,
  Briefcase,
  Zap,
  GraduationCap,
  Award,
  User,
  Mail,
  PenTool,
  ArrowDown,
} from "lucide-react";
import styles from "./AboutView.module.css";
import { cn } from "@/lib/utils";
import { useRef, MouseEvent, useState, useEffect } from "react";

// --- LIBRARIES ---
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { setSectionLabel } from "../hooks/useScrollSpy";
import { useMediaQuery } from "../hooks/useMediaQuery";

// --- COMPONENTS ---
import { Timeline, TimelineType } from "@/components/Timeline";
import { BadgeCard } from "@/components/BadgeCard/BadgeCard";
import { ContactPanel } from "@/components/ContactPanel/ContactPanel";
import { Preloader } from "@/components/Preloader/Preloader";

// ==========================================
// 1. ANIMATION VARIANTS
// ==========================================

// --- HERO: INTRO TEXT (Staggered Lines) ---
const introContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const introLine: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// --- HERO: AVATAR POP ---
const avatarPop: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- SECTIONS: HEADERS ---
const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const lineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const pillVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- SECTIONS: CONTENT GRID ---
const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.12 },
  },
};

const cardVariant: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 15, mass: 1.2 },
  },
};

// ==========================================
// 2. DATA CONSTANTS
// ==========================================
const JOURNEY = [
  {
    year: "2026",
    title: "Housing Agency Co-Founder",
    description:
      "Launched a student housing platform in Nsukka. Merging real-world logistics with a digital-first approach.",
    icon: <Briefcase size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2025",
    title: "DeeCrypt Hub & Web3",
    description:
      "Founded a Web3 educational brand. Technical writing for projects like Ioxa and building community trust.",
    icon: <Zap size={14} />,
    type: "writer" as TimelineType,
  },
  {
    year: "2025",
    title: "NYSC Mobilization",
    description:
      "Batch C Mobilization. Transitioning from academic life to national service while honing frontend craft.",
    icon: <GraduationCap size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2021",
    title: "University of Nigeria",
    description:
      "The Foundation. Physics & Astronomy background that taught me the first principles of complex systems.",
    icon: <PenTool size={14} />,
    type: "dev" as TimelineType,
  },
];

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

export default function AboutView({ mode, onModeChange }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true); // Loading State

  // Typewriter State
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [sequencePhase, setSequencePhase] = useState("cursor");

  // --- TYPEWRITER LOGIC (Only runs after loading) ---
  useEffect(() => {
    if (isLoading) return; // Wait for preloader

    let timeout: NodeJS.Timeout;

    // Helper: Type char by char
    const typeText = (target: string, nextPhase: string, speed = 50) => {
      let i = 0;
      const tick = () => {
        if (i <= target.length) {
          setText(target.slice(0, i));
          i++;
          timeout = setTimeout(tick, speed);
        } else {
          setSequencePhase(nextPhase);
        }
      };
      tick();
    };

    // Helper: Delete char by char
    const deleteText = (nextPhase: string, speed = 30) => {
      let i = text.length;
      const tick = () => {
        if (i >= 0) {
          setText(text.slice(0, i));
          i--;
          timeout = setTimeout(tick, speed);
        } else {
          setSequencePhase(nextPhase);
        }
      };
      tick();
    };

    // --- CINEMATIC SEQUENCE ---
    switch (sequencePhase) {
      case "cursor":
        // 1. Initial Wait (1.5s)
        timeout = setTimeout(() => setSequencePhase("typing1"), 1500);
        break;

      case "typing1":
        // 2. "Welcome."
        typeText("Welcome.", "pause1", 80);
        break;
      case "pause1":
        timeout = setTimeout(() => setSequencePhase("deleting1"), 800);
        break;
      case "deleting1":
        deleteText("typing2");
        break;

      case "typing2":
        // 3. "I'm Gbemi Daniel."
        typeText("I'm Gbemi Daniel.", "pause2", 60);
        break;
      case "pause2":
        timeout = setTimeout(() => setSequencePhase("deleting2"), 1000);
        break;
      case "deleting2":
        deleteText("typing3");
        break;

      case "typing3":
        // 4. "Is it a bug or a feature? Yes."
        typeText("Is it a bug or a feature? Yes.", "pause3", 50);
        break;
      case "pause3":
        timeout = setTimeout(() => setSequencePhase("deleting3"), 1500);
        break;
      case "deleting3":
        deleteText("typing4");
        break;

      case "typing4":
        // 5. "Curating the narrative is the goal."
        typeText("Curating the narrative is the goal.", "pause4", 50);
        break;
      case "pause4":
        timeout = setTimeout(() => setSequencePhase("fading"), 1200);
        break;

      case "fading":
        // 6. Trigger Fade Out
        timeout = setTimeout(() => setSequencePhase("final"), 600);
        break;

      case "final":
        // 7. Show Final Static Header
        setShowCursor(false);
        break;
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequencePhase, isLoading]); // Dependency ensures it starts only when loading finishes

  // --- 3D TILT LOGIC ---
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

  // --- SCROLL SPY ---
  const { ref: heroSpy } = useInView({
    threshold: 0,
    onChange: (v) => v && setSectionLabel(null),
  });
  const { ref: arsenalSpy } = useInView({
    threshold: 0.1,
    onChange: (v) => v && setSectionLabel("THE ARSENAL"),
  });
  const { ref: journeySpy } = useInView({
    threshold: 0.1,
    onChange: (v) => v && setSectionLabel("THE JOURNEY"),
  });
  const { ref: badgesSpy } = useInView({
    threshold: 0.1,
    onChange: (v) => v && setSectionLabel("MILESTONES"),
  });
  const { ref: contactSpy } = useInView({
    threshold: 0.1,
    onChange: (v) => v && setSectionLabel("GET IN TOUCH"),
  });

  // Viewport config for Scroll Animations (Replays allowed)
  const viewConfig = { once: false, amount: isMobile ? 0.2 : 0.3 };

  return (
    <div className={styles.container} data-theme={mode}>
      {/* 1. PRELOADER OVERLAY */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            key="loader" // Critical for unmounting
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT (Rendered only after loading) */}
      {!isLoading && (
        <>
          <div className={styles.fixedBackground} />

          {/* === HERO SECTION === */}
          <section className={styles.heroScreen} ref={heroSpy}>
            <div className={styles.contentWrapper}>
              <motion.div
                className={styles.heroSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }} // Hero animates once after loader
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
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className={styles.statusBadge}
                      >
                        <span className={styles.statusDot} />
                        Open to Work
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* DYNAMIC TEXT CONTAINER */}
                <div className={styles.textContainer}>
                  <AnimatePresence mode="wait">
                    {/* PHASE 1-5: TYPEWRITER */}
                    {sequencePhase !== "final" && (
                      <motion.div
                        key="typewriter"
                        className={styles.codeFont}
                        initial={{ opacity: 1 }}
                        exit={{
                          opacity: 0,
                          filter: "blur(10px)",
                          transition: { duration: 0.5 },
                        }}
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

                    {/* PHASE 6: FINAL STATIC HEADER */}
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

                {/* INTRO TEXT (Appears after sequence) */}
                {sequencePhase === "final" && (
                  <motion.div
                    className={styles.introText}
                    variants={introContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={introLine}>
                      I’m{" "}
                      <strong className="text-foreground">Gbemi Daniel</strong>{" "}
                      (aka <em>Deecrypt</em>).
                    </motion.div>
                    <motion.div variants={introLine}>
                      I sit at the intersection of{" "}
                      <strong>Frontend Engineering</strong>
                    </motion.div>
                    <motion.div variants={introLine}>
                      and <strong>Web3 Storytelling</strong>.
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>

          {/* === ARSENAL === */}
          <section className={styles.flowSection} ref={arsenalSpy}>
            <div className={styles.contentWrapper}>
              <motion.div
                className={styles.sectionHeader}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={headerVariants}
              >
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
                <motion.div
                  variants={pillVariant}
                  className={styles.headerPill}
                >
                  <Code className={styles.headerIcon} />
                  <span>The Arsenal</span>
                </motion.div>
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
              </motion.div>

              <motion.div
                className={styles.gridSection}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div variants={cardVariant} className={styles.skillCard}>
                  <div className={styles.iconBox} data-type="dev">
                    <Code size={24} />
                  </div>
                  <h3>Frontend Dev</h3>
                  <p>
                    Building responsive, accessible, and performant UIs using
                    React, Next.js, and Tailwind CSS.
                  </p>
                </motion.div>
                <motion.div variants={cardVariant} className={styles.skillCard}>
                  <div className={styles.iconBox} data-type="web3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3>Web3 Enthusiast</h3>
                  <p>
                    Exploring the frontier of decentralized apps, airdrops, and
                    blockchain analytics tools.
                  </p>
                </motion.div>
                <motion.div variants={cardVariant} className={styles.skillCard}>
                  <div className={styles.iconBox} data-type="writer">
                    <PenTool size={24} />
                  </div>
                  <h3>Technical Writer</h3>
                  <p>
                    Translating lines of code into compelling human stories.
                    Founder of the <strong>DeeCrypt</strong> brand.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* === JOURNEY === */}
          <section className={styles.flowSection} ref={journeySpy}>
            <div className={styles.contentWrapper}>
              <motion.div
                className={styles.sectionHeader}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={headerVariants}
              >
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
                <motion.div
                  variants={pillVariant}
                  className={cn(styles.headerPill, styles.headerPillWriter)}
                >
                  <User className={styles.headerIcon} />
                  <span>The Journey</span>
                </motion.div>
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div variants={cardVariant}>
                  <Timeline items={JOURNEY} />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* === BADGES === */}
          <section className={styles.flowSection} ref={badgesSpy}>
            <div className={styles.contentWrapper}>
              <motion.div
                className={styles.sectionHeader}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={headerVariants}
              >
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
                <motion.div
                  variants={pillVariant}
                  className={cn(styles.headerPill, styles.headerPillTrophy)}
                >
                  <Award className={styles.headerIcon} />
                  <span>Badges & Milestones</span>
                </motion.div>
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
              </motion.div>

              <motion.div
                className={styles.certGrid}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={contentContainer}
              >
                <motion.div variants={cardVariant}>
                  <BadgeCard
                    type="dev"
                    title="Google Developer Profile"
                    subtitle="Gemini for Software Development Lifecycle"
                    date="2025"
                    status="Completed"
                    link="https://g.dev/your-profile"
                    icon={<Code size={28} color="var(--accent)" />}
                  />
                </motion.div>
                <motion.div variants={cardVariant}>
                  <BadgeCard
                    type="writer"
                    title="DeeCrypt Hub"
                    subtitle="Founder & Lead Writer"
                    date="2025"
                    status="Completed"
                    link="https://twitter.com/deecrypthub"
                    icon={<Zap size={28} color="#a855f7" />}
                  />
                </motion.div>
                <motion.div variants={cardVariant}>
                  <BadgeCard
                    type="dev"
                    title="Frontend Mastery"
                    subtitle="Advanced React Patterns"
                    date="In Progress"
                    status="In Progress"
                    link="#"
                    icon={<Code size={28} color="var(--accent)" />}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* === CONTACT === */}
          <section className={styles.flowSection} ref={contactSpy}>
            <div className={styles.contentWrapper}>
              <motion.div
                className={styles.sectionHeader}
                initial="hidden"
                whileInView="visible"
                viewport={viewConfig}
                variants={headerVariants}
              >
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
                <motion.div
                  variants={pillVariant}
                  className={cn(styles.headerPill, styles.headerPillContact)}
                >
                  <Mail className={styles.headerIcon} />
                  <span>Get In Touch</span>
                </motion.div>
                <motion.div
                  variants={lineVariant}
                  className={styles.headerLine}
                />
              </motion.div>
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
