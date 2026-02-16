import { useEffect, useMemo, useState, type TouchEvent, type SyntheticEvent } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import styles from "./WriterCarousel.module.css";
import type { WriterPost } from "../../data/posts";

export type WriterCarouselProps = {
  items: WriterPost[];
  activeId?: string;
  onActiveIdChange?: (id: string) => void;
  onOpen?: (item: WriterPost) => void;
};

export default function WriterCarousel({
  items,
  activeId,
  onActiveIdChange,
  onOpen,
}: WriterCarouselProps) {
  const safeItems = items ?? [];

  const initialIndex = useMemo(() => {
    if (!safeItems.length) return 0;
    if (!activeId) return 0;
    const idx = safeItems.findIndex((x) => x.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [safeItems, activeId]);

  const [index, setIndex] = useState(initialIndex);
  
  // === NEW STATE ===
  // We track if the current slide's image has successfully loaded.
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => setIndex(initialIndex), [initialIndex]);

  const item = safeItems[index];
  const canGo = safeItems.length > 1;

  // Reset the "Loaded" state whenever the slide changes
  useEffect(() => {
    setIsImageLoaded(false);
  }, [item?.id]);

  function go(delta: number) {
    if (!canGo) return;
    const next = (index + delta + safeItems.length) % safeItems.length;
    setIndex(next);
    onActiveIdChange?.(safeItems[next].id);
  }

  function open() {
    if (!item) return;
    onOpen?.(item);
  }

  // Swipe handlers
  const minSwipeDistance = 50;
  function onTouchStart(e: TouchEvent) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }
  function onTouchMove(e: TouchEvent) {
    setTouchEnd(e.targetTouches[0].clientX);
  }
  function onTouchEnd() {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) go(1);
    if (isRightSwipe) go(-1);
    setTouchStart(null);
    setTouchEnd(null);
  }

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = "none";
    // If error, we ensure isImageLoaded stays false so background remains
    setIsImageLoaded(false); 
  };

  const handleImageLoad = () => {
    // Success! Now we can safely hide the default background
    setIsImageLoaded(true);
  };

  return (
    <div
      className={styles.card}
      /* === THE LOGIC FIX === */
      /* Only remove the default background if the new image exists AND has loaded. */
      style={{
        backgroundImage: (item?.previewImage && isImageLoaded) ? "none" : undefined
      }}
      /* ==================== */
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.preview} aria-hidden="true">
        <div className={styles.previewTint} />
        {item?.previewImage ? (
          <img 
            key={item.id} 
            className={styles.previewImg} 
            src={item.previewImage} 
            alt="" 
            onError={handleImageError}
            onLoad={handleImageLoad} // <--- Trigger the swap here
          />
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.kickerRow}>
          <div className={styles.kicker}>Latest essay</div>
          <div className={styles.platformPill}>{item?.platform ?? "Post"}</div>
        </div>

        <div className={styles.title} title={item?.title}>
          {item?.title ?? "—"}
        </div>

        <div className={styles.hook}>{item?.hook ?? ""}</div>

        <div className={styles.spacer} />

        <div className={styles.bottomRow}>
          <div className={styles.meta}>
            <span>{item?.date ?? ""}</span>
            <span className={styles.dot}>•</span>
            <span>{item?.readTime ?? ""}</span>
          </div>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => go(-1)}
              disabled={!canGo}
              aria-label="Previous post"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => go(1)}
              disabled={!canGo}
              aria-label="Next post"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className={styles.eye}>
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={open}
              aria-label="Open preview"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        <div className={styles.dots} aria-hidden="true">
          {safeItems.map((x, i) => (
            <span
              key={x.id}
              className={[
                styles.dotItem,
                i === index ? styles.dotActive : "",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <div className={styles.mobileArrows} aria-hidden="false">
        <button
          type="button"
          className={styles.mobileArrowBtn}
          onClick={() => go(-1)}
          disabled={!canGo}
          aria-label="Previous post"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          className={styles.mobileArrowBtn}
          onClick={() => go(1)}
          disabled={!canGo}
          aria-label="Next post"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}