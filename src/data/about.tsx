import {
  Briefcase,
  Zap,
  GraduationCap,
  PenTool,
  Code,
  CheckCircle2,
  Award,
} from "lucide-react";
import type { TimelineType } from "@/components/Timeline";

// --- JOURNEY DATA ---
export const TIMELINE_DATA = [
  {
    year: "2026",
    title: "Housing Agency Co-Founder",
    description:
      "Launched a student housing platform in Nsukka. Merging real-world logistics with a digital-first approach.",
    icon: <Briefcase size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2025",
    title: "DeeCrypt Hub & Web3",
    description:
      "Founded a Web3 educational brand. Technical writing for projects like Ioxa and building community trust.",
    icon: <Zap size={14} />,
    type: "writer" as TimelineType,
  },
  {
    year: "2025",
    title: "NYSC Mobilization",
    description:
      "Batch C Mobilization. Transitioning from academic life to national service while honing frontend craft.",
    icon: <GraduationCap size={14} />,
    type: "dev" as TimelineType,
  },
  {
    year: "2021",
    title: "University of Nigeria",
    description:
      "The Foundation. Physics & Astronomy background that taught me the first principles of complex systems.",
    icon: <PenTool size={14} />,
    type: "dev" as TimelineType,
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
