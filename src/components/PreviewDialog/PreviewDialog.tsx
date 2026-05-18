import {
  ExternalLink,
  Github,
  MonitorPlay,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import styles from "./PreviewDialog.module.css";

export type PreviewDialogMeta = {
  label: string;
  value: string;
  accent?: boolean;
};

export type PreviewDialogProps = {
  open: boolean;
  title: string;
  imageSrc?: string;
  // ✅ UPDATED: Now supports the device-aware object, or falls back to standard array
  gallery?: { desktop: string[]; mobile?: string[] } | string[];
  videoSrc?: string;
  description?: string;
  highlights?: string[];
  highlightsTitle?: string;
  meta?: PreviewDialogMeta[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  onClose: () => void;
  layout?: "default" | "flipped";
};

export default function PreviewDialog({
  open,
  title,
  imageSrc,
  gallery,
  videoSrc,
  description,
  highlights,
  highlightsTitle = "Key Highlights",
  meta,
  primaryHref,
  primaryLabel,
  secondaryHref,
  onClose,
  layout = "default",
}: PreviewDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if we actually have mobile images in the data
  const hasMobileImages =
    gallery !== undefined &&
    !Array.isArray(gallery) &&
    Array.isArray(gallery.mobile) &&
    gallery.mobile.length > 0;

  // ✅ SMART INITIALIZATION: Check screen size on mount
  useEffect(() => {
    if (open) {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      // Default to mobile images if they exist AND user is on a phone
      setViewMode(isMobileDevice && hasMobileImages ? "mobile" : "desktop");
      setActiveIndex(0);
    }
  }, [open, hasMobileImages]);

  // ✅ DYNAMIC SLIDE MAPPING
  const slides = useMemo(() => {
    const list = [];

    // 1. Handle the new device-aware gallery object
    if (gallery && !Array.isArray(gallery)) {
      const activeGallery =
        viewMode === "mobile" && hasMobileImages
          ? gallery.mobile
          : gallery.desktop;

      if (Array.isArray(activeGallery)) {
        activeGallery.forEach((img) => list.push({ type: "image", src: img }));
      }
    }
    // 2. Fallback for older projects that still pass a flat string[]
    else if (Array.isArray(gallery)) {
      gallery.forEach((img) => list.push({ type: "image", src: img }));
    }

    // 3. Append video if it exists
    if (videoSrc) list.push({ type: "video", src: videoSrc });

    // 4. Ultimate fallback: Just show the main cover image
    if (list.length === 0 && imageSrc) {
      list.push({ type: "image", src: imageSrc });
    }

    return list;
  }, [gallery, viewMode, hasMobileImages, videoSrc, imageSrc]);

  useEffect(() => {
    const currentSlide = slides[activeIndex];
    if (currentSlide?.type !== "video" && videoRef.current) {
      videoRef.current.pause();
    }
  }, [activeIndex, slides]);

  const goToSlide = (idx: number) => {
    if (idx >= 0 && idx < slides.length) setActiveIndex(idx);
  };
  const nextSlide = () => goToSlide((activeIndex + 1) % slides.length);
  const prevSlide = () =>
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  const videoIndex = slides.findIndex((s) => s.type === "video");

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      <DialogContent
        className={cn(
          styles.dialogContent,
          "max-w-[1100px] w-[96vw] h-[85vh] md:h-[650px] p-0 gap-0 border-0",
          "[&>button[aria-label='Close']]:hidden" // Hides Shadcn default button
        )}
      >
        <button
          onClick={onClose}
          className={styles.glassCloseBtn}
          aria-label="Close Preview"
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        <div className={cn(styles.root, layout === "flipped" && styles.rootFlipped)}>
          {/* === MEDIA STAGE === */}
          <div className="relative w-full h-[45vh] md:h-full md:w-[60%] bg-black group shrink-0">

            {/* ✅ THE GLASSMORPHIC DEVICE TOGGLE */}
            {hasMobileImages && (
              <div className="absolute top-4 left-4 z-40 flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("desktop");
                    setActiveIndex(0);
                  }}
                  className={cn(
                    "p-1.5 rounded-full transition-all duration-200 flex items-center justify-center",
                    viewMode === "desktop"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/50 hover:text-white/90 hover:bg-white/10"
                  )}
                  aria-label="View desktop layout"
                >
                  <Monitor size={15} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("mobile");
                    setActiveIndex(0);
                  }}
                  className={cn(
                    "p-1.5 rounded-full transition-all duration-200 flex items-center justify-center",
                    viewMode === "mobile"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/50 hover:text-white/90 hover:bg-white/10"
                  )}
                  aria-label="View mobile layout"
                >
                  <Smartphone size={15} />
                </button>
              </div>
            )}

            <div className="w-full h-full relative overflow-hidden">
              {slides.map((slide, idx) => (
                <div
                  key={`${viewMode}-${idx}`} // Forces re-render of animation when mode switches
                  className={cn(
                    styles.slide,
                    idx === activeIndex && styles.slideActive
                  )}
                >
                  {slide.type === "image" ? (
                    <>
                      <img
                        src={slide.src}
                        className={styles.backdropImg}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src={slide.src}
                        alt={`Preview Slide ${idx + 1}`}
                        className={styles.containImg}
                        loading="lazy"
                        decoding="async"
                      />
                    </>
                  ) : (
                    <video
                      ref={videoRef}
                      src={slide.src}
                      poster={imageSrc}
                      className="w-full h-full object-contain relative z-10 bg-black"
                      controls
                      playsInline
                      preload="none"
                    />
                  )}
                </div>
              ))}
            </div>

            {slides.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className={cn(
                    styles.navBtn,
                    "hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 z-30"
                  )}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className={cn(
                    styles.navBtn,
                    "hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 z-30"
                  )}
                >
                  <ChevronRight size={24} />
                </button>

                <div className={styles.dotsContainer}>
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={cn(
                        styles.dot,
                        idx === activeIndex && styles.dotActive
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* === CONTENT PANEL === */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[var(--bg)]">
            <div className="p-5 pb-2 shrink-0">
              <div className="text-[var(--muted)] text-[10px] uppercase tracking-widest font-semibold mb-1.5">
                Project Detail
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)] font-sans tracking-tight">
                {title}
              </h2>
            </div>
            <div
              className={cn(
                styles.scrollArea,
                "flex-1 overflow-y-auto p-5 pt-2 space-y-6"
              )}
            >
              {description && (
                <p className="text-[var(--muted)] leading-relaxed text-sm whitespace-pre-wrap">
                  {description}
                </p>
              )}

              {Array.isArray(highlights) && highlights.length > 0 && (
                <div className="bg-[var(--surface-1)]/50 rounded-xl p-4 border border-[var(--border-soft)]">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--accent)] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {highlightsTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    {highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[var(--text)]/90"
                      >
                        <CheckCircle2
                          size={15}
                          className="shrink-0 mt-0.5 text-[var(--muted)] opacity-70"
                        />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {videoSrc && videoIndex !== -1 && activeIndex !== videoIndex && (
                <button
                  onClick={() => goToSlide(videoIndex)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] text-[var(--accent)] text-sm font-medium hover:brightness-110 transition-all"
                >
                  <MonitorPlay size={16} />
                  Watch Video Demo
                </button>
              )}

              {Array.isArray(meta) && meta.length > 0 && (
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-4 border-t border-[var(--border)]">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <div className="text-[9px] uppercase tracking-wider text-[var(--muted)] opacity-70">
                        {m.label}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-medium mt-1 truncate",
                          m.accent
                            ? "text-[var(--accent)]"
                            : "text-[var(--text)]"
                        )}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(primaryHref || secondaryHref) && (
              <div className="p-5 pt-4 mt-auto border-t border-[var(--border)] bg-[var(--bg)]/50 shrink-0">
                <div className="flex gap-3">
                  {primaryHref && (
                    <a
                      href={primaryHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20"
                    >
                      <ExternalLink size={16} />
                      {primaryLabel || "Visit Live"}
                    </a>
                  )}
                  {secondaryHref && (
                    <a
                      href={secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}