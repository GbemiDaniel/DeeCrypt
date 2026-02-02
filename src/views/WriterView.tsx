import type { Mode } from "../app/modes";
import { useMemo, useState, CSSProperties } from "react";

// 1. IMPORTS FOR SCROLL SPY & PRELOADER
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { setSectionLabel } from "../hooks/useScrollSpy";
import { AnimatePresence } from "framer-motion"; // <--- NEW IMPORT
import { Preloader } from "@/components/Preloader/Preloader"; // <--- NEW IMPORT

import ModeToggle from "../components/ModeToggle/ModeToggle";
import Hero from "../components/Hero/Hero";
import ModuleGrid from "../components/ModuleGrid/ModuleGrid";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import Tag from "../components/Tag/Tag";
import WriterCarousel from "../components/WriterCarousel/WriterCarousel";
import WriterDialog from "../components/WriterDialog/WriterDialog";
import { posts } from "../data/posts";
import styles from "./WriterView.module.css";
import heroStyles from "../components/Hero/Hero.module.css";
import { BookOpen, Newspaper, X, Linkedin } from "lucide-react";

// 2. SPY CONFIGURATION
const SPY_CONFIG = {
  threshold: 0,
  rootMargin: "-45% 0px -45% 0px",
  triggerOnce: false,
  delay: 100,
};

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

const PLATFORMS = [
  {
    id: "twitter",
    href: "https://x.com/",
    label: "X (Twitter)",
    icon: <X size={14} />,
    color: "#ffffff",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/",
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    color: "#0a66c2",
  },
  {
    id: "mirror",
    href: "https://mirror.xyz/",
    label: "Mirror",
    icon: <BookOpen size={14} />,
    color: "#3898FF",
  },
  {
    id: "medium",
    href: "https://medium.com/",
    label: "Medium",
    icon: <Newspaper size={14} />,
    color: "#FFC017",
  },
];

export default function WriterView({ mode, onModeChange }: Props) {
  // --- LOADING STATE ---
  const [isLoading, setIsLoading] = useState(true); // <--- NEW STATE

  const [activePostId, setActivePostId] = useState(posts[0]?.id);
  const [open, setOpen] = useState(false);

  // 3. DETECT LAYOUT
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // --- DESKTOP OBSERVER ---
  const { ref: desktopGridRef } = useInView({
    ...SPY_CONFIG,
    skip: !isDesktop,
    onChange: (inView) => {
      if (inView && isDesktop) setSectionLabel("NOTES & TOPICS");
    },
  });

  // --- MOBILE OBSERVERS ---
  const { ref: mobileNotesRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => {
      if (inView && !isDesktop) setSectionLabel("LATEST NOTES");
    },
  });

  const { ref: mobileTopicsRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => {
      if (inView && !isDesktop) setSectionLabel("TOPICS");
    },
  });

  const { ref: mobilePlatformRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => {
      if (inView && !isDesktop) setSectionLabel("PLATFORMS");
    },
  });

  // --- HERO OBSERVER ---
  const { ref: heroRef } = useInView({
    threshold: 0,
    rootMargin: "-10% 0px -90% 0px",
    onChange: (inView) => {
      if (inView) setSectionLabel(null); // Reset to "Dev | Writer"
    },
  });

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) ?? posts[0],
    [activePostId],
  );

  return (
    <div className={styles.writerScope}>
      {/* 1. LOADING OVERLAY */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT */}
      {!isLoading && (
        <>
          <div ref={heroRef}>
            <Hero
              availabilityLabel="WRITING"
              headlineTop="Writing in"
              headlineBottom={
                <>
                  <span className={heroStyles.writerHighlight}>public</span>, on
                  purpose.
                </>
              }
              subcopy={
                <>
                  Essays, threads, and notes about frontend clarity, Web3 UX,
                  learning, and{" "}
                  <span className={heroStyles.writerHighlight}>
                    building in the open
                  </span>
                  .
                </>
              }
              modeToggleSlot={
                <ModeToggle mode={mode} onChange={onModeChange} />
              }
            />
          </div>

          {/* 4. ATTACH REFS */}
          <div ref={isDesktop ? desktopGridRef : undefined}>
            <ModuleGrid
              left={
                <div
                  ref={!isDesktop ? mobileNotesRef : undefined}
                  style={{ height: "100%" }}
                >
                  <WriterCarousel
                    items={posts}
                    activeId={activePostId}
                    onActiveIdChange={setActivePostId}
                    onOpen={() => setOpen(true)}
                  />
                </div>
              }
              rightTop={
                <div
                  ref={!isDesktop ? mobileTopicsRef : undefined}
                  style={{ height: "100%" }}
                >
                  <ModuleCard
                    title="Topics"
                    subtitle="Themes I keep circling back to."
                    icon={BookOpen}
                    footer={
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {[
                          "UI clarity",
                          "Frontend systems",
                          "Web3 UX",
                          "Writing craft",
                          "Learning notes",
                          "Product thinking",
                        ].map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    }
                  />
                </div>
              }
              rightBottom={
                <div
                  ref={!isDesktop ? mobilePlatformRef : undefined}
                  style={{ height: "100%" }}
                >
                  <ModuleCard
                    title="Platforms"
                    subtitle="Where I publish and share."
                    icon={Newspaper}
                    footer={
                      <div className={styles.platformContainer}>
                        {PLATFORMS.map((p) => (
                          <a
                            key={p.id}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.platformBadge}
                            style={
                              { "--badge-color": p.color } as CSSProperties
                            }
                          >
                            <span className={styles.platformIcon}>
                              {p.icon}
                            </span>
                            {p.label}
                          </a>
                        ))}
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>

          <WriterDialog
            open={open}
            post={activePost}
            onClose={() => setOpen(false)}
          />
        </>
      )}
    </div>
  );
}
