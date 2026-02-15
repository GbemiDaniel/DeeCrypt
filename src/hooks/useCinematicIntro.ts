import { useState, useEffect } from "react";

export function useCinematicIntro(isLoading: boolean) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [sequencePhase, setSequencePhase] = useState("cursor");

  useEffect(() => {
    // Wait for preloader to finish
    if (isLoading) return;

    let timeout: NodeJS.Timeout;

    // Helper: Type char by char
    const typeText = (target: string, nextPhase: string, speed = 50) => {
      let i = 0;
      const tick = () => {
        if (i <= target.length) {
          setText(target.slice(0, i));
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
      let i = text.length;
      const tick = () => {
        if (i >= 0) {
          setText(text.slice(0, i));
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
        // 1. Initial Wait (1.5s)
        timeout = setTimeout(() => setSequencePhase("typing1"), 1500);
        break;

      case "typing1":
        // 2. "Welcome."
        typeText("Welcome.", "pause1", 80);
        break;
      case "pause1":
        timeout = setTimeout(() => setSequencePhase("deleting1"), 800);
        break;
      case "deleting1":
        deleteText("typing2");
        break;

      case "typing2":
        // 3. "I'm Gbemi Daniel."
        typeText("I'm Gbemi Daniel.", "pause2", 60);
        break;
      case "pause2":
        timeout = setTimeout(() => setSequencePhase("deleting2"), 1000);
        break;
      case "deleting2":
        deleteText("typing3");
        break;

      case "typing3":
        // 4. "What i do"
        typeText("I build. I learn. I share.", "pause3", 50);
        break;
      case "pause3":
        timeout = setTimeout(() => setSequencePhase("deleting3"), 1500);
        break;
      case "deleting3":
        deleteText("typing4");
        break;

      case "typing4":
        // 5. "Curating the narrative is the goal."
        typeText("Here's my story", "pause4", 50);
        break;
      case "pause4":
        timeout = setTimeout(() => setSequencePhase("fading"), 1200);
        break;

      case "fading":
        // 6. Trigger Fade Out
        timeout = setTimeout(() => setSequencePhase("final"), 600);
        break;

      case "final":
        // 7. Show Final Static Header
        setShowCursor(false);
        break;
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequencePhase, isLoading]); 

  return { text, showCursor, sequencePhase };
}