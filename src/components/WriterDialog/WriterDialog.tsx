import {
  ExternalLink,
  X,
  BookOpen,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { WriterPost } from "../../data/posts";
import styles from "./WriterDialog.module.css";

export type WriterDialogProps = {
  open: boolean;
  post?: WriterPost;
  onClose: () => void;
};

function PlatformIcon({ platform }: { platform?: WriterPost["platform"] }) {
  if (platform === "X") return <X size={16} />;
  return <BookOpen size={16} />;
}

function platformLabel(platform?: WriterPost["platform"]) {
  if (platform === "X") return "X";
  if (platform === "Medium") return "Medium";
  return "Mirror";
}

export default function WriterDialog({
  open,
  post,
  onClose,
}: WriterDialogProps) {
  const isX = post?.platform === "X";
  const cls = isX ? styles.isX : styles.isEssay;

  const likes = post?.metrics?.likes ?? 0;
  const replies = post?.metrics?.replies ?? 0;
  const reposts = post?.metrics?.reposts ?? 0;
  const showMetrics = isX && !!post?.metrics;

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      <DialogContent className={[styles.content, cls].join(" ")}>
        <div className={styles.wrap}>
          <DialogHeader className={styles.header}>
            <div className={styles.kicker}>
              {isX ? "Post preview" : "Editorial"}
            </div>

            <DialogTitle className={styles.title}>
              {post?.title ?? ""}
            </DialogTitle>
          </DialogHeader>

          {/* Native preview shell */}
          <div className={styles.native}>
            <div className={styles.nativeTop}>
              <div className={styles.avatar} aria-hidden="true">
                {post?.avatarUrl ? (
                  <img
                    src={post.avatarUrl}
                    alt=""
                    className={styles.avatarImg}
                    loading="lazy"
                  />
                ) : null}
              </div>

              <div className={styles.author}>
                <div className={styles.authorName}>
                  {post?.authorName ?? ""}
                </div>
                <div className={styles.authorHandle}>
                  {post?.authorHandle ?? ""}
                </div>
              </div>

              <div
                className={styles.platform}
                title={platformLabel(post?.platform)}
              >
                <PlatformIcon platform={post?.platform} />
                <span>{platformLabel(post?.platform)}</span>
              </div>
            </div>

            <div className={styles.nativeBody}>
              {(post?.body ?? []).map((p, i) => (
                <p key={i} className={styles.paragraph}>
                  {p}
                </p>
              ))}
            </div>

            {/* X-style metrics row */}
            {showMetrics ? (
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
            ) : null}

            <div className={styles.nativeFooter}>
              <div className={styles.footerMeta}>
                <span>{post?.date ?? ""}</span>
                <span className={styles.dot}>•</span>
                <span>{post?.readTime ?? ""}</span>
              </div>

              {post?.href ? (
                <Button asChild variant="secondary" className={styles.readBtn}>
                  <a href={post.href} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Read on {platformLabel(post.platform)}
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
