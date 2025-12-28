export type Post = {
  title: string;
  excerpt: string;
  date: string; // "2025-10-24"
  readMins: number;
  tags: string[];
  url: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    title: "The Quiet Death of the User Interface",
    excerpt:
      "The future of interaction isn’t about better buttons. It’s about intent, agents, and invisible execution.",
    date: "2025-10-24",
    readMins: 5,
    tags: ["Frontend", "UX", "Web3"],
    url: "https://x.com/",
    featured: true,
  },
  {
    title: "Web3 Without the Hype",
    excerpt:
      "A mental model for what’s actually new in Web3—and what’s just marketing paint.",
    date: "2025-09-08",
    readMins: 4,
    tags: ["Web3", "Mental Models"],
    url: "https://x.com/",
  },
];
