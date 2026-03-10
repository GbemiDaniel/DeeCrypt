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
    },
    {
        id: "ai-can-vibe-code-now-frontend-roadmap",
        platform: "DevTo",
        title: "AI Can Vibe Code Now. So What's the Actual Frontend Roadmap?",
        previewText: "Every week there's a new demo of someone shipping a full product with a single prompt. And every week, the same question quietly surfaces in the back of every learner's mind—but nobody's giving it a straight answer. We've all seen the timeline demos. A non-technical founder prompts a full UI into existence in thirty seconds. A seasoned engineer generates a complex dashboard over their morning coffee. The comment section declares frontend development dead—again.",
        date: "2026-03-10",
        readTime: "6 min read",
        author: {
            name: "Gbemi Daniel",
            handle: "@deecrypt",
        },
        content: [
            "Every week there's a new demo of someone shipping a full product with a single prompt. And every week, the same question quietly surfaces in the back of every learner's mind—but nobody's giving it a straight answer.",
            "The Unscratchable Itch",
            "We've all seen the timeline demos. A non-technical founder prompts a full UI into existence in thirty seconds. A seasoned engineer generates a complex dashboard over their morning coffee. The comment section declares frontend development dead—again.",
            "I watch these videos while actively building and shipping, and I know exactly what they do to anyone trying to learn or level up right now. It creates this unscratchable itch. A literal thorn under the skin: If an AI can just generate a Next.js app on command, what is the actual roadmap to becoming a frontend engineer in 2026?"
        ],
        originalUrl: "https://dev.to/deecrypt/ai-can-vibe-code-now-so-whats-the-actual-frontend-roadmap-1mdc",
        tags: ["Frontend", "AI", "Vibe Coding", "UI/UX", "Web Development", "Systems"],
        tldr: "While AI can prompt UIs into existence instantly, true frontend engineering now demands deep architectural intuition and an intense focus on actual user experience.",
    }
];