import {
  Briefcase,
  Zap,
  GraduationCap,
  PenTool,
  Code,
  CheckCircle2,
  Award,
  Rocket,Tv, BookOpen, Footprints,
  Globe,  
} from "lucide-react";
import type { TimelineType } from "@/components/Timeline";

export const TIMELINE_DATA = [
  {
    year: "2026",
    title: "Building & Launching",
    description:
      "Actively shipping projects, seeking opportunities to collaborate and grow. Preparing to launch DeeCrypt and contribute to the blockchain community.",
    icon: <Zap size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2025",
    title: "Self-Taught Frontend Developer",
    description:
      "Went deep into modern frontend development—React, TypeScript, and the tools that turn ideas into reality. Built Skillz Bloom during a remote internship.",
    icon: <Code size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2024",
    title: "From Student to Builder",
    description:
      "Graduated with a CS degree, but the real learning started after. Discovered that I didn't just want to code—I wanted to create things that matter.",
    icon: <GraduationCap size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2024",
    title: "The Web3 Awakening",
    description:
      "Looked beyond the hype and saw blockchain as an opportunity to build trustless systems and be part of something transformative. The journey begins.",
    icon: <Rocket size={14} />,
    type: "writer" as TimelineType,
  },
];

// --- ARSENAL (SKILLS) DATA ---
export const ARSENAL_DATA = [
  {
    type: "dev",
    title: "Frontend Dev",
    description:
      "Building responsive, accessible, and performant UIs using React, Next.js, and Tailwind CSS.",
    icon: <Code size={24} />,
  },
  {
    type: "web3",
    title: "Web3 Enthusiast",
    description:
      "Exploring the frontier of decentralized apps, airdrops, and blockchain analytics tools.",
    icon: <CheckCircle2 size={24} />,
  },
  {
    type: "writer",
    title: "Technical Writer",
    description:
      "Translating lines of code into compelling human stories. Founder of the DeeCrypt brand.",
    icon: <PenTool size={24} />,
  },
];

// --- BADGES DATA ---
export const BADGES_DATA = [
  {
    type: "dev" as const, // 'as const' ensures type safety for the BadgeCard component
    title: "Google Developer Profile",
    subtitle: "Gemini for Software Development Lifecycle",
    date: "2025",
    status: "Completed",
    link: "https://g.dev/your-profile",
    icon: <Code size={28} color="var(--accent)" />,
  },
  {
    type: "writer" as const,
    title: "DeeCrypt Hub",
    subtitle: "Founder & Lead Writer",
    date: "2025",
    status: "Completed",
    link: "https://twitter.com/deecrypthub",
    icon: <Zap size={28} color="#a855f7" />,
  },
  {
    type: "dev" as const,
    title: "Frontend Mastery",
    subtitle: "Advanced React Patterns",
    date: "In Progress",
    status: "In Progress",
    link: "#",
    icon: <Code size={28} color="var(--accent)" />,
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