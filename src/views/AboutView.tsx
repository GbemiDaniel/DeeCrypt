import {
  Code,
  PenTool,
  CheckCircle2,
  Briefcase,
  Zap,
  GraduationCap,
} from "lucide-react";
import styles from "./AboutView.module.css";
import { cn } from "@/lib/utils";

// --- IMPORT YOUR NEW COMPONENTS ---
import { Timeline, TimelineType } from "@/components/Timeline";
import { BadgeCard } from "@/components/BadgeCard/BadgeCard";
import { ContactPanel } from "@/components/ContactPanel/ContactPanel";
import { useInView } from "@/hooks/useInView";

// --- FADE IN HELPER ---
const FadeIn = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(styles.reveal, isInView && styles.visible, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- DATA: TIMELINE ---
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

export default function AboutView() {
  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <FadeIn>
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
        </FadeIn>

        <FadeIn delay={200}>
          <h1 className={styles.headline}>
            Crafting Logic. <br />
            <span className={styles.gradientText}>Curating Narratives.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p className={styles.introText}>
            I’m <strong>Gbemi Daniel</strong> (aka <em>Deecrypt</em>). I sit at
            the intersection of <strong>Frontend Engineering</strong> and{" "}
            <strong>Web3 Storytelling</strong>. I build pixel-perfect interfaces
            by day and simplify complex crypto concepts by night.
          </p>
        </FadeIn>
      </section>

      {/* SKILL GRID (Using ModuleCard Styles from CSS Module) */}
      <section className={styles.gridSection}>
        <FadeIn delay={100}>
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
        </FadeIn>

        <FadeIn delay={200}>
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
        </FadeIn>

        <FadeIn delay={300}>
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
        </FadeIn>
      </section>

      {/* TIMELINE SECTION (New Component) */}
      <section className={styles.timelineSection}>
        <FadeIn>
          <h2
            className={styles.sectionTitle}
            style={{ justifyContent: "center" }}
          >
            The Journey
          </h2>
        </FadeIn>

        {/* Timeline has internal animations, so no FadeIn wrapper needed */}
        <Timeline items={JOURNEY} />
      </section>

      {/* BADGES SECTION (New Component) */}
      <section className={styles.certSection}>
        <FadeIn>
          <h2 className={styles.sectionTitle}>Badges & Milestones</h2>
        </FadeIn>

        <div className={styles.certGrid}>
          <FadeIn delay={100}>
            <BadgeCard
              type="dev"
              title="Google Developer Profile"
              subtitle="Gemini for Software Development Lifecycle"
              date="2025"
              status="Completed"
              link="https://g.dev/your-profile"
              // Fallback icon since we might not have images yet
              icon={<Code size={28} color="var(--accent)" />}
            />
          </FadeIn>

          <FadeIn delay={200}>
            <BadgeCard
              type="writer"
              title="DeeCrypt Hub"
              subtitle="Founder & Lead Writer for Web3 Education"
              date="2025"
              status="Completed"
              link="https://twitter.com/deecrypthub"
              icon={<Zap size={28} color="#a855f7" />}
            />
          </FadeIn>

          <FadeIn delay={300}>
            <BadgeCard
              type="dev"
              title="Frontend Mastery"
              subtitle="Advanced React Patterns & Performance"
              date="In Progress"
              status="In Progress"
              link="#"
              icon={<Code size={28} color="var(--accent)" />}
            />
          </FadeIn>
        </div>
      </section>

      {/* CTA SECTION (New Component) */}
      <section className={styles.ctaSection}>
        <FadeIn>
          <ContactPanel
            email="your-email@example.com"
            resumeUrl="/resume.pdf"
            socials={{
              github: "https://github.com/yourusername",
              twitter: "https://twitter.com/yourusername",
              linkedin: "https://linkedin.com/in/yourusername",
            }}
          />
        </FadeIn>
      </section>
    </div>
  );
}
