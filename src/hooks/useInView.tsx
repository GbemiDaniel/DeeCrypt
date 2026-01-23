import { useEffect, useState, useRef } from "react";

interface Options extends IntersectionObserverInit {
  triggerOnce?: boolean; // If true, animation only plays once (good for portfolios)
}

export function useInView({
  triggerOnce = true,
  threshold = 0.1,
  ...opts
}: Options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(element); // Stop watching after it appears
        } else {
          if (!triggerOnce) setIsInView(false);
        }
      },
      { threshold, ...opts },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}
