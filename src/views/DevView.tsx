import type { Mode } from "../app/modes";
import { useMemo, useState } from "react";

import ModeToggle from "../components/ModeToggle/ModeToggle";
import Hero from "../components/Hero/Hero";
import ModuleGrid from "../components/ModuleGrid/ModuleGrid";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import MiniIcon from "../components/MiniIcon/MiniIcon";
import Tag from "../components/Tag/Tag";

import PreviewCarousel, {
  type PreviewCarouselProps,
} from "../components/PreviewCarousel/PreviewCarousel";
import PreviewDialog from "../components/PreviewDialog/PreviewDialog";

import { projects, type Project } from "../data/projects";

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DevView({ mode, onModeChange }: Props) {
  const [activeProject, setActiveProject] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);

  // ✅ Always safe
  const active: Project | undefined = useMemo(() => {
    if (projects.length === 0) return undefined;
    const safe = clamp(activeProject, 0, projects.length - 1);
    return projects[safe];
  }, [activeProject]);

  // ✅ Best practice: typed props object (prevents prop drift forever)
  const carouselProps: PreviewCarouselProps = useMemo(
    () => ({
      items: projects.map((p) => ({
        ...p,
        icon: p.icon ?? <MiniIcon variant="accent" />, // default icon if missing
      })),
      onOpen: (item) => {
        const idx = projects.findIndex((p) => p.id === item.id);
        setActiveProject(idx === -1 ? 0 : idx);
        setOpenPreview(true);
      },
    }),
    [projects]
  );

  return (
    <>
      <Hero
        key={mode}
        mode={mode}
        availabilityLabel="AVAILABLE FOR HIRE"
        headlineTop="Welcome"
        headlineBottom="I'm Gbemi Daniel"
        subcopy="I’m a front-end developer building for the modern web and the decentralized future.
I focus on simplifying features and interactions so digital products feel clear, intuitive, and accessible."
        modeToggleSlot={<ModeToggle mode={mode} onChange={onModeChange} />}
      />

      <ModuleGrid
        left={<PreviewCarousel {...carouselProps} />}
        rightTop={
          <ModuleCard
            title="Open Source"
            subtitle="Things I build and contribute to."
            icon={<MiniIcon variant="accent2" />}
            footer={
              <div style={{ display: "grid", gap: 10, color: "var(--muted)" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>ui-kit</span>
                  <span>4.2k ★</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>wallet-hooks</span>
                  <span>892 ★</span>
                </div>
              </div>
            }
          />
        }
        rightBottom={
          <ModuleCard
            title="Stack"
            subtitle="Tools I’m building with (and growing into)."
            icon={<MiniIcon variant="accent" />}
            footer={
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "React",
                  "TypeScript",
                  "CSS Modules",
                  "Vite",
                  "Tailwind (learning)",
                  "shadcn/ui (learning)",
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            }
          />
        }
      />

      <PreviewDialog
        open={openPreview}
        title={active?.title ?? "Preview"}
        imageSrc={active?.previewImage}
        description={active?.descriptionLong ?? active?.subtitle}
        meta={active?.meta}
        primaryHref={active?.links?.primary?.href}
        primaryLabel={active?.links?.primary?.label}
        secondaryHref={active?.links?.secondary?.href}
        secondaryLabel={active?.links?.secondary?.label}
        onClose={() => setOpenPreview(false)}
      />
    </>
  );
}
