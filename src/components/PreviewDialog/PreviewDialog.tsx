import {
  ExternalLink,
  Github,
  Play,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { cn } from "@/lib/utils"; // Assuming you have this helper

export type PreviewDialogMeta = {
  label: string;
  value: string;
  accent?: boolean;
};

export type PreviewDialogProps = {
  open: boolean;
  title: string;
  imageSrc?: string;
  videoSrc?: string;
  description?: string;
  meta?: PreviewDialogMeta[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  onClose: () => void;
};

export default function PreviewDialog({
  open,
  title,
  imageSrc,
  videoSrc,
  description,
  meta,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  onClose,
}: PreviewDialogProps) {
  // 1. STATE: Toggle between Video and Image
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 2. RESET: Always go back to Image when re-opening
  useEffect(() => {
    if (open) setShowVideo(false);
  }, [open]);

  // 3. AUTO-PLAY Logic (Only when user explicitly asks for video)
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      {/* TRANSLATING YOUR CSS TO TAILWIND:
         .dialog -> bg-[#0a0e12]/92, border-white/10, rounded-[22px]
      */}
      <DialogContent
        className={cn(
          "max-w-[980px] w-[min(980px,96vw)] p-0 gap-0",
          "bg-[#0a0e12]/95 backdrop-blur-md border border-white/10",
          "rounded-[22px] shadow-2xl overflow-hidden block",
        )}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between p-[18px] pb-0">
          <div className="space-y-1.5">
            <div className="text-zinc-500 tracking-[0.14em] uppercase text-[0.72rem] font-medium">
              Project Preview
            </div>
            <h2 className="font-serif font-semibold tracking-tight text-zinc-100 text-[clamp(1.2rem,2.4vw,1.8rem)] leading-tight">
              {title}
            </h2>
          </div>

          {/* Custom Close Button matching your CSS (.close) */}
          <button
            onClick={onClose}
            className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY (.body) -> Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5 p-[18px]">
          {/* MEDIA AREA (.media) */}
          <div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-black/30 min-h-[220px] md:min-h-[280px] group">
            {/* A. VIDEO VIEW */}
            {showVideo && videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover block"
                controls
                playsInline
                loop
              />
            ) : /* B. IMAGE VIEW */
            imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover block"
              />
            ) : (
              /* Fallback gradient if no image */
              <div className="w-full h-full bg-gradient-to-b from-sky-500/10 to-black/60" />
            )}

            {/* C. THE TOGGLE SWITCH (The "Icon by the side" you requested) */}
            {/* Only shows if both options exist */}
            {videoSrc && imageSrc && (
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium text-white transition-all transform hover:scale-105"
                >
                  {showVideo ? (
                    <>
                      <ImageIcon size={14} />
                      <span>Show Image</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>Preview Video</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* CONTENT AREA (.content) */}
          <div className="flex flex-col gap-4">
            {/* Description */}
            {description && (
              <p className="text-zinc-400 leading-[1.7] text-[0.95rem]">
                {description}
              </p>
            )}

            {/* Meta Grid (.metaRow) */}
            {meta && meta.length > 0 && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {meta.slice(0, 3).map((m) => (
                  <div key={m.label} className="min-w-0">
                    <div className="text-zinc-500 text-[0.7rem] uppercase tracking-wider font-medium">
                      {m.label}
                    </div>
                    <div
                      className={cn(
                        "mt-1.5 text-[0.95rem] truncate",
                        m.accent ? "text-sky-400" : "text-zinc-200",
                      )}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions (.actions) */}
            {(primaryHref || secondaryHref) && (
              <div className="flex flex-wrap gap-2.5 pt-2 mt-auto">
                {primaryHref && (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-100 hover:bg-sky-500/20 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    {primaryLabel || "Visit Site"}
                  </a>
                )}

                {secondaryHref && (
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    <Github size={16} />
                    {secondaryLabel || "Source Code"}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
