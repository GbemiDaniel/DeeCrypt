import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import styles from "./PreviewCarousel.module.css";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";

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
  icon?: React.ReactNode;
  meta?: PreviewMeta[];
};

export type PreviewCarouselProps = {
  items: PreviewItem[];
  onOpen?: (item: PreviewItem) => void;
};

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
  const [api, setApi] = useState<CarouselApi>();
  const [realIndex, setRealIndex] = useState(0);

  const canLoop = items.length > 1;

  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = (api: CarouselApi) => {
      setRealIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    // Initial state
    onSelect(api);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goTo = (i: number) => {
    api?.scrollTo(i);
  };
  const prev = () => {
    api?.scrollPrev();
  };
  const next = () => {
    api?.scrollNext();
  };

  if (!items.length) return null;

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: canLoop,
        align: "start",
        duration: prefersReducedMotion ? 0 : 25,
      }}
      className={styles.wrap}
    >
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

      <CarouselContent className={`h-full ml-0 gap-4`}>
        {items.map((item) => {
          const meta = (item.meta ?? []).slice(0, 3);

          return (
            <CarouselItem key={item.id} className={`${styles.slide} pl-0`}>
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
              </div>

              {/* Top overlay: badge + icon */}
              <div className={styles.overlayUi} aria-hidden="true">
                {item.badge ? (
                  <div className={styles.badge}>{item.badge}</div>
                ) : null}

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

              <div className={styles.content}>
                <div className={styles.textBlock}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.subtitle}>{item.subtitle}</p>
                </div>

                {/* Bottom row: META | ARROWS */}
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
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

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
    </Carousel>
  );
}
