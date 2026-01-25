import type { Mode } from "../app/modes";
import { useMemo, useState, CSSProperties } from "react";
import ModeToggle from "../components/ModeToggle/ModeToggle";
import Hero from "../components/Hero/Hero";
import ModuleGrid from "../components/ModuleGrid/ModuleGrid";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import Tag from "../components/Tag/Tag";
import WriterCarousel from "../components/WriterCarousel/WriterCarousel";
import WriterDialog from "../components/WriterDialog/WriterDialog";
import { posts } from "../data/posts";
import styles from "./WriterView.module.css";
// Added Icons
import { BookOpen, Newspaper, X, Linkedin } from "lucide-react";

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

// Platform Data with Brand Colors
const PLATFORMS = [
  {
    id: "twitter",
    href: "https://x.com/",
    label: "X (Twitter)",
    icon: <X size={14} />,
    color: "#ffffff", // White (Dark Mode) / Black (Light Mode)
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/",
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    color: "#0a66c2", // LinkedIn Blue
  },
  {
    id: "mirror",
    href: "https://mirror.xyz/",
    label: "Mirror",
    icon: <BookOpen size={14} />,
    color: "#3898FF", // Mirror Blue
  },
  {
    id: "medium",
    href: "https://medium.com/",
    label: "Medium",
    icon: <Newspaper size={14} />,
    color: "#FFC017", // Medium Gold
  },
];

export default function WriterView({ mode, onModeChange }: Props) {
  const [activePostId, setActivePostId] = useState(posts[0]?.id);
  const [open, setOpen] = useState(false);

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) ?? posts[0],
    [activePostId],
  );

  return (
    <>
      <Hero
        availabilityLabel="WRITING"
        headlineTop="Writing in"
        headlineBottom="public, on purpose."
        subcopy="Essays, threads, and notes about frontend clarity, Web3 UX, learning, and building in the open."
        modeToggleSlot={<ModeToggle mode={mode} onChange={onModeChange} />}
      />

      <ModuleGrid
        left={
          <WriterCarousel
            items={posts}
            activeId={activePostId}
            onActiveIdChange={setActivePostId}
            onOpen={() => setOpen(true)}
          />
        }
        rightTop={
          <ModuleCard
            title="Topics"
            subtitle="Themes I keep circling back to."
            icon={BookOpen}
            footer={
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
        }
        /* --- REFINED PLATFORM BADGES --- */
        rightBottom={
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
                    // Pass color to CSS variable for the hover glow
                    style={{ "--badge-color": p.color } as CSSProperties}
                  >
                    <span className={styles.platformIcon}>{p.icon}</span>
                    {p.label}
                  </a>
                ))}
              </div>
            }
          />
        }
      />

      <WriterDialog
        open={open}
        post={activePost}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
