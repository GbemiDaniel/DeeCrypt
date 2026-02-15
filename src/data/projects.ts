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
    id: "Worldwise",
    title: "Worldwise",
    subtitle: "Keep Track of Your Adventures",
    badge: "WEB2",
    previewImage: "/preview/Worldview.png",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend", accent: true },
      { label: "TYPE", value: "Demo" },
      { label: "YEAR", value: "2025" },
    ],
    descriptionLong:
      "A travel tracking web app I built while learning advanced React patterns and  working with map libraries. Users can log cities they've visited on an iteractive map and build a personal travel history",

    // --- NEW: Personal Project Highlights ---
    highlightsTitle: "WHAT I BUILT",
    highlights: [
      "Interactive map with geolocation using Leaflet.js to pinpoint and track visits.",
      "Persistent local storage system—your travel history saves without needing a backend.",
      "Custom form validation for adding new cities with dates and personal notes.",
      "Clean, travel-focused UI that makes journaling your trips feel effortless.",
    ],
    // ----------------------------------------

    links: {
      primary: { href: "https://example.com", label: "Case study" },
      secondary: {
        href: "https://github.com/GbemiDaniel/Worldview",
        label: "GitHub",
      },
    },
  },
  {
    id: "Portfolio",
    title: "Portfolio Website",
    subtitle: "Designed and Built from Scratch",
    badge: "WEB2",
    previewImage: "/previews/sample.jpg",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend", accent: true },
      { label: "TYPE", value: "Personal Project" },
      { label: "YEAR", value: "2026" },
    ],
    descriptionLong:
      "The website you're looking at right now. I designed and built this portfolio over two months to showcase my work and prove I can take projects from concept to deployment—no templates, just intentional design and problem-solving.",

    // --- NEW: Design/Tech Focus ---
    highlightsTitle: "KEY FEATURES:",
    highlights: [
      "Three-view system (Dev, Writer, About) with seamless mode switching",
      "Custom-designed card components tailored for different content types.",
      "Interactive project preview carousel built without external libraries",

      "Performance-optimized architecture for fast load times",
      "Unified theme system merging multiple visual identities",
    ],
    // ------------------------------

    links: {
      primary: { href: "https://example.com", label: "Live demo" },
      secondary: { href: "https://github.com/", label: "GitHub" },
    },
  },
];
