import type { Mode } from "../app/modes";
import { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { setSectionLabel } from "../hooks/useScrollSpy";

import ModeToggle from "../components/ModeToggle/ModeToggle";
import RotatingStatus from "../components/RotatingStatus/RotatingStatus";
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
import { conceptProjects } from "../data/conceptlabs";
import { projects, type Project } from "../data/projects";
import { ConceptLabsCard } from "@/components/ConceptLabs/ConceptLabsCard";
import { siteConfig } from "@/config/site";
import { Rocket, Layers2, Terminal, Mail, FileText } from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiSupabase,
  SiFramer,
} from "react-icons/si";

const TOOLKIT_ITEMS = [
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "Next.js", color: "#FFFFFF", icon: SiNextdotjs },
  { name: "Tailwind", color: "#06B6D4", icon: SiTailwindcss },
  { name: "Supabase", color: "#3ECF8E", icon: SiSupabase },
  { name: "Framer", color: "#0055FF", icon: SiFramer },
];

const SPY_CONFIG = {
  threshold: 0,
  rootMargin: "-45% 0px -45% 0px",
  triggerOnce: false,
  delay: 250,
};

type Props = {
  mode: Mode;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DevView({ mode }: Props) {
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
      inView && isDesktop && setSectionLabel("PROJECTS & TOOLKIT"),
  });

  const { ref: mobileProjectsRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) =>
      inView && !isDesktop && setSectionLabel("MY PROJECTS"),
  });

  const { ref: mobileConceptLabsRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) =>
      inView && !isDesktop && setSectionLabel("CONCEPT LABS"),
  });

  const { ref: mobileToolkitRef } = useInView({
    ...SPY_CONFIG,
    skip: isDesktop,
    onChange: (inView) => inView && !isDesktop && setSectionLabel("TOOLKIT"),
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
    <div className="w-full">
      <div ref={heroRef}>
        <Hero
          key="dev"
          mode="dev"
          availabilityLabel={<RotatingStatus />}
          headlineTop={siteConfig.name}
          headlineBottom="Frontend Engineer"
          subcopy="I design and build digital experiences that reflect the identity of professionals, brands, and products while remaining grounded in usability, clarity, and audience needs."
          modeToggleSlot={<ModeToggle />}
        />
      </div>

      <div ref={isDesktop ? desktopGridRef : undefined}>
        <ModuleGrid
          left={
            <div
              ref={!isDesktop ? mobileProjectsRef : undefined}
              className="min-h-[480px] md:min-h-0"
              style={{ height: "100%" }}
            >
              <PreviewCarousel {...carouselProps} />
            </div>
          }
          rightTop={
            <div
              ref={!isDesktop ? mobileConceptLabsRef : undefined}
              style={{ height: "100%" }}
            >
              <ConceptLabsCard
                title="Concept Labs"
                subtitle="Experimental labs where I test new ideas."
                icon={Rocket}
                projects={conceptProjects}
              />
            </div>
          }
          rightBottom={
            <div
              ref={!isDesktop ? mobileToolkitRef : undefined}
              style={{ height: "100%" }}
            >
              <ModuleCard
                title="Toolkit"
                subtitle="Tools Behind the Experience"
                icon={Layers2}
                footer={
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {TOOLKIT_ITEMS.map((tech) => (
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
          subtitle="Let’s build something worth remembering."
          primaryAction={{
            label: "Email Me",
            href: `mailto:${siteConfig.email}`,
            icon: Mail,
          }}
          secondaryAction={{
            label: "Resume",
            href: siteConfig.resumeUrl,
            icon: FileText,
            download: true,
          }}
        />
      </div>
    </div>
  );
}