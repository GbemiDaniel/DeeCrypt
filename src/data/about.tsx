import {
  Briefcase,
  Zap,
  GraduationCap,
  PenTool,
  Code,
  CheckCircle2,
  Award,
  Rocket,
  Tv,
  BookOpen,
  Footprints,
  Globe,
  Terminal, // <--- ADDED THIS (Was missing)
} from "lucide-react";
import type { TimelineType } from "@/components/Timeline";

// --- TIMELINE DATA ---
export const TIMELINE_DATA = [
  {
    year: "2026",
    title: "Building & Bringing Ideas to Life",
    description:
      "Focused on turning ideas into real products through frontend engineering, experimentation, and intentional design. Expanding from building interfaces to creating experiences shaped around people and purpose.",
    icon: <Zap size={14} />,
    type: "dev" as TimelineType,
  },

  {
    year: "2025",
    title: "Learning Through Testing",
    description:
      "Started testing products in real-world conditions to better understand usability, edge cases, and how thoughtful systems are built. This shifted my approach from writing features to designing resilient experiences.",
    icon: <Terminal size={14} />,
    type: "dev" as TimelineType,
  },

  {
    year: "2025",
    title: "Exploring Beyond the Interface",
    description:
      "Began documenting my learning journey while exploring Web3, AI, and emerging technologies. Writing became a way to think clearly, share ideas, and deepen my understanding through creation.",
    icon: <PenTool size={14} />,
    type: "writer" as TimelineType,
  },

  {
    year: "2025",
    title: "First Collaborative Build",
    description:
      "Worked with a remote team during my internship to bring ideas into production. Learned the foundations of collaboration, feedback, version control, and building beyond solo projects.",
    icon: <Briefcase size={14} />,
    type: "dev" as TimelineType,
  },

  {
    year: "2024",
    title: "From Theory to Building",
    description:
      "Graduated with a Computer Science degree and shifted focus toward building modern web experiences. Started turning concepts into working products through self-driven learning and hands-on execution.",
    icon: <GraduationCap size={14} />,
    type: "dev" as TimelineType,
  },
];
// --- CAPABILITIES DATA ---
export const CAPABILITIES_DATA = [
  {
    title: "Experience Engineering",
    description:
      "Designing and building digital experiences that balance usability, interaction, and visual identity.",
    icon: <Code size={24} />,
    type: "dev",
    tech: ["React", "TypeScript", "Tailwind", "Framer"],
  },
  {
    title: "Product Thinking",
    description:
      "Exploring ideas through testing, iteration, and thoughtful execution to create more resilient experiences.",
    icon: <Terminal size={24} />,
    type: "dev",
    tech: ["Manual Testing", "User Flows", "Bug Reporting"],
  },
  {
    title: "Knowledge Sharing",
    description:
      "Documenting lessons, workflows, and discoveries to make ideas more accessible and practical.",
    icon: <PenTool size={24} />,
    type: "writer",
    tech: ["Tech Blogs", "Documentation", "Web3 Guides"],
  },
];


export const HIGHLIGHTS_DATA = [
  {
    type: "dev" as const,
    title: "Portfolio Reimagined",
    subtitle: "Building a more intentional digital identity",
    date: "2026",
    status: "Live",
    link: "https://gbemidaniel.vercel.app",
    icon: <Code size={28} color="var(--accent)" />,
  },

  {
    type: "dev" as const,
    title: "Quality Through Testing",
    subtitle: "Exploring products through real-world testing",
    date: "2026",
    status: "Completed",
    icon: <CheckCircle2 size={28} color="var(--accent)" />,
  },

  {
    type: "dev" as const,
    title: "Exploring Web3 Foundations",
    subtitle: "Expanding across security, systems, and emerging tech",
    date: "2026",
    status: "Exploring",
    icon: <Rocket size={28} color="var(--accent)" />,
  },

  {
    type: "writer" as const,
    title: "DeeCrypt",
    subtitle: "Shaping a space for building and sharing ideas",
    date: "In Progress",
    status: "Building",
    icon: <PenTool size={28} color="#a855f7" />,
  },

  {
    type: "dev" as const,
    title: "First End-to-End Product",
    subtitle: "Applied product thinking through academic research",
    date: "2024",
    status: "Completed",
    icon: <Award size={28} color="var(--accent)" />,
  },

  {
    type: "dev" as const,
    title: "First Team Build",
    subtitle: "Collaborated remotely to deliver a real product",
    date: "2024",
    status: "Completed",
    icon: <Briefcase size={28} color="var(--accent)" />,
  },
];

export const LIFESTYLE_ITEMS = [
  { label: "Series & Cinema", icon: <Tv size={14} /> },
  { label: "Journaling", icon: <BookOpen size={14} /> },
  { label: "Long Walks", icon: <Footprints size={14} /> },
];

export const FOCUS_AREAS = [
  { label: "Frontend & Web3 Engineering", icon: <Globe size={16} /> },
  { label: "Technical Writing & Docs", icon: <PenTool size={16} /> },
  { label: "Mission-Driven Startups", icon: <CheckCircle2 size={16} /> },
];