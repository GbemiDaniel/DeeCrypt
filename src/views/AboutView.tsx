import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import styles from "./AboutView.module.css";
import { cn } from "@/lib/utils"; // Assuming you have this, or just use template literals

// --- REUSABLE ANIMATION WRAPPER ---
// This handles the "Fade Up" effect when elements scroll into view
const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.reveal, isVisible && styles.visible)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function AboutView() {
  return (
    <div className={styles.container}>
      {/* --- HERO SECTION: THE HOOK --- */}
      <section className={styles.heroSection}>
        <Reveal>
          <div className={styles.avatarWrapper}>
            {/* Replace with your actual Avatar path */}
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
        </Reveal>

        <Reveal delay={200}>
          <h1 className={styles.headline}>
            Crafting Logic. <br />
            <span className={styles.gradientText}>Curating Narratives.</span>
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p className={styles.introText}>
            I’m <strong>Gbemi Daniel</strong> (aka <em>Deecrypt</em>). I sit at
            the intersection of <strong>Frontend Engineering</strong> and{" "}
            <strong>Web3 Storytelling</strong>. I build pixel-perfect interfaces
            by day and simplify complex crypto concepts by night.
          </p>
        </Reveal>
      </section>

      {/* --- THE TRINITY: FRONTEND | WEB3 | WRITING --- */}
      <section className={styles.gridSection}>
        <Reveal delay={100}>
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
        </Reveal>

        <Reveal delay={200}>
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
        </Reveal>

        <Reveal delay={300}>
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
        </Reveal>
      </section>

      {/* --- BADGES & CERTIFICATES --- */}
      <section className={styles.certSection}>
        <Reveal>
          <h2 className={styles.sectionTitle}>
            <Award className={styles.sectionIcon} />
            Badges & Milestones
          </h2>
        </Reveal>

        <div className={styles.certGrid}>
          {/* Example Badge 1 */}
          <Reveal delay={100}>
            <div className={styles.certCard}>
              <div className={styles.certDate}>2025</div>
              <h4>Google Developer Profile</h4>
              <p>Gemini for Software Development Lifecycle</p>
              <span className={styles.badgePill}>Completed</span>
            </div>
          </Reveal>

          {/* Example Badge 2 (Placeholder) */}
          <Reveal delay={200}>
            <div className={styles.certCard}>
              <div className={styles.certDate}>In Progress</div>
              <h4>Frontend Mastery</h4>
              <p>Advanced React Patterns & Performance</p>
              <span className={`${styles.badgePill} ${styles.pillOngoing}`}>
                Loading...
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- CALL TO ACTION (HIRE ME) --- */}
      <section className={styles.ctaSection}>
        <Reveal>
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
        </Reveal>
      </section>
    </div>
  );
}
