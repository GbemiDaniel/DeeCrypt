import { useEffect, useMemo, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import styles from "./WriterCarousel.module.css";
import type { ChameleonPost } from "../../data/featuredPosts";

export type WriterCarouselProps = {
  items: ChameleonPost[];
  activeId?: string;
  onActiveIdChange?: (id: string) => void;
  onOpen?: (item: ChameleonPost) => void;
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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => setIndex(initialIndex), [initialIndex]);

  const item = safeItems[index];
  const canGo = safeItems.length > 1;

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

  return (
    <div
      className={styles.card}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.preview} aria-hidden="true">
        <div className={styles.previewTint} />
      </div>

      <div className={styles.body}>
        <div className={styles.kickerRow}>
          <div className={styles.kicker}>Latest essay</div>
          <div className={styles.platformPill}>{item?.platform ?? "Post"}</div>
        </div>

        <div className={styles.title} title={item?.title}>
          {item?.title ?? "—"}
        </div>

        {item?.tags && item.tags.length > 0 && (
          <div className={styles.tagsRow} aria-label="Topics">
            {item.tags.map((tag) => (
              <span key={tag} className={styles.tagPill}>
                <span className={styles.statusDot} aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {item?.tldr && (
          <div className={styles.tldrPanel}>
            <p className={styles.tldrText}>{item.tldr}</p>
          </div>
        )}

        {/* Spacer: absorbs flex space between tags and footer, footer pinned to bottom */}
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