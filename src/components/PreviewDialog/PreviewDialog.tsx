import {
  ExternalLink,
  Github,
  MonitorPlay,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Mode } from "../../app/modes";
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
  gallery?: string[];
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
  mode?: Mode;
  layout?: "default" | "flipped";
};

export default function PreviewDialog({
  open,
  title,
  imageSrc,
  gallery = [],
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

  const slides = useMemo(() => {
    const list = [];
    if (imageSrc) list.push({ type: "image", src: imageSrc });

    if (Array.isArray(gallery) && gallery.length > 0) {
      gallery.forEach((img) => list.push({ type: "image", src: img }));
    }

    if (videoSrc) list.push({ type: "video", src: videoSrc });
    return list;
  }, [imageSrc, gallery, videoSrc]);

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open) setActiveIndex(0);
  }, [open]);

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
          "max-w-[1100px] w-[96vw] h-[85vh] md:h-[650px] p-0 gap-0 border-0", // <-- Removed "relative" to restore "fixed" centering
          "[&>button[aria-label='Close']]:hidden" // <-- Precisely hides Shadcn's default button
        )}
      >
        {/* OUR PREMIUM BUTTON: Uses aria-label="Close Preview" so it survives the class above */}
        <button
          onClick={onClose}
          className={styles.glassCloseBtn}
          aria-label="Close Preview"
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        <div className={cn(styles.root, layout === "flipped" && styles.rootFlipped)}>

          {/* === MEDIA STAGE (Always Dark) === */}
          <div className="relative w-full h-[45vh] md:h-full md:w-[60%] bg-black group shrink-0">
            <div className="w-full h-full relative overflow-hidden">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={cn(
                    styles.slide,
                    idx === activeIndex && styles.slideActive,
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
                    "hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 z-30",
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
                    "hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 z-30",
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
                        idx === activeIndex && styles.dotActive,
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
                "flex-1 overflow-y-auto p-5 pt-2 space-y-6",
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
                            : "text-[var(--text)]",
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