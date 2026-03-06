import {
  ExternalLink,
  X,
  BookOpen,
  Heart,
  MessageCircle,
  Repeat2,
  Linkedin,
  TerminalSquare,
  Globe2,
  ThumbsUp,
  Send
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { ChameleonPost, ChameleonPlatform } from "../../data/featuredPosts";
import styles from "./WriterDialog.module.css";

export type WriterDialogProps = {
  open: boolean;
  post?: ChameleonPost;
  onClose: () => void;
};

function PlatformIcon({ platform }: { platform?: ChameleonPlatform }) {
  if (platform === "X") return <X size={16} />;
  if (platform === "LinkedIn") return <Linkedin size={16} />;
  if (platform === "DevTo") return <TerminalSquare size={16} />;
  return <BookOpen size={16} />; // Medium / Default
}

function platformLabel(platform?: ChameleonPlatform) {
  if (!platform) return "Post";
  return platform;
}

export default function WriterDialog({
  open,
  post,
  onClose,
}: WriterDialogProps) {
  const platform = post?.platform || "Medium";
  const isX = platform === "X";
  const isLinkedIn = platform === "LinkedIn";

  // Chameleon skin class
  let cls = styles.isEssay;
  if (isX) cls = styles.isX;
  if (isLinkedIn) cls = styles.isLinkedIn;

  const likes = post?.metrics?.likes ?? 0;
  const replies = post?.metrics?.replies ?? 0;
  const reposts = post?.metrics?.reposts ?? 0;
  const views = post?.metrics?.views ?? 0;

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      <DialogContent className={[styles.shell, cls].join(" ")}>

        {/* ── HEADER (pinned — never scrolls) ─────────────────── */}
        <DialogHeader className={styles.header}>
          <div className={styles.kicker}>
            {isX ? "Post preview" : isLinkedIn ? "Update preview" : "Editorial"}
          </div>
          <DialogTitle className={styles.title}>
            {post?.title ?? ""}
          </DialogTitle>
        </DialogHeader>

        {/* ── SCROLL BODY (only this region scrolls) ───────────── */}
        <div className={styles.scrollBody}>

          {/* Author row */}
          <div className={styles.nativeTop}>
            <div className={styles.avatar} aria-hidden="true">
              {post?.author?.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt=""
                  className={styles.avatarImg}
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className={styles.author}>
              <div className={styles.authorName}>
                {post?.author?.name ?? ""}
                {isLinkedIn && (
                  <span style={{ color: "var(--muted)", fontWeight: 400, marginLeft: 6 }}>
                    • 2nd
                  </span>
                )}
              </div>
              <div className={styles.authorHandle}>
                {isLinkedIn ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {post?.author?.handle ?? ""} • {post?.date ?? ""} • <Globe2 size={12} />
                  </span>
                ) : (
                  post?.author?.handle ?? ""
                )}
              </div>
            </div>

            <div className={styles.platform} title={platformLabel(platform)}>
              {isLinkedIn ? (
                <span style={{ color: "#0a66c2", fontWeight: 600 }}>+ Follow</span>
              ) : (
                <>
                  <PlatformIcon platform={platform} />
                  <span>{platformLabel(platform)}</span>
                </>
              )}
            </div>
          </div>

          {/* Content paragraphs */}
          <div className={styles.nativeBody}>
            {(post?.content ?? []).map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>

          {/* X metrics row */}
          {isX && post?.metrics && (
            <div className={styles.metricsRow} aria-label="Post metrics">
              <span className={styles.metric}>
                <Heart className={styles.metricIcon} />
                {likes}
              </span>
              <span className={styles.metric}>
                <MessageCircle className={styles.metricIcon} />
                {replies}
              </span>
              <span className={styles.metric}>
                <Repeat2 className={styles.metricIcon} />
                {reposts}
              </span>
            </div>
          )}

          {/* LinkedIn metrics row */}
          {isLinkedIn && post?.metrics && (
            <div className={styles.metricsRowLinkedIn} aria-label="Post metrics">
              <div style={{ display: "flex", gap: "10px" }}>
                <span className={styles.metric}>
                  <ThumbsUp className={styles.metricIcon} size={14} />
                  {likes}
                </span>
                {replies > 0 && <span className={styles.metric}>{replies} comments</span>}
                {reposts > 0 && <span className={styles.metric}>{reposts} reposts</span>}
              </div>
              <div>
                {views > 0 ? `${views.toLocaleString()} impressions` : ""}
              </div>
            </div>
          )}

          {/* LinkedIn action bar */}
          {isLinkedIn && (
            <div
              className={styles.metricsRowLinkedIn}
              style={{ justifyContent: "space-around", padding: "12px 16px" }}
            >
              <span className={styles.metric} style={{ fontWeight: 600, fontSize: "14px", flexDirection: "column", gap: "4px" }}>
                <ThumbsUp className={styles.metricIcon} size={18} />
                Like
              </span>
              <span className={styles.metric} style={{ cursor: "default", fontWeight: 600, fontSize: "14px", flexDirection: "column", gap: "4px" }}>
                <MessageCircle className={styles.metricIcon} size={18} />
                Comment
              </span>
              <span className={styles.metric} style={{ cursor: "default", fontWeight: 600, fontSize: "14px", flexDirection: "column", gap: "4px" }}>
                <Repeat2 className={styles.metricIcon} size={18} />
                Repost
              </span>
              <span className={styles.metric} style={{ cursor: "default", fontWeight: 600, fontSize: "14px", flexDirection: "column", gap: "4px" }}>
                <Send className={styles.metricIcon} size={18} />
                Send
              </span>
            </div>
          )}

        </div>
        {/* end .scrollBody */}

        {/* ── FOOTER (pinned — CTA always visible) ─────────────── */}
        <footer className={styles.footer}>
          <div className={styles.footerMeta}>
            {!isLinkedIn && <span>{post?.date ?? ""}</span>}
            {!isLinkedIn && <span className={styles.dot}>•</span>}
            <span>{post?.readTime ?? ""}</span>
          </div>

          {post?.originalUrl && (
            <Button asChild variant="secondary" className={styles.readBtn}>
              <a href={post.originalUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Read on {platformLabel(platform)}
              </a>
            </Button>
          )}
        </footer>

      </DialogContent>
    </Dialog>
  );
}
