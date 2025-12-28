import { useEffect, useMemo, useRef, useState } from "react";
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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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

  // Track each slide's video element (so we can play/pause safely)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  const safeIndex = useMemo(
    () => clamp(index, 0, Math.max(0, items.length - 1)),
    [index, items.length]
  );

  // Mobile breakpoint (arrows outside)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Scroll active slide into view on index change (horizontal only)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children.item(safeIndex) as HTMLElement | null;
    if (!el) return;
    rail.scrollTo({
      left: el.offsetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [safeIndex, prefersReducedMotion]);

  // Update index based on scroll position (swipe support)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(rail.children) as HTMLElement[];
        if (!children.length) return;

        const railRect = rail.getBoundingClientRect();
        const railCenter = railRect.left + railRect.width / 2;

        let best = 0;
        let bestDist = Infinity;

        children.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const center = r.left + r.width / 2;
          const dist = Math.abs(center - railCenter);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });

        setIndex(best);
      });
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => setIndex(clamp(i, 0, items.length - 1));
  const prev = () => goTo(safeIndex - 1);
  const next = () => goTo(safeIndex + 1);

  // ✅ Play only active video; pause & reset the rest
  useEffect(() => {
    if (prefersReducedMotion) return;

    const activeId = items[safeIndex]?.id;
    if (!activeId) return;

    for (const item of items) {
      const vid = videoRefs.current[item.id];
      if (!vid) continue;

      const isActive = item.id === activeId;

      if (isActive) {
        // Try to play. If blocked (some browsers), silently ignore.
        vid.currentTime = 0;
        const p = vid.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        vid.pause();
        try {
          vid.currentTime = 0;
        } catch {
          // ignore
        }
      }
    }
  }, [safeIndex, items, prefersReducedMotion]);

  if (!items.length) return null;

  return (
    <div className={styles.wrap}>
      {/* Mobile arrows OUTSIDE + pulse */}
      {isMobile ? (
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
        {items.map((item, i) => {
          const meta = (item.meta ?? []).slice(0, 3);
          const isActive = i === safeIndex;

          return (
            <article key={item.id} className={styles.slide}>
              {/* Visual-only background layers */}
              <div className={`${styles.preview} noPointer`} aria-hidden="true">
                {/* Image base */}
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

                {/* ✅ Video overlay (only shown when active, and only if allowed) */}
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
                    preload={isActive ? "metadata" : "none"}
                  />
                ) : null}

                {/* Tint on top */}
                <div className={`${styles.previewTint} noPointer`} />
              </div>

              {/* Top overlay: icon + badge */}
              <div className={styles.overlayUi} aria-hidden="true">
                <div className={styles.iconSlot}>
                  {item.icon ?? <span className={styles.iconDot} />}
                </div>

                {item.badge ? (
                  <div className={styles.badge}>{item.badge}</div>
                ) : null}
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

                  {/* Desktop arrows column */}
                  {!isMobile ? (
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
                      onClick={() => onOpen?.(item)}
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
              i === safeIndex ? styles.dotActive : ""
            }`}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
