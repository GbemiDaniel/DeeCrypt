import { Rocket, Box, Sparkles } from "lucide-react";
import type { SideProject } from "@/components/SideQuest/SideQuestCard";

export const sideProjects: SideProject[] = [
  {
    name: "X Content Manager",
    description:
      "AI-assisted Twitter content previewer for refining tone before publishing",
    progress: 15,
    url: "https://github.com/",
    // icon: Sparkles
  },
  {
    name: "Nello's Survey Platform",
    description:
      "Community dashboard with member profiles and leaderboards for survey earners",
    progress: 10,
    url: "https://github.com/",
    // icon: Box
  },
  {
    name: "Localist",
    description:
      "Proximity-based attendance using time-limited, location-locked links",
    progress: 5,
    url: "https://github.com/",
    // icon: Rocket
  },
];
