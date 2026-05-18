import { ReactNode, HTMLAttributes } from 'react';
import styles from './GlassCard.module.css';

function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    layout?: 'default' | 'horizontal' | 'centered';
    hasImage?: boolean;
    hasDiagram?: boolean;
    hasRays?: boolean;
    hasGlow?: boolean;
    variant?: 'default' | 'accent' | 'subtle';
    className?: string;
    image?: ReactNode;
    diagram?: ReactNode;
    children?: ReactNode;
}

export function GlassCard({
    size = 'md',
    layout = 'default',
    hasImage = false,
    hasDiagram = false,
    hasRays = false,
    hasGlow = false,
    variant = 'default',
    className = '',
    image,
    diagram,
    children,
    ...props
}: GlassCardProps) {
    const cardClasses = classNames(
        styles.card,
        styles[size],
        layout !== 'default' && styles[layout],
        variant !== 'default' && styles[variant],
        hasRays && styles.hasRays,
        hasGlow && styles.hasGlow,
        hasImage && styles.hasImage,
        hasDiagram && styles.hasDiagram,
        className
    );

    const renderMedia = () => {
        if (hasImage && image) {
            return <div className={styles.imageSlot}>{image}</div>;
        }
        if (hasDiagram && diagram) {
            return <div className={styles.diagramSlot}>{diagram}</div>;
        }
        return null;
    };

    return (
        <div className={cardClasses} {...props}>
            {layout === 'horizontal' ? (
                <>
                    <div className={styles.contentSlot}>{children}</div>
                    {renderMedia()}
                </>
            ) : (
                <>
                    {renderMedia()}
                    <div className={styles.contentSlot}>{children}</div>
                </>
            )}
        </div>
    );
}

export default GlassCard;
