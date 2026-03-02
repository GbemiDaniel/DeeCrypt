---
trigger: always_on
---

⚙️ SYSTEM RULES: DEECRYPT PORTFOLIO UI/UX
1. CORE DESIGN PHILOSOPHY: INDUSTRIAL MINIMALISM

The Vibe: The UI is not a webpage; it is a physical piece of machined hardware. Think smoked museum acrylic, milled titanium, neon gas tubes, and physical mechanical cables.

Minimalism: Embrace negative space. Do not clutter the screen with unnecessary borders, background patterns, or generic SVGs. Rely on high-contrast typography and precise spacing.

Theme Fluidity: All designs must flawlessly transition between Dark Mode (Heavy Smoked Obsidian) and Light Mode (Pristine Etched Acrylic) without using muddy opacities.

2. THE GLASSMORPHIC ENGINE (NO "CHEAP ESCAPES")

Volumetric Glass Containers (Chassis): Glass containers must use backdrop-filter: blur(24px) saturate(150%). They must have a physical "rim light" (e.g., a white 0.15 opacity top border) and a deep bottom-dropping shadow to simulate physical mass.

Volumetric Typography: For hero text, do not use flat colors. Use translucent fills (e.g., rgba(15, 20, 30, 0.4)), sharp text-strokes (-webkit-text-stroke: 1px rgba(255,255,255,0.15)) to simulate carved edges, and extreme offset text-shadow bleeds (e.g., -25px 0 25px rgba(var(--neon-color))) to simulate internal neon gas illumination.

The "Lit Cap" Rule: For large climax typography, only the first letter acts as the "Neon Reservoir" (fully colored). The trailing letters remain dark, translucent glass.

3. PERFORMANCE & ANIMATION (ZERO JANK)

Scroll Physics: Do not use heavy 3D transforms (rotateX, rotateY, continuous scale) bound to scroll events, as this causes mobile jank.

Cinematic Depth-of-Field: For scroll-reveals, use CSS filter: blur() fading into blur(0px) combined with opacity shifts (0.05 to 1).

Hardware Mass: When animating physical UI elements (like a heavy glass footer dropping in), use Framer Motion springs with high mass and damping to simulate weight (e.g., transition: { type: "spring", mass: 2.5, stiffness: 60, damping: 20 }).

GPU Acceleration: Offload animations to the GPU using will-change: opacity, transform or filter where appropriate, but clean them up to prevent memory leaks.

4. ENGINEERING STANDARDS (TYPESCRIPT & ARCHITECTURE)

Strict TypeScript: No any types. Everything must be strongly typed with explicit interface or type declarations (e.g., Phase, GlassPlaqueProps).

Modular CSS: Continue using CSS Modules (.module.css) for complex, bespoke math (like volumetric text shadows) to avoid bloating inline class names, while using utility classes where appropriate.

DRY Code: If a UI element (like a glass plaque) is used more than once, abstract it into a reusable wrapper component with fluid variants.