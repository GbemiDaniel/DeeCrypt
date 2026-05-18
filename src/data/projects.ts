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
    id: "thrifty",

    title: "Thrifty",

    subtitle:
      "Minimal ecommerce experience for modern fashion brands",

    badge: "COLLAB",

    previewImage:
      "/projects/thrifty-ecommerce-store/thrifty-landing-page.png",

    meta: [
      { label: "ROLE", value: "Frontend Engineer", accent: true },
      { label: "STACK", value: "Next.js + Tailwind" },
      { label: "YEAR", value: "2026" },
    ],

    mobileMeta: [
      { label: "ROLE", value: "FE Engineer", accent: true },
      { label: "STACK", value: "Next.js" },
      { label: "YEAR", value: "2026" },
    ],

    descriptionLong:
      "Thrifty is a collaborative ecommerce experience developed alongside a product designer to explore minimalist product presentation, immersive shopping interactions, and scalable frontend architecture. I handled the frontend implementation, responsiveness, component systems, and interaction design while translating high-fidelity visual concepts into a polished digital shopping experience. The platform also became an exploration into AI-assisted frontend workflows and scalable ecommerce UI systems.",

    highlightsTitle: "IMPLEMENTATION HIGHLIGHTS",

    highlights: [
      "Responsive ecommerce UI architecture",
      "Reusable product component system",
      "Scalable dashboard-ready structure",
      "AI-assisted frontend workflow exploration",
      "Premium typography and spacing system",
    ],

    links: {
      primary: {
        href: "https://thrifty-rho.vercel.app/",
        label: "Live Preview",
      },

      secondary: {
        href: "https://github.com/GbemiDaniel/thrifty",
        label: "GitHub",
      },
    },
  },
  {
    id: "daniel-creative-portfolio",

    title: "Daniel Creative Portfolio",

    subtitle:
      "Modern creator portfolio focused on timeless digital experiences",

    badge: "COLLAB",

    previewImage:
      "/projects/designer-portfolio/desginer-portfolio-landing-page.png",

    meta: [
      { label: "ROLE", value: "UI Engineer", accent: true },
      { label: "STACK", value: "Next.js + Tailwind" },
      { label: "YEAR", value: "2026" },
    ],

    mobileMeta: [
      { label: "ROLE", value: "UI Engineer", accent: true },
      { label: "STACK", value: "Next.js" },
      { label: "YEAR", value: "2026" },
    ],

    descriptionLong:
      "Daniel Creative Portfolio is a collaborative creator-focused portfolio experience designed alongside a visual designer to showcase modern branding, immersive storytelling, and timeless interface aesthetics. I handled the frontend implementation, interaction systems, responsive architecture, and UI composition while translating the visual direction into a polished and scalable web experience.",

    highlightsTitle: "IMPLEMENTATION HIGHLIGHTS",

    highlights: [
      "Modern dark-themed interface system",
      "Responsive creator-focused layouts",
      "Reusable UI composition architecture",
      "Polished interaction and motion design",
      "AI-assisted frontend experimentation",
    ],

    links: {
      primary: {
        href: "https://dice-portfolio.vercel.app/",
        label: "Live Preview",
      },

      secondary: {
        href: "https://github.com/GbemiDaniel/Dice-Portfolio",
        label: "GitHub",
      },
    },
  },
  {
    id: "pentest-portfolio",

    title: "Pentest Portfolio",

    subtitle:
      "Cybersecurity identity platform for a security researcher",

    badge: "COLLAB",

    previewImage:
      "/projects/pentester-porfolio/pentester-portfolio-landing-page.png",

    meta: [
      { label: "ROLE", value: "Frontend Engineer", accent: true },
      { label: "STACK", value: "Next.js + Tailwind" },
      { label: "YEAR", value: "2026" },
    ],

    mobileMeta: [
      { label: "ROLE", value: "FE Engineer", accent: true },
      { label: "STACK", value: "Next.js" },
      { label: "YEAR", value: "2026" },
    ],

    descriptionLong:
      "Pentest Portfolio is a cybersecurity-focused personal branding platform created in collaboration with a security researcher to visually reflect the world of penetration testing through immersive UI systems, terminal-inspired interactions, and layered visual aesthetics. I handled the frontend implementation, responsive architecture, and interactive UI systems while exploring modern animation techniques and AI-assisted development workflows.",

    highlightsTitle: "IMPLEMENTATION HIGHLIGHTS",

    highlights: [
      "Immersive cybersecurity-themed UI system",
      "Responsive portfolio layout architecture",
      "Terminal-inspired interaction patterns",
      "Layered glow and typography effects",
      "AI-assisted frontend experimentation",
    ],

    links: {
      primary: {
        href: "https://okoh-bernard-portfolio.vercel.app/",
        label: "Live Preview",
      },

      secondary: {
        href: "https://github.com/GbemiDaniel/Okoh-Bernard",
        label: "GitHub",
      },
    },
  },
  {
    id: "creator-os",

    title: "Creator OS",

    subtitle:
      "Interactive digital identity system for showcasing projects, writing, and experimentation",

    badge: "CASE STUDY",

    previewImage: "/preview/Portfolio-hero.png",

    previewVideo: "/previews/portfolio-preview.mp4",

    meta: [
      { label: "ROLE", value: "Frontend Architect", accent: true },
      { label: "STACK", value: "React + Motion" },
      { label: "YEAR", value: "2026" },
    ],

    mobileMeta: [
      { label: "ROLE", value: "FE Architect", accent: true },
      { label: "STACK", value: "React" },
      { label: "YEAR", value: "2026" },
    ],

    descriptionLong:
      "Creator OS is a highly interactive digital identity platform engineered to showcase projects, technical writing, and creative experimentation through a unified frontend experience. Built entirely from scratch without templates, the system combines responsive bento-grid layouts, custom interaction patterns, physics-based transitions, and dynamic content architecture to create a tactile and immersive browsing experience. The project also served as an exploration into scalable frontend systems, premium UI composition, and AI-assisted implementation workflows.",

    highlightsTitle: "TECHNICAL HIGHLIGHTS",

    highlights: [
      "Dual-mode Builder/Writer interface system",
      "Custom platform-inspired dialog architecture",
      "Responsive bento-grid layout composition",
      "Physics-based transitions with Framer Motion",
      "Glassmorphism UI system with dynamic highlights",
    ],

    links: {
      primary: {
        href: "http://gbemidaniel.vercel.app/",
        label: "Live Preview",
      },

      secondary: {
        href: "https://github.com/GbemiDaniel/DeeCrypt",
        label: "GitHub",
      },
    },
  },
  {
    id: "skillz-bloom",

    title: "Skillz Bloom",

    subtitle:
      "Student growth platform focused on daily learning and skill development",

    badge: "TEAM PROJECT",

    previewImage: "/preview/SkillzBloom.png",

    previewVideo: "/previews/sample.mp4",

    meta: [
      { label: "ROLE", value: "Frontend Engineer", accent: true },
      { label: "STACK", value: "React + Tailwind" },
      { label: "YEAR", value: "2025" },
    ],

    mobileMeta: [
      { label: "ROLE", value: "FE Engineer", accent: true },
      { label: "STACK", value: "React" },
      { label: "YEAR", value: "2025" },
    ],

    descriptionLong:
      "Skillz Bloom is a collaborative student skill-growth platform developed during my frontend internship as part of a team of developers. The platform was designed to help students build real-world abilities through consistent daily practice, progress tracking, and AI-assisted study support. I contributed to the frontend implementation and interface systems, focusing on intuitive dashboard experiences, clean UI composition, and user-friendly progress visualization.",

    highlightsTitle: "TEAM CONTRIBUTIONS",

    highlights: [
      "Interactive student dashboard system",
      "Skill progress and proficiency tracking",
      "Evidence-based skill submission flow",
      "Clean and motivating UI architecture",
      "Collaborative frontend development workflow",
    ],

    links: {
      primary: {
        href: "https://skillz-bloom-jade.vercel.app/",
        label: "Live Preview",
      },

      secondary: {
        href: "https://github.com/UnbeatableFC/skillz-bloom",
        label: "GitHub",
      },
    },
  }
];
