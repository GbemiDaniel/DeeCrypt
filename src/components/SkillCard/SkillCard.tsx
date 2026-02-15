import type { ReactNode } from "react";
import styles from "./SkillCard.module.css";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  type: string; // 'dev' | 'web3' | 'writer'
};

export function SkillCard({ title, description, icon, type }: Props) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.iconBox} data-type={type}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}