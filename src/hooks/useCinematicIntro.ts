import { useState, useEffect, useRef } from "react";

export function useCinematicIntro(isLoading: boolean) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [sequencePhase, setSequencePhase] = useState("cursor");

  // THE FIX: We use a ref to track the string synchronously. 
  // This prevents the useEffect from endlessly restarting on every keystroke.
  const textRef = useRef("");

  useEffect(() => {
    // Wait for preloader to finish
    if (isLoading) return;

    let timeout: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    // Helper: Type char by char
    const typeText = (target: string, nextPhase: string, speed = 50) => {
      let i = 0;
      const tick = () => {
        if (isCancelled) return;
        if (i <= target.length) {
          textRef.current = target.slice(0, i);
          setText(textRef.current);
          i++;
          timeout = setTimeout(tick, speed);
        } else {
          setSequencePhase(nextPhase);
        }
      };
      tick();
    };

    // Helper: Delete char by char
    const deleteText = (nextPhase: string, speed = 30) => {
      let i = textRef.current.length;
      const tick = () => {
        if (isCancelled) return;
        if (i >= 0) {
          textRef.current = textRef.current.slice(0, i);
          setText(textRef.current);
          i--;
          timeout = setTimeout(tick, speed);
        } else {
          setSequencePhase(nextPhase);
        }
      };
      tick();
    };

    // --- CINEMATIC SEQUENCE ---
    switch (sequencePhase) {
      case "cursor":
        timeout = setTimeout(() => {
          if (!isCancelled) setSequencePhase("typing1");
        }, 2500); // FIXED: 2.5s initial wait before typing
        break;

      case "typing1":
        typeText("Loading Identity...", "pause1", 60);
        break;
      case "pause1":
        timeout = setTimeout(() => {
          if (!isCancelled) setSequencePhase("deleting1");
        }, 1000);
        break;
      case "deleting1":
        deleteText("typing2");
        break;

      case "typing2":
        typeText("Welcome.", "pause2", 80);
        break;
      case "pause2":
        timeout = setTimeout(() => {
          if (!isCancelled) setSequencePhase("fading");
        }, 1000);
        break;

      case "fading":
        timeout = setTimeout(() => {
          if (!isCancelled) setSequencePhase("final");
        }, 600);
        break;

      case "final":
        if (!isCancelled) setShowCursor(false);
        break;
    }

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };

    // Notice: `text` is completely removed from this array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequencePhase, isLoading]);

  return { text, showCursor, sequencePhase };
}