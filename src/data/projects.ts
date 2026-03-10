import type { PreviewItem } from "../components/PreviewCarousel/PreviewCarousel";

export type Project = PreviewItem & {
  descriptionLong: string;

  links?: {
    primary?: { href: string; label: string };
    secondary?: { href: string; label: string };
  };

  previewVideo?: string;

  // ✅ NEW FIELDS FOR "KEY CONTRIBUTIONS" SECTION
  highlights?: string[]; // Array of bullet points
  highlightsTitle?: string; // Optional custom header (e.g. "My Role")
};

export const projects: Project[] = [
  {
    id: "collaborated",
    title: "Skillz Bloom",
    subtitle: "Helping Stud ents Build Skills, One Day at a Time",
    badge: "Live Project",
    previewImage: "/preview/SkillzBloom.png",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend Intern", accent: true },
      { label: "TYPE", value: "Web App" },
      { label: "STATUS", value: "MVP" },
    ],
    descriptionLong:
      "SkillBloom is a global student skill-growth platform built to help learners develop real-world abilities through simple daily tasks, progress tracking, and AI-powered study support.",

    // --- NEW: Collaboration Highlights ---
    highlightsTitle: "My Contributions",
    highlights: [
      "Skills dashboard with real-time stats (daily practice, total skills, proficiency tracking)",
      "Manual skill addition system with evidence upload for accountability.",
      "Progress tracking interface showing acquired skills vs. skills in development.",
      "Clean, intuitive UI that makes tracking growth feel motivating, not overwhelming",
    ],
    // -------------------------------------

    links: {
      primary: {
        href: "https://skillz-bloom-jade.vercel.app/",
        label: "Live preview",
      },
      secondary: {
        href: "https://github.com/UnbeatableFC/skillz-bloom",
        label: "GitHub",
      },
    },
  },
  {
    id: "Webscript",
    title: "Webscript Digital Agency",
    subtitle: "Premium services for all things web",
    badge: "B2B",
    previewImage: "/preview/Webscript Agency.png",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend", accent: true },
      { label: "TYPE", value: "Live" },
      { label: "YEAR", value: "2026" },
    ],
    descriptionLong:
      "A premium, full-stack B2B platform engineered for a digital agency. It seamlessly merges a high-converting marketing shell with a secure, role-based client portal, utilizing advanced Next.js App Router architecture and a bespoke 'Hardware-Glass' design system.",
    // --- NEW: Personal Project Highlights ---
    highlightsTitle: "ARCHITECTURAL HIGHLIGHTS",
    highlights: [
      "Role-Based Dashboards: Built distinct, secure portals for Admin data analytics and Client project tracking.",
      "Custom Design System: Engineered a high-performance 'Premium Glass' UI layer with custom, etched-wireframe SVGs.",
      "Tactile Micro-Interactions: Integrated Framer Motion for hardware-accelerated, hybrid hover and scroll physics.",
      "Next.js Optimization: Leveraged React Server Components and optimized image architecture for sub-second load times.",
    ],
    // ----------------------------------------

    links: {
      primary: {
        href: "https://websrcipts-agency.vercel.app/",
        label: "Live Deployment"
      },
      secondary: {
        href: "https://github.com/GbemiDaniel/webscripts-agency",
        label: "GitHub Repository",
      },
    },
  },
  {
    id: "Portfolio",
    title: "Gbemi Daniel — Portfolio 2026",
    subtitle: "Interactive, multi-view digital identity built from scratch",
    badge: "FRONTEND / UI",
    previewImage: "/preview/Portfolio-hero.png", // Update with your actual path
    previewVideo: "/previews/portfolio-preview.mp4", // Update with your actual path
    meta: [
      { label: "ROLE", value: "System Architect & UI/UX", accent: true },
      { label: "STACK", value: "React, Tailwind, Framer" },
      { label: "YEAR", value: "2026" },
    ],
    descriptionLong:
      "A highly interactive, performance-driven personal portfolio designed to mirror my dual focus as a UI engineer and technical writer. Built completely from scratch without templates, the architecture features a custom mode-switching system, glassmorphic bento-grid layouts, and a strictly typed data pipeline. Every interaction—from the physics-based carousels to the cursor-tracked specular highlights—was engineered to feel tactile, intentional, and premium.",

    highlightsTitle: "TECHNICAL HIGHLIGHTS:",
    highlights: [
      "Dual-mode architecture (Builder/Writer) with seamless state and layout transitions",
      "Custom 'Chameleon' dialog system that dynamically shape-shifts to mock platform-native UI (X, LinkedIn, Medium, DevTo)",
      "Responsive Bento-grid module system with a custom P5-style cursor-tracked specular highlight effect",
      "Physics-based slide transitions and interactive carousels powered by Framer Motion",
      "Theme-agnostic, performant CSS architecture using backdrop-blur glassmorphism and elastic flexbox distribution",
    ],

    links: {
      primary: { href: "http://gbemidaniel.vercel.app/", label: "Live" },
      secondary: { href: "https://github.com/GbemiDaniel/DeeCrypt", label: "GitHub" },
    },
  }
];
