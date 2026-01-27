import { useState, useEffect } from "react";

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

  // Priority: Hover > Section > Default
  const showDefault = isHovering || !section;

  return { showDefault, sectionLabel: section, isHovering };
}
