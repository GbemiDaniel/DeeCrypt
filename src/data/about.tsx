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
  Cpu,
  Globe,
  Terminal, // <--- ADDED THIS (Was missing)
} from "lucide-react";
import type { TimelineType } from "@/components/Timeline";

// --- TIMELINE DATA ---
export const TIMELINE_DATA = [
  {
    year: "2026",
    title: "Building & Launching",
    description:
      "Shipping frontend projects and preparing to launch DeeCrypt. Building products with a focus on real-world utility and seamless UX.",
    icon: <Zap size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2025",
    title: "QA Testing & Bug Hunting",
    description:
      "Joined test.io to break products under real conditions. Learning exactly how systems fail in the wild so I can write more bulletproof code.",
    icon: <Terminal size={14} />,
    type: "test" as TimelineType, // Will use the Orange theme
  },
  {
    year: "2025",
    title: "The Web3 & Writing Dive",
    description:
      "Started learning smart contract security via Cyfrin Updraft. Documenting my journey through blockchain, AI, and frontend to help others learn.",
    icon: <PenTool size={14} />,
    type: "writer" as TimelineType, // Will use the Purple/Writer theme
  },
  {
    year: "2024",
    title: "Programmify Internship",
    description:
      "Collaborated on Skillz Bloom with a remote team. First real project experience with Git workflows, agile development, and code reviews.",
    icon: <Briefcase size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2024",
    title: "CS Grad → Self-Taught Dev",
    description:
      "Graduated from the University of Nigeria. Took my foundation in CS theory and immediately taught myself the practice of building with React and TypeScript.",
    icon: <GraduationCap size={14} />,
    type: "dev" as TimelineType,
  },
];
// --- ARSENAL (SKILLS) DATA ---
// --- UPDATED ARSENAL DATA (Minimal + Tech Stack) ---
export const ARSENAL_DATA = [
  {
    title: "Frontend Developer",
    description:
      "I craft interfaces that feel effortless. Code is simply the tool; performance, accessibility, and the user's experience are what actually matter.",
    icon: <Code size={24} />,
    type: "dev",
    tech: ["React", "TypeScript", "Tailwind", "Framer"],
  },
  {
    title: "QA Tester",
    description:
      "I break products under real conditions to learn how to build them better. Every bug found is a lesson in creating resilient systems.",
    icon: <Terminal size={24} />,
    type: "test", 
    tech: ["Manual Testing", "User Flows", "JIRA", "Bug Reporting"],
  },
  {
    title: "Technical Writer",
    description:
      "I document the chaos of building. From frontend architecture to Web3 exploration, I make complex concepts accessible to the curious.",
    icon: <PenTool size={24} />,
    type: "writer",
    tech: ["Tech Blogs", "Documentation", "Web3 Guides"],
  },
];


// --- BADGES DATA ---
export const BADGES_DATA = [
  {
    type: "dev" as const,
    title: "Portfolio v1 Shipped",
    subtitle: "Designed & Built from Scratch",
    date: "2026",
    status: "Live",
    link: "https://gbemidaniel.vercel.app",
    icon: <Code size={28} color="var(--accent)" />,
  },
  {
    type: "test" as const,
    title: "Bronze QA Tester",
    subtitle: "3 Badges Earned on test.io",
    date: "2026",
    status: "Active",
    link: "https://test.io/",
    icon: <CheckCircle2 size={28} color="var(--accent)" />,
  },
  {
    type: "dev" as const,
    title: "Blockchain Foundations",
    subtitle: "Cyfrin Updraft - 75% Complete",
    date: "In Progress",
    status: "Learning",
    link: "#",
    icon: <Rocket size={28} color="var(--accent)" />,
  },
  {
    type: "writer" as const,
    title: "DeeCrypt Brand",
    subtitle: "Logo Designed, Content in Draft",
    date: "Launching Q2 2026",
    status: "Building",
    link: "https://twitter.com/deecrypthub",
    icon: <PenTool size={28} color="#a855f7" />,
  },
  {
    type: "dev" as const,
    title: "Final Year Project",
    subtitle: "Real Estate PWA - Nsukka Case Study",
    date: "2024",
    status: "Completed",
    link: "#",
    icon: <Award size={28} color="var(--accent)" />,
  },
  {
    type: "dev" as const,
    title: "Programmify Internship",
    subtitle: "Remote Team Collaboration - 6 Developers",
    date: "2024",
    status: "Completed",
    link: "#",
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