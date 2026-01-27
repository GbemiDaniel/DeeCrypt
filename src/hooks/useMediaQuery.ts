import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  // 1. Lazy Init: Check immediately so we don't render "false" then "true"
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update if the initial check was stale (rare but safe)
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]); // 2. REMOVED 'matches' from dependency array to stop loops

  return matches;
}
