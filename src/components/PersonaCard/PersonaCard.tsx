import { useState, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./PersonaCard.module.css";

const FLIP_SPRING = {
    type: "spring" as const,
    mass: 2.5,
    stiffness: 60,
    damping: 20,
} satisfies Parameters<typeof motion.div>[0]["transition"];

interface PersonaCardProps extends HTMLMotionProps<"div"> {
    photoSrc?: string;
    photoAlt?: string;
    flipTrigger?: boolean;
}

export function PersonaCard({
    photoSrc = "/GbemiDaniel_Face.png",
    photoAlt = "Gbemi Daniel — the face behind Deecrypt",
    flipTrigger = false,
    className,
    ...motionProps
}: PersonaCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // THE FIX: High-priority image preloading
    // Forces the browser to load the image into cache immediately on mount
    useEffect(() => {
        if (photoSrc) {
            const img = new Image();
            img.src = photoSrc;
        }
    }, [photoSrc]);

    useEffect(() => {
        if (flipTrigger) {
            setIsFlipped(true);
        }
    }, [flipTrigger]);

    const handleFlip = () => setIsFlipped((prev) => !prev);

    return (
        <motion.div
            className={`${styles.wrapper} ${className || ""}`}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            aria-label={isFlipped ? "Flip card back to logo view" : "Reveal the face behind Deecrypt"}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleFlip();
                }
            }}
            style={{ perspective: "1200px" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...motionProps}
        >
            <motion.div
                className={styles.chassis}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={FLIP_SPRING}
                style={{
                    transformStyle: "preserve-3d",
                    position: "relative",
                    width: "100%",
                    height: "100%"
                }}
            >
                {/* ── SIDE A: DORMANT HARDWARE BADGE (FRONT) ── */}
                <div
                    className={styles.faceA}
                    aria-hidden={isFlipped}
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div
                        className={styles.badgeWell}
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0"
                        }}
                    >
                        <img
                            src="/logos/Deecrypt logo.png"
                            alt="Deecrypt brand logo"
                            className={styles.brandLogo}
                            draggable={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                </div>

                {/* ── SIDE B: ACTIVATED (BACK) ── */}
                <div
                    className={styles.faceB}
                    aria-hidden={!isFlipped}
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        overflow: "hidden"
                    }}
                >
                    <img
                        src={photoSrc}
                        alt={photoAlt}
                        className={styles.photo}
                        draggable={false}
                        // Ensure modern browsers prioritize this image
                        fetchPriority="high"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center 40%"
                        }}
                    />
                    <div className={styles.neonMask} aria-hidden="true" />
                </div>
            </motion.div>
        </motion.div>
    );
}