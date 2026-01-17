import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (open) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      <DialogContent className="max-w-[980px] w-[min(980px,92vw)] p-0 overflow-hidden">
        <div className="p-5 pb-4">
          {/* Brief info stays at the top on mobile */}
          <DialogHeader className="space-y-1">
            <div className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Project preview
            </div>

            <DialogTitle className="font-serif text-2xl leading-tight">
              {title}
            </DialogTitle>

            {description ? (
              <DialogDescription className="text-muted-foreground leading-7">
                {description}
              </DialogDescription>
            ) : null}
          </DialogHeader>

          {/* Mobile-first: media below header, then meta/actions.
              Desktop: media left, meta right. */}
          <div className="mt-4 flex flex-col gap-4 md:grid md:grid-cols-[1.25fr_1fr]">
            {/* Media */}
            <div className="rounded-xl border border-border/60 bg-black/20 overflow-hidden">
              <div className="w-full aspect-video md:aspect-auto md:min-h-[260px]">
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    loop
                  />
                ) : imageSrc ? (
                  <img
                    src={imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-b from-white/5 to-black/40" />
                )}
              </div>
            </div>

            {/* Meta + actions */}
            <div className="grid content-start gap-4">
              {meta?.length ? (
                <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-4 md:border-t-0 md:pt-0">
                  {meta.slice(0, 3).map((m) => (
                    <div key={m.label} className="min-w-0">
                      <div className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                        {m.label}
                      </div>
                      <div
                        className={[
                          "mt-1 text-sm truncate",
                          m.accent ? "text-primary" : "text-foreground",
                        ].join(" ")}
                        title={m.value}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {(primaryHref && primaryLabel) ||
              (secondaryHref && secondaryLabel) ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {primaryHref && primaryLabel ? (
                    <Button
                      asChild
                      className="rounded-full"
                      variant="secondary"
                    >
                      <a href={primaryHref} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {primaryLabel}
                      </a>
                    </Button>
                  ) : null}

                  {secondaryHref && secondaryLabel ? (
                    <Button asChild className="rounded-full" variant="outline">
                      <a href={secondaryHref} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        {secondaryLabel}
                      </a>
                    </Button>
                  ) : null}
                </div>
              ) : null}

              {/* Optional: room for “more info” later */}
              {/* <div className="text-sm text-muted-foreground leading-7">
                More project details can live here on mobile without breaking layout.
              </div> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
