import type { PreviewItem } from "../components/PreviewCarousel/PreviewCarousel";

export type Project = PreviewItem & {
  descriptionLong: string;

  links?: {
    primary?: { href: string; label: string };
    secondary?: { href: string; label: string };
  };

  // ✅ New: optional video preview (mp4/webm)
  previewVideo?: string;
};

export const projects: Project[] = [
  {
    id: "etherscout",
    title: "Skillz Bloom",
    subtitle: "Empowering Students to Grow Skills Daily",
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
    subtitle: "Keep track of your adventures",
    badge: "WEB2",
    previewImage: "/preview/Worldview.png",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend", accent: true },
      { label: "TYPE", value: "Demo" },
      { label: "YEAR", value: "2025" },
    ],
    descriptionLong:
      "A Web App that helps you keep track of your adventures as you travel",
    links: {
      primary: { href: "https://example.com", label: "Case study" },
      secondary: {
        href: "https://github.com/GbemiDaniel/Worldview",
        label: "GitHub",
      },
    },
  },
  {
    id: "web2-dashboard",
    title: "Web2 Analytics Dashboard",
    subtitle:
      "A performance-first dashboard layout for real products: charts, tables, filters—without visual clutter.",
    badge: "WEB2",
    previewImage: "/previews/sample.jpg",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend", accent: true },
      { label: "TYPE", value: "Web App" },
      { label: "FOCUS", value: "Performance" },
    ],
    descriptionLong:
      "A practical dashboard design that scales from laptop to mobile. Built around fast navigation, sensible spacing, and readable data presentation.",
    links: {
      primary: { href: "https://example.com", label: "Live demo" },
      secondary: { href: "https://github.com/", label: "GitHub" },
    },
  },
];
