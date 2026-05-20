import { useState, useEffect, useRef } from "react";

export function useCinematicIntro(isLoading: boolean) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [sequencePhase, setSequencePhase] = useState("cursor");

  const textRef = useRef("");
  // THE FIX: Storing the timeout in a ref so we can definitively clear it across renders
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isLoading) return;

    // THE FIX: Strict Mode safeguard flag. 
    // If the component unmounts, this flips to false and stops the recursive typing dead in its tracks.
    let isActive = true;

    const typeText = (target: string, nextPhase: string, speed = 50) => {
      let i = 0;
      const tick = () => {
        if (!isActive) return; // Abort if unmounted
        if (i <= target.length) {
          textRef.current = target.slice(0, i);
          setText(textRef.current);
          i++;
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          setSequencePhase(nextPhase);
        }
      };
      tick();
    };

    const deleteText = (nextPhase: string, speed = 30) => {
      let i = textRef.current.length;
      const tick = () => {
        if (!isActive) return; // Abort if unmounted
        if (i >= 0) {
          textRef.current = textRef.current.slice(0, i);
          setText(textRef.current);
          i--;
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          setSequencePhase(nextPhase);
        }
      };
      tick();
    };

    // --- CINEMATIC SEQUENCE ---
    switch (sequencePhase) {
      case "cursor":
        timeoutRef.current = setTimeout(() => {
          if (isActive) setSequencePhase("typing1");
        }, 2500); // 2.5s blank screen with just the blinking cursor
        break;

      case "typing1":
        typeText("Loading Identity...", "pause1", 60);
        break;
      case "pause1":
        timeoutRef.current = setTimeout(() => {
          if (isActive) setSequencePhase("deleting1");
        }, 1000);
        break;
      case "deleting1":
        deleteText("typing2");
        break;

      case "typing2":
        typeText("Welcome.", "pause2", 80);
        break;
      case "pause2":
        timeoutRef.current = setTimeout(() => {
          if (isActive) setSequencePhase("fading");
        }, 1000);
        break;

      case "fading":
        timeoutRef.current = setTimeout(() => {
          if (isActive) setSequencePhase("final");
        }, 600);
        break;

      case "final":
        setShowCursor(false);
        break;
    }

    // THE FIX: Cleanup function runs when component unmounts (or Strict Mode does its double-fire)
    return () => {
      isActive = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sequencePhase, isLoading]);

  return { text, showCursor, sequencePhase };
}