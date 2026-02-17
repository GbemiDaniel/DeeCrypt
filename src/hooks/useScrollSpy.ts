import { useState, useEffect } from "react";

// === SINGLE SOURCE OF TRUTH ===
// We export this so every View (Dev, Writer, About) uses the EXACT same settings.
export const SPY_CONFIG = {
  threshold: 0,
  // The "Tripwire": -45% means the trigger line is in the middle of the screen
  rootMargin: "-45% 0px -45% 0px",
  triggerOnce: false,
  // PERFORMANCE FIX: 250ms delay stops the Navbar from re-rendering 60fps
  delay: 250,
};

const navEvents = new EventTarget();

export function setSectionLabel(label: string | null) {
  navEvents.dispatchEvent(
    new CustomEvent("nav-update", {
      detail: { type: "section", value: label },
    }),
  );
}

export function setHoverState(isHovering: boolean) {
  navEvents.dispatchEvent(
    new CustomEvent("nav-update", {
      detail: { type: "hover", value: isHovering },
    }),
  );
}

export function useNavState() {
  const [section, setSection] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const { type, value } = (e as CustomEvent).detail;
      if (type === "section") setSection(value);
      if (type === "hover") setIsHovering(value);
    };

    navEvents.addEventListener("nav-update", handler);
    return () => navEvents.removeEventListener("nav-update", handler);
  }, []);

  const showDefault = isHovering || !section;

  return { showDefault, sectionLabel: section, isHovering };
}
