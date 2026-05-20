import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { setSectionLabel, SPY_CONFIG } from "../hooks/useScrollSpy";

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
  Linkedin,
  PenTool,
  TerminalSquare,
} from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";

const PLATFORMS = [
  {
    id: "linkedin",
    href: siteConfig.socials.linkedin,
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    color: "#0a66c2",
  },
  {
    id: "medium",
    href: siteConfig.socials.medium,
    label: "Medium",
    icon: <Newspaper size={14} />,
    color: "#FFC017",
  },
  {
    id: "devto",
    href: siteConfig.socials.medium,
    label: "Dev.to",
    icon: <TerminalSquare size={14} />,
    color: "#000000",
  },
  {
    id: "twitter",
    href: siteConfig.socials.twitter,
    label: " ",
    icon: <XIcon size={14} />,
    color: "#ffffff",
  },
];

export default function WriterView() {
  const [activePostId, setActivePostId] = useState(posts[0]?.id);
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  const { ref: ctaSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (inView) => inView && setSectionLabel("CONNECT"),
  });

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) ?? posts[0],
    [activePostId],
  );

  return (
    <div className={styles.writerScope}>
      <div ref={heroRef}>
        <Hero
          key="writer"
          mode="writer"
          availabilityLabel="WRITING"
          headlineTop={
            <>
              <span className={heroStyles.writerHighlight}>Writing</span> in
            </>
          }
          headlineBottom={
            <>
              public, <span className={heroStyles.writerHighlight}>on purpose.</span>
            </>
          }
          subcopy={
            <>
              Thoughts on building, design decisions, emerging technology, and
              creating{" "}
              <span className={heroStyles.writerHighlight}>
                digital experiences that feel intentional
              </span>
              .
            </>
          }
          modeToggleSlot={<ModeToggle />}
        />
      </div>

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
                variant="writer"
                title="Field Notes"
                subtitle="Ideas & concepts shaping how i build."
                icon={BookOpen}
                footer={
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      "Interface Design",
                      "Product Systems",
                      "Emerging Tech",
                      "Web3",
                      "Creative Process",
                      "Builder Notes",
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
                variant="writer"
                title="Published Across"
                subtitle="Places I write and share."
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

      <div ref={ctaSpy}>
        <MinimalCTA
          icon={PenTool}
          title="Builder Notes"
          subtitle="Thoughts, lessons, and ideas from the process of creating digital experiences."
          primaryAction={{
            label: "Read More",
            href: siteConfig.socials.medium,
            icon: BookOpen,
          }}
          secondaryAction={{
            label: "Follow Along",
            href: siteConfig.socials.twitter,
            icon: XIcon,
          }}
        />
      </div>
    </div>
  );
}