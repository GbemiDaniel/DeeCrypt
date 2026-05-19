import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./PersonaCard.module.css";

/**
 * HARDWARE PHYSICS: Heavy mechanical spring.
 */
const FLIP_SPRING = {
    type: "spring" as const,
    mass: 2.5,
    stiffness: 60,
    damping: 20,
} satisfies Parameters<typeof motion.div>[0]["transition"];

interface PersonaCardProps {
    photoSrc?: string;
    photoAlt?: string;
    /** Controlled flip state triggered by parent */
    flipTrigger?: boolean;
}

export function PersonaCard({
    photoSrc = "/GbemiDaniel_Face.png",
    photoAlt = "Gbemi Daniel — the face behind Deecrypt",
    flipTrigger = false,
}: PersonaCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    /**
     * AUTOMATED BOOT SEQUENCE
     */
    useEffect(() => {
        if (flipTrigger) {
            setIsFlipped(true);
        }
    }, [flipTrigger]);

    /** Manual toggle */
    const handleFlip = () => setIsFlipped((prev) => !prev);

    return (
        <div
            className={styles.wrapper}
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
            // 1. THE CAMERA
            style={{ perspective: "1200px" }}
        >
            <motion.div
                className={styles.chassis}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={FLIP_SPRING}
                // 2. THE HINGE
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
                    {/* THE FIX: Forced 100% width/height on the well, and centered its contents */}
                    <div
                        className={styles.badgeWell}
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0" // Set to 0 to maximize zoom
                        }}
                    >
                        <img
                            src="/logos/Deecrypt logo.png"
                            alt="Deecrypt brand logo"
                            className={styles.brandLogo}
                            draggable={false}
                            // THE FIX: object-fit contain makes it scale up as much as possible without cropping
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
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            // THE FIX: Moves the center focus of the image up. Adjust percentage as needed.
                            objectPosition: "center 40%"
                        }}
                    />
                    <div className={styles.neonMask} aria-hidden="true" />
                </div>
            </motion.div>
        </div>
    );
}