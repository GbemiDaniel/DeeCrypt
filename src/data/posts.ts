export type WriterPlatform = "X" | "Mirror" | "Medium";

export type WriterPost = {
  id: string;
  title: string;
  hook: string;
  date: string;
  readTime: string;
  platform: WriterPlatform;

  // for the dialog “native” preview
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;

  // optional “tweet-like” content blocks
  body: string[];

  // optional metrics for X-style preview
  metrics?: {
    likes: number;
    replies: number;
    reposts: number;
  };

  // used for the carousel background tint/image
  previewImage?: string;

  // outbound link
  href?: string;
};

export const posts: WriterPost[] = [
  {
    id: "interfaces-are-stories",
    title: "Interfaces Are Stories",
    hook: "Great UIs don’t just work — they persuade, guide, and reduce cognitive load like good writing.",
    date: "Nov 02, 2023",
    readTime: "4 min read",
    platform: "Mirror",
    authorName: "DeeCrypt",
    authorHandle: "@deecrypt",
    body: [
      "We mistake UI polish for clarity. Clarity is structure.",
      "Good interfaces reduce the number of thoughts a user must hold at once.",
      "The real magic is invisible: defaults, sequencing, and calm feedback.",
    ],
    previewImage: "/previews/sample.jpg",
    href: "https://mirror.xyz/",
  },
  {
    id: "quiet-death-ui",
    title: "The Quiet Death of UI",
    hook: "Why the next wave isn’t better buttons — it’s better intent, better systems, and invisible execution.",
    date: "Oct 24, 2023",
    readTime: "5 min read",
    platform: "X",
    authorName: "DeeCrypt",
    authorHandle: "@deecrypt",
    body: [
      "We confuse friction with difficulty. In crypto, friction reminds users value is moving.",
      "Remove all friction and you remove weight, trust, and meaning.",
      "The future of UX is not hiding complexity — it’s making it legible.",
    ],
    metrics: {
      likes: 428,
      replies: 19,
      reposts: 72,
    },
    previewImage: "/previews/sample.jpg",
    href: "https://x.com/",
  },
];
