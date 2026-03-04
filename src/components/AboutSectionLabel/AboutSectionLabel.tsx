import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./AboutSectionLabel.module.css";

export type LabelTone = "cyan" | "violet" | "gold" | "synthesis";

interface AboutSectionLabelProps {
    /** The full label text, e.g. "The Arsenal" */
    title: string;
    /** Which neon tone to apply to the Lit Cap and glass tail bleed */
    tone: LabelTone;
    className?: string;
}

const LIT_CAP_CLASS: Record<LabelTone, string> = {
    cyan: styles.litCyan,
    violet: styles.litViolet,
    gold: styles.litGold,
    synthesis: styles.litSynthesis,
};

const TAIL_CLASS: Record<LabelTone, string> = {
    cyan: styles.tailCyan,
    violet: styles.tailViolet,
    gold: styles.tailGold,
    synthesis: styles.tailSynthesis,
};

const grooveVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
};

const labelVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", mass: 2.5, stiffness: 60, damping: 20 },
    },
};

export function AboutSectionLabel({
    title,
    tone,
    className,
}: AboutSectionLabelProps) {
    const firstChar = title.charAt(0);
    const tail = title.slice(1);

    return (
        <motion.div
            className={cn(styles.wrapper, className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* The naked engraved label — no container, no pill */}
            <motion.h2 className={styles.label} variants={labelVariants}>
                {/* THE LIT CAP — the neon reservoir */}
                <span className={LIT_CAP_CLASS[tone]}>{firstChar}</span>
                {/* THE GLASS TAIL — dark translucent carved body */}
                <span className={cn(styles.glassTail, TAIL_CLASS[tone])}>{tail}</span>
            </motion.h2>

            {/* The single machined groove beneath */}
            <motion.div className={styles.groove} variants={grooveVariants} />
        </motion.div>
    );
}
