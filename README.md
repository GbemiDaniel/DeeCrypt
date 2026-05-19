# DeeCrypt — Industrial Minimalist Developer & Writer Portfolio

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

DeeCrypt is a state-of-the-art personal portfolio showcasing creative engineering, professional technical writing, and product capabilities. Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, the codebase is meticulously structured as a physical piece of machined hardware—featuring smoked museum acrylic, volumetric typography, milled metallic details, and zero-jank interactive animations.

---

## ⚙️ Core Design Philosophy: Industrial Minimalism

DeeCrypt isn't designed as a webpage; it functions and responds like a physical console.

1. **Volumetric Glass Chassis:** All card components and modals implement a glassmorphic engine utilizing heavy backdrop blurs (`blur(24px) saturate(150%)`), custom layered shadow stacks simulating physical depth, and physical "rim lights" (`inset 0 1px 0 rgba(255,255,255,0.15)`).
2. **Metallic Detail & Dynamic Lighting:** Uses tailored HSL color palettes that fluidly shift between **Heavy Smoked Obsidian (Dark Mode)** and **Pristine Etched Acrylic (Light Mode)**. Standard highlights leverage custom variables mimicking brushed metal sheen (`--metal-shine`, `--metal-highlight`, `--metal-crease`).
3. **Hardware Animation Physics:** Animations are orchestrated with high mass and damping Framer Motion springs (`transition: { type: "spring", mass: 2.5, stiffness: 60, damping: 20 }`) to give UI components physical weight and stability.
4. **Cinematic Depth-of-Field:** Scroll-reveals utilize CSS filters to smoothly transition components from a deep lens blur (`filter: blur(10px)`) into sharp focus (`filter: blur(0px)`) combined with subtle opacity sweeps.

---

## 🛠️ Architecture & Tech Stack

- **Core Framework:** React 18 & Vite (fast HMR, compilation, and sub-second asset bundling)
- **Programming Language:** Strict Type-Safe TypeScript (zero `any` usage, explicit interfaces)
- **Styling Pipeline:** 
  - **Tailwind CSS Utility Engine:** For fast layout structures, structural grid wrappers, and spacing.
  - **Bespoke CSS Modules (`.module.css`):** Scoped styling for complex mathematical offsets, custom text-strokes, and localized neon gas lighting bleeds.
- **Animation Orchestrator:** Framer Motion (GPU-accelerated transforms and hardware springs)
- **Native Routing:** React Router DOM coupled with the modern native **View Transitions API** (`document.startViewTransition`) for seamless page-swap crossfades.

---

## 🕹️ System Architecture & Views

DeeCrypt is split into three core terminal views, unified under a centralized navbar switcher:

### 1. Developer Showcase (`/`)
An immersive portal mapping custom engineering projects under a premium grid system:
- **Concept Labs Grid:** Houses high-performance cards showcasing digital products and pentesting projects.
- **Concept Modal Portals:** An overlay detail dialog implementing Radix UI accessibility standards (A11y titles/descriptions) with image lazy loading (`loading="lazy"`, `decoding="async"`) to maximize performance.
- **Hardware Dial Availability Pill:** An "Open to Work" pill styled after physical switches, utilizing standard ModeToggle ambient glows.

### 2. Technical Writer View (`/writer`)
A dedicated dashboard detailing articles, journals, and documentation work:
- Implements an interactive article carousel and catalog utilizing custom drag/swipe mathematics.
- Interactive writer modals presenting detailed write-ups with code-syntax highlighting.

### 3. About & Journey Module (`/about`)
A story-driven timeline documenting personal and technical progression:
- **Synchronized Boot Sequence:** The `useCinematicIntro` typing orchestrator plays a terminal boot-up sequence (`"Loading Identity..." -> "Welcome."`) with custom cursor blinks.
- **Orchestrated 3D Persona Card:** A two-sided volumetric card that automatically flips to reveal the developer's avatar exactly in sync with the bootloader's completion.
- **Capabilities Matrix:** Details developer disciplines grouped as modular skill cards utilizing high-contrast typography and standard SVG hardware icons.

---

## 📂 Project Structure

```bash
DeeCrypt/
├── .agent/                  # Specialized local agent modules
├── src/
│   ├── app/                 # Central app configurations & page modes
│   │   ├── App.tsx          # Application entrypoint & View Transitions logic
│   │   └── modes.tsx        # System mode definitions (Dev, Writer, About)
│   ├── components/          # Reusable component library
│   │   ├── AboutHero/       # Cinematic typing & boot layout
│   │   ├── GlassPlaque/     # Smoked glass containers & metallic rim wrappers
│   │   ├── PersonaCard/     # 3D double-sided hardware flip card
│   │   ├── PreviewDialog/   # Fully accessible detail modals
│   │   └── ui/              # Radix UI primitive foundations
│   ├── config/              # App config parameters
│   ├── data/                # Data layers (projects, capabilities, writeups)
│   │   └── about.tsx        # Capabilities and timeline datastores
│   ├── hooks/               # Custom system hooks
│   │   └── useCinematicIntro.ts # Terminal animation sequence engine
│   ├── styles/              # Global Design Token System
│   │   ├── tokens.css       # Acrylic, Smoked Obsidian, and rim lighting tokens
│   │   └── globals.css      # Baseline CSS Resets & fluid layout utilities
│   └── views/               # Module views (DevView, WriterView, AboutView)
├── package.json             # Engine and dev scripts
└── tailwind.config.ts       # Tailwind CSS compiler configs
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/GbemiDaniel/DeeCrypt.git
cd DeeCrypt

# Install project dependencies
npm install
```

### 3. Spin Up Development Server
Run the local Vite dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
To generate an optimized, lightweight production bundle:
```bash
npm run build
```
Vite will compile assets under the `dist/` directory, ready to be served on platforms like Vercel, Netlify, or GitHub Pages.

---

## 🎨 Design Guidelines & Code Quality

If modifying this repository, strictly adhere to the following rules:
- **Never bypass TypeScript:** Explicit interfaces are required for all props (`Props`, `Variants`, `DataStructure`). `any` is prohibited.
- **Keep Animations Light:** Bind scroll interactions to CSS custom properties or simple opacity/blur transforms. Never trigger layout recalculation during scroll.
- **Maintain Modular CSS:** Abstract bespoke glow mechanics and complex shadows into CSS Modules. Keep global stylesheets pristine.
