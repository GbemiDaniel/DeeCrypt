import {
  SideQuestCard,
  type SideProject,
} from "@/components/SideQuest/SideQuestCard";
import { Rocket } from "lucide-react";

const sideProjects: SideProject[] = [
  {
    name: "CLI Task Manager",
    description:
      "A minimal terminal-based task manager with vim-like keybindings",
    progress: 75,
    url: "https://github.com/",
  },
  {
    name: "Pixel Art Generator",
    description:
      "AI-powered tool that converts images into retro pixel art styles",
    progress: 40,
    url: "https://github.com/",
  },
  {
    name: "Portfolio V3",
    description: "Complete redesign with dark mode and interactive components",
    progress: 90,
    url: "https://github.com/",
  },
];

const SideQuestDemo = () => {
  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "hsl(var(--sidequest-bg))" }}
    >
      <div className="mx-auto max-w-md">
        <SideQuestCard
          title="Side Quests"
          subtitle="Personal projects I'm tinkering with"
          icon={Rocket}
          projects={sideProjects}
        />
      </div>
    </div>
  );
};

export default SideQuestDemo;
