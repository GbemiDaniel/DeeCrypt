import {
  Download,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Award,
  Code,
  PenTool,
  CheckCircle2,
  Briefcase,
  Zap,
  GraduationCap,
} from "lucide-react";
import styles from "./AboutView.module.css";
import { cn } from "@/lib/utils";
import { Timeline } from "@/components/Timeline";
import { useInView } from "@/hooks/useInView"; // <--- Importing your new lightweight hook

// --- 1. THE LIGHTWEIGHT WRAPPER ---
// This replaces the old "Reveal" component.
// It uses your custom hook to keep things efficient.
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
      className={cn(
        styles.reveal, // Base opacity: 0, transform: translateY
        isInView && styles.visible, // Active state
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- 2. DATA CONSTANTS ---
const JOURNEY = [
  {
    year: "2026",
    title: "Housing Agency Co-Founder",
    description:
      "Launched a student housing platform in Nsukka with my brother. Merging real-world logistics with a digital-first approach to solve accommodation issues.",
    icon: <Briefcase size={14} />,
  },
  {
    year: "2025",
    title: "DeeCrypt Hub & Web3",
    description:
      "Founded a Web3 educational brand. Specializing in Technical Writing for projects like Ioxa and building community trust through simplified narratives.",
    icon: <Zap size={14} />,
  },
  {
    year: "2025",
    title: "NYSC Mobilization",
    description:
      "Batch C Mobilization. A pivotal transition period from academic life to national service, while simultaneously honing my frontend craft.",
    icon: <GraduationCap size={14} />,
  },
  {
    year: "2021",
    title: "University of Nigeria",
    description:
      "The Foundation. Physics & Astronomy background that taught me the first principles of complex systems and logical reasoning.",
    icon: <PenTool size={14} />,
  },
];

// --- 3. MAIN COMPONENT ---
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

      {/* SKILL GRID */}
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

      {/* TIMELINE SECTION */}
      <section className={styles.timelineSection}>
        <FadeIn>
          <h2
            className={styles.sectionTitle}
            style={{ justifyContent: "center" }}
          >
            The Journey
          </h2>
        </FadeIn>

        {/* REMOVE <FadeIn> WRAPPER HERE. Just use the component directly. */}
        {/* The Timeline handles its own animation now. */}
        <Timeline items={JOURNEY} />
      </section>

      {/* CERTIFICATES */}
      <section className={styles.certSection}>
        <FadeIn>
          <h2 className={styles.sectionTitle}>
            <Award className={styles.sectionIcon} />
            Badges & Milestones
          </h2>
        </FadeIn>

        <div className={styles.certGrid}>
          <FadeIn delay={100}>
            <div className={styles.certCard}>
              <div className={styles.certDate}>2025</div>
              <h4>Google Developer Profile</h4>
              <p>Gemini for Software Development Lifecycle</p>
              <span className={styles.badgePill}>Completed</span>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className={styles.certCard}>
              <div className={styles.certDate}>In Progress</div>
              <h4>Frontend Mastery</h4>
              <p>Advanced React Patterns & Performance</p>
              <span className={`${styles.badgePill} ${styles.pillOngoing}`}>
                Loading...
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <FadeIn>
          <div className={styles.glassPanel}>
            <h2>Ready to build something legendary?</h2>
            <p>
              Whether you need a frontend architect for your next SaaS or a
              technical writer to give your Web3 project a voice, I'm just one
              click away.
            </p>

            <div className={styles.actionButtons}>
              <a
                href="mailto:your-email@example.com"
                className={styles.primaryBtn}
              >
                <Mail size={18} />
                Hire Me / Collaborate
              </a>

              <a href="/resume.pdf" download className={styles.secondaryBtn}>
                <Download size={18} />
                Download CV
              </a>
            </div>

            <div className={styles.socialRow}>
              <a href="#" className={styles.socialIcon} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
