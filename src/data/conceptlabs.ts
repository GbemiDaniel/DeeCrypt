// Define the new, expanded interface
export interface ConceptProject {
  id: string; // Needed for React keys and modal routing
  name: string;
  description: string; // Short description for the card
  progress: number;

  // --- NEW: Deep Dive Modal Data ---
  modalDetails: {
    previewImages: string[]; // Array of image paths (wireframes, screenshots)
    problemStatement: string;
    thoughtProcess: string; // 1-3 lines max
    currentDirection: string[]; // Array of bullet points
    optionalLink?: {
      label: string; // e.g., "View Figma", "Live Prototype"
      url: string;
    };
  };
}

// Example of the populated data
export const conceptProjects: ConceptProject[] = [
  {
    id: "threadlab",
    name: "ThreadLab",
    description:
      "AI-assisted content planning workspace for refining, analyzing, and organizing posts for X",
    progress: 15,

    modalDetails: {
      previewImages: [
        "/projects/Threadlab/threadlab-home.png",
        "/projects/Threadlab/threadlab-content-editor.png",
        "/projects/Threadlab/threadlab-analytics.png",
        "/projects/Threadlab/threadlab-idea-generator.png.png",
      ],

      problemStatement:
        "Growing consistently on X requires more than writing good posts. Creators often struggle with idea generation, content organization, engagement optimization, and maintaining a consistent publishing workflow across multiple drafts and threads.",

      thoughtProcess:
        "Designed around the idea that content creation tools should feel assistive, organized, and creatively fluid rather than overwhelming. The experience focuses on reducing friction between ideation, refinement, and publishing.",

      currentDirection: [
        "Exploring AI-assisted post and thread refinement workflows",
        "Testing engagement scoring and tone optimization systems",
        "Designing streamlined draft-to-publish content pipelines",
        "Building creator-focused workspace interactions and layouts",
        "Experimenting with AI-powered content analysis and brainstorming flows",
      ],

      optionalLink: {
        label: "View AI Studio Exploration",
        url: "https://x-content-planner-754312600930.europe-west2.run.app",
      },
    },
  },
  {
    id: "webscript-agency",
    name: "Webscript Agency",
    description: "Modern digital agency platform focused on premium client experiences",
    progress: 45,
    modalDetails: {
      previewImages: ["/preview/Webscript Agency.png"],
      problemStatement: "Webscript Agency is a modern digital agency platform designed to combine premium visual presentation with scalable frontend architecture.",
      thoughtProcess: "Exploring how business-focused interfaces can feel immersive, interactive, and visually refined while still maintaining usability and performance.",
      currentDirection: [
        "Premium agency-focused UI system",
        "Role-based dashboard architecture",
        "Framer Motion interaction design",
        "Responsive glassmorphism interface patterns",
        "Scalable frontend component structure"
      ],
      optionalLink: {
        label: "Live Preview",
        url: "https://websrcipts-agency.vercel.app/"
      }
    }
  },
  // ... other projects
  // trigger hmr
];