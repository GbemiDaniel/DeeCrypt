import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~`|{}[]";

export const useScramble = (text: string, speed = 40, delay = 0) => {
  const [displayText, setDisplayText] = useState(text);

  const iteration = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    iteration.current = 0;
    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (iteration.current >= text.length) {
        if (timer.current) clearInterval(timer.current);
      }

      iteration.current += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      start();
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer.current) clearInterval(timer.current);
    };
  }, [text, delay]);

  return { displayText, replay: start };
};
