import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import styles from "./PreviewCarousel.module.css";
import { Button } from "../ui/button";

export type PreviewMeta = {
  label: string;
  value: string;
  accent?: boolean;
};

export type PreviewItem = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  previewImage?: string;

  // ✅ New (optional): short looping preview
  previewVideo?: string;

  icon?: React.ReactNode;
  meta?: PreviewMeta[];
};

export type PreviewCarouselProps = {
  items: PreviewItem[];
  onOpen?: (item: PreviewItem) => void;
};

// Number of items to clone on each side for the infinite loop effect
const LOOP_BUFFER = 1;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return reduced;
}

export default function PreviewCarousel({
  items,
  onOpen,
}: PreviewCarouselProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const isJumping = useRef(false); // Used to disable smooth scroll during loop jumps

  const canLoop = items.length > 1;

  // Create a looped list of items for rendering: [..., last, 1, 2, ..., first, ...]
  const loopedItems = useMemo(() => {
    if (!canLoop) return items;
    const start = items.slice(-LOOP_BUFFER);
    const end = items.slice(0, LOOP_BUFFER);
    return [...start, ...items, ...end];
  }, [items, canLoop]);

  const [index, setIndex] = useState(canLoop ? LOOP_BUFFER : 0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // The "real" index of the item in the original `items` array
  const realIndex = useMemo(() => {
    if (!canLoop) return index;
    // Account for the buffer at the start
    return (index - LOOP_BUFFER + items.length) % items.length;
  }, [index, items.length, canLoop]);

  // Mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Initial scroll position (run once, no animation)
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children.item(index) as HTMLElement | null;
    if (!el) return;
    rail.scrollTo({ left: el.offsetLeft, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The "magic jump" effect for infinite looping
  useEffect(() => {
    if (!canLoop || !isJumping.current) return;

    const rail = railRef.current;
    if (!rail) return;

    // After the state has updated to the new (real) index,
    // perform an instant scroll to that new position.
    const el = rail.children.item(index) as HTMLElement | null;
    if (el) {
      rail.scrollTo({ left: el.offsetLeft, behavior: "auto" });
    }

    // Allow smooth scrolling again after the jump is complete.
    // A timeout is needed to let the DOM changes apply.
    setTimeout(() => {
      isJumping.current = false;
    }, 50);
  }, [index, canLoop]);

  // Main scroll effect when index changes (e.g., from buttons)
  useEffect(() => {
    if (isJumping.current) return; // Don't scroll if a jump is in progress

    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children.item(index) as HTMLElement | null;
    if (!el) return;

    rail.scrollTo({
      left: el.offsetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [index, prefersReducedMotion]);

  // IntersectionObserver to update index on user swipe
  useEffect(() => {
    if (!canLoop) return;
    const rail = railRef.current;
    if (!rail) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isJumping.current) return; // Ignore observer while jumping

        const intersecting = entries.find((e) => e.isIntersecting);
        if (!intersecting) return;

        const children = Array.from(rail.children);
        const newIndex = children.indexOf(intersecting.target);

        if (newIndex !== index) {
          setIndex(newIndex);
        }
      },
      { root: rail, threshold: 0.6 }
    );

    Array.from(rail.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
    // Re-run if the number of items changes to re-observe
  }, [items.length, canLoop, index]);

  // Handler for when a transition ends (to catch the end of a swipe)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !canLoop) return;

    const handleTransitionEnd = () => {
      // Are we in the left buffer zone?
      if (index < LOOP_BUFFER) {
        isJumping.current = true;
        setIndex(index + items.length);
      }
      // Are we in the right buffer zone?
      else if (index >= LOOP_BUFFER + items.length) {
        isJumping.current = true;
        setIndex(index - items.length);
      }
    };

    rail.addEventListener("transitionend", handleTransitionEnd);
    rail.addEventListener("scrollend", handleTransitionEnd); // For browsers supporting scrollend
    return () => {
      rail.removeEventListener("transitionend", handleTransitionEnd);
      rail.removeEventListener("scrollend", handleTransitionEnd);
    };
  }, [index, items.length, canLoop]);

  const goTo = (i: number) => {
    if (!canLoop) return;
    setIndex(i + LOOP_BUFFER);
  };
  const prev = () => {
    if (!canLoop) return;
    setIndex((prevIndex) => prevIndex - 1);
  };
  const next = () => {
    if (!canLoop) return;
    setIndex((prevIndex) => prevIndex + 1);
  };

  // Video playback effect
  useEffect(() => {
    if (prefersReducedMotion || !canLoop) return;

    const activeItem = items[realIndex];
    if (!activeItem) return;

    for (const item of items) {
      const vid = videoRefs.current[item.id];
      if (!vid) continue;
      const isActive = item.id === activeItem.id;
      if (isActive) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    }
  }, [realIndex, items, prefersReducedMotion, canLoop]);

  if (!items.length) return null;

  return (
    <div className={styles.wrap}>
      {/* Mobile arrows OUTSIDE + pulse */}
      {isMobile && canLoop ? (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`${styles.edgeArrow} ${styles.edgeLeft}`}
            aria-label="Previous project"
            onClick={prev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`${styles.edgeArrow} ${styles.edgeRight}`}
            aria-label="Next project"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      ) : null}

      <div
        ref={railRef}
        className={styles.rail}
        aria-label="Project previews carousel"
      >
        {loopedItems.map((item, i) => {
          const meta = (item.meta ?? []).slice(0, 3);
          const isActive = i === index;

          return (
            // We add a random component to the key for cloned items to satisfy React's key warning
            <article key={`${item.id}-${i}`} className={styles.slide}>
              {/* Visual-only background layers */}
              <div className={`${styles.preview} noPointer`} aria-hidden="true">
                {item.previewImage ? (
                  <img
                    className={`${styles.previewImg} noPointer`}
                    src={item.previewImage}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <div className={`${styles.previewTintOnly} noPointer`} />
                )}
                {!prefersReducedMotion && item.previewVideo ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    className={`${styles.previewVideo} noPointer ${
                      isActive ? styles.previewVideoActive : ""
                    }`}
                    src={item.previewVideo}
                    muted
                    playsInline
                    loop
                  />
                ) : null}
              </div>

              {/* Top overlay: badge + icon */}
              <div className={styles.overlayUi} aria-hidden="true">
                {item.badge ? (
                  <div className={styles.badge}>{item.badge}</div>
                ) : null}

                <div className={styles.iconSlot}>
                  {item.icon ?? <span className={styles.iconDot} />}
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.textBlock}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.subtitle}>{item.subtitle}</p>
                </div>

                {/* Bottom row: META | ARROWS | EYE */}
                <div className={styles.bottomRow}>
                  <div className={styles.meta}>
                    {meta.map((m) => (
                      <div className={styles.metaCell} key={m.label}>
                        <div className={styles.metaLabel}>{m.label}</div>
                        <div
                          className={`${styles.metaValue} ${
                            m.accent ? styles.accent : ""
                          }`}
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isMobile && canLoop ? (
                    <div className={styles.navCol}>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={styles.navBtn}
                        onClick={prev}
                        aria-label="Previous project"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={styles.navBtn}
                        onClick={next}
                        aria-label="Next project"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.navColPlaceholder} />
                  )}

                  {/* Eye column */}
                  <div className={styles.openCol}>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={styles.eyeBtn}
                      aria-label="Open preview"
                      aria-haspopup="dialog"
                      onClick={() => onOpen?.(items[realIndex])}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Dots below */}
      <div className={styles.dots} aria-label="Carousel pagination">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${
              i === realIndex ? styles.dotActive : ""
            }`}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
