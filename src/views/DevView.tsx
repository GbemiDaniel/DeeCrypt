import type { Mode } from "../app/modes";
import { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { setSectionLabel } from "../hooks/useScrollSpy";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/Preloader/Preloader";

import ModeToggle from "../components/ModeToggle/ModeToggle";
import Hero from "../components/Hero/Hero";
import ModuleGrid from "../components/ModuleGrid/ModuleGrid";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import MiniIcon from "../components/MiniIcon/MiniIcon";
import SkillBadge from "../components/SkillBadge/SkillBadge";
import PreviewCarousel, {
  type PreviewCarouselProps,
} from "../components/PreviewCarousel/PreviewCarousel";
import PreviewDialog from "../components/PreviewDialog/PreviewDialog";
import { MinimalCTA } from "@/components/MinimalCTA/MinimalCTA";
import { sideProjects } from "../data/sidequests";
import { projects, type Project } from "../data/projects";
import { SideQuestCard } from "@/components/SideQuest/SideQuestCard";
import { Rocket, Layers2, Terminal, Mail, FileText } from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiSupabase,
  SiFramer,
} from "react-icons/si";

const TECH_STACK = [
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "Next.js", color: "#FFFFFF", icon: SiNextdotjs },
  { name: "Tailwind", color: "#06B6D4", icon: SiTailwindcss },
  { name: "Supabase", color: "#3ECF8E", icon: SiSupabase },
  { name: "Framer", color: "#0055FF", icon: SiFramer },
];

// === PERFORMANCE FIX: INCREASED DELAY ===
const SPY_CONFIG = {
  threshold: 0,
  rootMargin: "-45% 0px -45% 0px",
  triggerOnce: false,
  // 250ms delay means the Navbar only updates AFTER you stop scrolling vigorously.
  // This saves the CPU from re-rendering the header 60 times a second.
  delay: 250,
};

type Props = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DevView({ mode, onModeChange }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { ref: heroRef } = useInView({
    ...SPY_CONFIG,
    onChange: (inView) => inView && setSectionLabel(null),
  });

  const { ref: desktopGridRef } = useInView({
    ...SPY_CONFIG,
    skip: !isDesktop,
    onChange: (inView) =>
      inView && isDesktop && setSectionLabel("PROJECTS & STACK"),
  });

  const { ref: mobileProjectsRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) =>
      inView && !isDesktop && setSectionLabel("MY PROJECTS"),
  });

  const { ref: mobileSideQuestRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) =>
      inView && !isDesktop && setSectionLabel("SIDE QUESTS"),
  });

  const { ref: mobileStackRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => inView && !isDesktop && setSectionLabel("TECH STACK"),
  });

  const { ref: ctaSpy } = useInView({
    ...SPY_CONFIG,
    onChange: (inView) => inView && setSectionLabel("GET IN TOUCH"),
  });

  const active: Project | undefined = useMemo(() => {
    if (projects.length === 0) return undefined;
    const safe = clamp(activeProject, 0, projects.length - 1);
    return projects[safe];
  }, [activeProject]);

  const carouselProps: PreviewCarouselProps = useMemo(
    () => ({
      items: projects.map((p) => ({
        ...p,
        icon: p.icon ?? <MiniIcon variant="accent" />,
      })),
      onOpen: (item) => {
        const idx = projects.findIndex((p) => p.id === item.id);
        setActiveProject(idx === -1 ? 0 : idx);
        setOpenPreview(true);
      },
    }),
    [projects],
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <div ref={heroRef}>
            <Hero
              key={mode}
              mode={mode}
              availabilityLabel="OPEN FOR COLLABORATION"
              headlineTop="Gbemi Daniel"
              headlineBottom="Frontend Developer"
              subcopy="I bring ideas and visions to life through code. Working with React and TypeScript, I create web experiences that feel smooth, look great, and actually work the way people expect. I'm constantly learning and always building."
              modeToggleSlot={
                <ModeToggle mode={mode} onChange={onModeChange} />
              }
            />
          </div>

          <div ref={isDesktop ? desktopGridRef : undefined}>
            <ModuleGrid
              left={
                <div
                  ref={!isDesktop ? mobileProjectsRef : undefined}
                  style={{ height: "100%" }}
                >
                  <PreviewCarousel {...carouselProps} />
                </div>
              }
              rightTop={
                <div
                  ref={!isDesktop ? mobileSideQuestRef : undefined}
                  style={{ height: "100%" }}
                >
                  <SideQuestCard
                    title="Side Quests"
                    subtitle="Experimental labs where I test new ideas."
                    icon={Rocket}
                    projects={sideProjects}
                  />
                </div>
              }
              rightBottom={
                <div
                  ref={!isDesktop ? mobileStackRef : undefined}
                  style={{ height: "100%" }}
                >
                  <ModuleCard
                    title="Stack"
                    subtitle="My Tech Stack"
                    icon={Layers2}
                    footer={
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {TECH_STACK.map((tech) => (
                          <SkillBadge
                            key={tech.name}
                            name={tech.name}
                            icon={tech.icon}
                            color={tech.color}
                          />
                        ))}
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>

          <PreviewDialog
            open={openPreview}
            title={active?.title ?? "Preview"}
            imageSrc={active?.previewImage}
            videoSrc={active?.previewVideo}
            description={active?.descriptionLong ?? active?.subtitle}
            meta={active?.meta}
            primaryHref={active?.links?.primary?.href}
            primaryLabel={active?.links?.primary?.label}
            secondaryHref={active?.links?.secondary?.href}
            secondaryLabel={active?.links?.secondary?.label}
            onClose={() => setOpenPreview(false)}
            mode={mode}
            highlights={active?.highlights}
            highlightsTitle={active?.highlightsTitle}
          />

          <div ref={ctaSpy}>
            <MinimalCTA
              icon={Terminal}
              title="Ready to ship?"
              description="Open to frontend roles, Web3 collaborations, and freelance projects."
              primaryAction={{
                label: "Email Me",
                href: "mailto:adamsdaniel043@gmail.com",
                icon: Mail,
              }}
              secondaryAction={{
                label: "Resume",
                href: "/resume.pdf",
                icon: FileText,
                download: true,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
