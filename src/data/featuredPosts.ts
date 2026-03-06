export type ChameleonPlatform = 'Medium' | 'DevTo' | 'X' | 'LinkedIn';

export interface ChameleonAuthor {
    name: string;
    handle: string;
    avatarUrl?: string;
}

export interface ChameleonPost {
    id: string;
    platform: ChameleonPlatform;
    title: string;
    previewText: string;
    content: string[];
    date: string;
    author: ChameleonAuthor;
    originalUrl: string;
    tags?: string[];
    tldr?: string;
    metrics?: {
        likes?: number;
        replies?: number;
        reposts?: number;
        views?: number;
    };
    previewImage?: string;
    readTime?: string;
}

export const featuredPosts: ChameleonPost[] = [
    {
        id: "frontend-dead-or-evolving-vibe-coding-2026",
        platform: "Medium",
        title: "Is Frontend Dead or Evolving? Navigating the Era of \"Vibe Coding\"",
        previewText: "I've been writing frontend code long enough to remember the genuine excitement of moving from vanilla JavaScript spaghetti to something structured and actually maintainable. The leap from raw DOM manipulation to React felt like finally being handed the right tools for a job I'd been hacking at with a spoon.\n\nBut lately, I've been watching a different kind of shift — and it's not another framework war or a new CSS methodology. It's something that genuinely makes me pause when I open LinkedIn and see another \u201cI built a full SaaS with zero coding experience in a weekend\u201d post. Let me be honest about what I feel when I see those...",
        date: "2026-03-06",
        readTime: "7 min read",
        author: {
            name: "Gbemi Daniel",
            handle: "@deecrypt",
        },
        content: [
            "I've been writing frontend code long enough to remember the genuine excitement of moving from vanilla JavaScript spaghetti to something structured, component-based, and actually maintainable.",
            "But lately, I've been watching a different kind of shift — and it's not another framework war or a new CSS methodology. It's something that genuinely makes me pause when I open LinkedIn and see another \u201cI built a full SaaS with zero coding experience in a weekend\u201d post.",
            "Let me be honest about what I feel when I see those. It\u2019s not quite fear. It\u2019s something more complicated \u2014 like watching someone hotwire a car and asking yourself what driving school was actually for.",
            "And the thing is, they\u2019re actually shipping. So where does that leave the rest of us ...",
        ],
        previewImage: "/preview/medium-post-001.png",
        originalUrl: "https://medium.com/@gbemidaniel01/is-frontend-dead-or-evolving-navigating-the-era-of-vibe-coding-b58e72f067a0",
        tags: ["Frontend", "React", "AI", "Vibe Coding", "Web Development", "Career"],
        tldr: "AI lowers the floor for building UIs, but architectural judgment — knowing when and why to use the right patterns — is what separates engineers from vibe coders.",
    }
];