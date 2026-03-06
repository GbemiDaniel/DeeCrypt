
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

// 1. IMPORTS
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "../hooks/useMediaQuery";
// === FIX: Import the shared config here ===
import { setSectionLabel, SPY_CONFIG } from "../hooks/useScrollSpy";
import { motion } from "framer-motion";

import ModeToggle from "../components/ModeToggle/ModeToggle";
import Hero from "../components/Hero/Hero";
import ModuleGrid from "../components/ModuleGrid/ModuleGrid";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import Tag from "../components/Tag/Tag";
import WriterCarousel from "../components/WriterCarousel/WriterCarousel";
import WriterDialog from "../components/WriterDialog/WriterDialog";
import { MinimalCTA } from "@/components/MinimalCTA/MinimalCTA";
import { siteConfig } from "@/config/site";

import { featuredPosts as posts } from "../data/featuredPosts";
import styles from "./WriterView.module.css";
import heroStyles from "../components/Hero/Hero.module.css";
import {
  BookOpen,
  Newspaper,
  X,
  Linkedin,
  PenTool,
  Twitter,
  Mail,
  TerminalSquare,
} from "lucide-react";

// === DELETED: Local SPY_CONFIG (Now using the shared one) ===

const PLATFORMS = [
  {
    id: "twitter",
    href: siteConfig.socials.twitter,
    label: "X (Twitter)",
    icon: <X size={14} />,
    color: "#ffffff",
  },
  {
    id: "linkedin",
    href: siteConfig.socials.linkedin,
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    color: "#0a66c2",
  },
  {
    id: "devto",
    href: siteConfig.socials.medium, // Using medium as fallback for now
    label: "DevTo",
    icon: <TerminalSquare size={14} />,
    color: "#000000",
  },
  {
    id: "medium",
    href: siteConfig.socials.medium,
    label: "Medium",
    icon: <Newspaper size={14} />,
    color: "#FFC017",
  },
];

export default function WriterView() {

  const [activePostId, setActivePostId] = useState(posts[0]?.id);
  const [open, setOpen] = useState(false);

  // 3. DETECT LAYOUT
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // --- OBSERVERS ---
  // All hooks now use the imported SPY_CONFIG (250ms delay)
  const { ref: heroRef } = useInView({
    ...SPY_CONFIG,
    onChange: (inView) => inView && setSectionLabel(null),
  });

  const { ref: desktopGridRef } = useInView({
    ...SPY_CONFIG,
    skip: !isDesktop,
    onChange: (inView) =>
      inView && isDesktop && setSectionLabel("NOTES & TOPICS"),
  });

  const { ref: mobileNotesRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) =>
      inView && !isDesktop && setSectionLabel("LATEST NOTES"),
  });

  const { ref: mobileTopicsRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => inView && !isDesktop && setSectionLabel("TOPICS"),
  });

  const { ref: mobilePlatformRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => inView && !isDesktop && setSectionLabel("PLATFORMS"),
  });

  // --- CTA OBSERVER ---
  const { ref: ctaSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (inView) => inView && setSectionLabel("CONNECT"),
  });

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) ?? posts[0],
    [activePostId],
  );

  return (
    <motion.div
      className={styles.writerScope}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div ref={heroRef}>
        <Hero
          key="writer"
          mode="writer"
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
            <ModeToggle />
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
                subtitle="Where I publish."
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

      {/* 5. MINIMAL CTA */}
      <div ref={ctaSpy}>
        <MinimalCTA
          icon={PenTool}
          title="DeeCrypt / Q2 2026"
          description="Simplifying blockchain tech through clarity."
          primaryAction={{
            label: "Follow Updates",
            href: siteConfig.socials.secondaryTwitter,
            icon: Twitter,
          }}
          secondaryAction={{
            label: "Get Notified",
            href: `mailto:${siteConfig.email}`,
            icon: Mail,
          }}
        />
      </div>
    </motion.div>
  );
}
