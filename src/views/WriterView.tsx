import type { Mode } from "../app/modes";
import { useMemo, useState } from "react";
import ModeToggle from "../components/ModeToggle/ModeToggle";
import Hero from "../components/Hero/Hero";
import ModuleGrid from "../components/ModuleGrid/ModuleGrid";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import MiniIcon from "../components/MiniIcon/MiniIcon";
import Tag from "../components/Tag/Tag";
import WriterCarousel from "../components/WriterCarousel/WriterCarousel";
import WriterDialog from "../components/WriterDialog/WriterDialog";
import { posts } from "../data/posts";

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

export default function WriterView({ mode, onModeChange }: Props) {
  const [activePostId, setActivePostId] = useState(posts[0]?.id);
  const [open, setOpen] = useState(false);

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) ?? posts[0],
    [activePostId]
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
            icon={<MiniIcon variant="accent2" />}
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
        rightBottom={
          <ModuleCard
            title="Platforms"
            subtitle="Where I publish and share."
            icon={<MiniIcon variant="accent" />}
            footer={
              <div style={{ display: "grid", gap: 10, color: "var(--muted)" }}>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>X (Twitter)</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://mirror.xyz/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Mirror</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://medium.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Medium</span>
                  <span>↗</span>
                </a>
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
