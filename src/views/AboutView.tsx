import type { Mode } from "../app/modes";
import {
  Code,
  PenTool,
  CheckCircle2,
  Briefcase,
  Zap,
  GraduationCap,
  Award,
  User,
  Mail,
} from "lucide-react";
import styles from "./AboutView.module.css";
import { cn } from "@/lib/utils";

// --- COMPONENTS ---
import { Timeline, TimelineType } from "@/components/Timeline";
import { BadgeCard } from "@/components/BadgeCard/BadgeCard";
import { ContactPanel } from "@/components/ContactPanel/ContactPanel";

// --- DATA ---
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
  return (
    // Pass mode to data-theme so CSS variables update
    <div className={styles.container} data-theme={mode}>
      {/* FIXED BACKGROUND */}
      <div className={styles.fixedBackground} />

      {/* 1. HERO SCREEN (Original Layout Restored) */}
      <section className={styles.heroScreen}>
        <div className={styles.contentWrapper}>
          <div className={styles.heroSection}>
            <div className={styles.avatarWrapper}>
              <img
                src="/logos/D logo 120 x 120.png"
                alt="Gbemi Daniel"
                className={styles.avatar}
              />
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                Open to Work
              </div>
            </div>

            <h1 className={styles.headline}>
              Crafting Logic. <br />
              <span className={cn(styles.metalText, styles.glowWriter)}>
                Curating Narratives.
              </span>
            </h1>

            <p className={styles.introText}>
              I’m{" "}
              <strong className={cn(styles.metalText, styles.glowDev)}>
                Gbemi Daniel
              </strong>{" "}
              (aka{" "}
              <em className={cn(styles.metalText, styles.glowWriter)}>
                Deecrypt
              </em>
              ). I sit at the intersection of{" "}
              <strong>Frontend Engineering</strong> and{" "}
              <strong>Web3 Storytelling</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SKILLS (Flow Scroll) */}
      <section className={styles.flowSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLine} />
            <div className={styles.headerPill}>
              <Code className={styles.headerIcon} />
              <span>The Arsenal</span>
            </div>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.gridSection}>
            <div className={styles.skillCard}>
              <div className={styles.iconBox} data-type="dev">
                <Code size={24} />
              </div>
              <h3>Frontend Dev</h3>
              <p>
                Building responsive, accessible, and performant UIs using React,
                Next.js, and Tailwind CSS.
              </p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.iconBox} data-type="web3">
                <CheckCircle2 size={24} />
              </div>
              <h3>Web3 Enthusiast</h3>
              <p>
                Exploring the frontier of decentralized apps, airdrops, and
                blockchain analytics tools.
              </p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.iconBox} data-type="writer">
                <PenTool size={24} />
              </div>
              <h3>Technical Writer</h3>
              <p>
                Translating lines of code into compelling human stories. Founder
                of the <strong>DeeCrypt</strong> brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOURNEY (Flow Scroll) */}
      <section className={styles.flowSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLine} />
            <div className={cn(styles.headerPill, styles.headerPillWriter)}>
              <User className={styles.headerIcon} />
              <span>The Journey</span>
            </div>
            <div className={styles.headerLine} />
          </div>

          <Timeline items={JOURNEY} />
        </div>
      </section>

      {/* 4. BADGES (Flow Scroll) */}
      <section className={styles.flowSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLine} />
            <div className={cn(styles.headerPill, styles.headerPillTrophy)}>
              <Award className={styles.headerIcon} />
              <span>Badges & Milestones</span>
            </div>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.certGrid}>
            <BadgeCard
              type="dev"
              title="Google Developer Profile"
              subtitle="Gemini for Software Development Lifecycle"
              date="2025"
              status="Completed"
              link="https://g.dev/your-profile"
              icon={<Code size={28} color="var(--accent)" />}
            />
            <BadgeCard
              type="writer"
              title="DeeCrypt Hub"
              subtitle="Founder & Lead Writer for Web3 Education"
              date="2025"
              status="Completed"
              link="https://twitter.com/deecrypthub"
              icon={<Zap size={28} color="#a855f7" />}
            />
            <BadgeCard
              type="dev"
              title="Frontend Mastery"
              subtitle="Advanced React Patterns & Performance"
              date="In Progress"
              status="In Progress"
              link="#"
              icon={<Code size={28} color="var(--accent)" />}
            />
          </div>
        </div>
      </section>

      {/* 5. CONTACT (Flow Scroll) */}
      <section className={styles.flowSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLine} />
            <div className={cn(styles.headerPill, styles.headerPillContact)}>
              <Mail className={styles.headerIcon} />
              <span>Get In Touch</span>
            </div>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.ctaSection}>
            <ContactPanel
              email="your-email@example.com"
              resumeUrl="/resume.pdf"
              socials={{
                github: "https://github.com/yourusername",
                twitter: "https://twitter.com/yourusername",
                linkedin: "https://linkedin.com/in/yourusername",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
