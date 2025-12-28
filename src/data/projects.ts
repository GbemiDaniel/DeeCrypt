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
    title: "EtherScout Pro",
    subtitle:
      "Real-time mempool visualizer concept — focused on clean UX for noisy on-chain data.",
    badge: "LIVE TESTNET",
    previewImage: "/previews/sample.jpg",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "CHAIN", value: "Ethereum", accent: true },
      { label: "TYPE", value: "Dashboard" },
      { label: "STATUS", value: "Concept" },
    ],
    descriptionLong:
      "A concept UI for understanding mempool activity without the usual noise. The goal is clarity: readable flows, meaningful grouping, and a tight information hierarchy that works at a glance.",
    links: {
      primary: { href: "https://example.com", label: "Live preview" },
      secondary: { href: "https://github.com/", label: "GitHub" },
    },
  },
  {
    id: "wallet-ui",
    title: "Wallet UI Patterns",
    subtitle:
      "A mini system for connect flows, networks, and safe transaction states.",
    badge: "WEB2 / WEB3",
    previewImage: "/previews/sample.jpg",
    previewVideo: "/previews/sample.mp4",
    meta: [
      { label: "ROLE", value: "Frontend", accent: true },
      { label: "TYPE", value: "UI Kit" },
      { label: "YEAR", value: "2025" },
    ],
    descriptionLong:
      "Reusable patterns for wallet connection, network switching, and transaction feedback—designed to feel calm under pressure and clear for first-time users.",
    links: {
      primary: { href: "https://example.com", label: "Case study" },
      secondary: { href: "https://github.com/", label: "GitHub" },
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
