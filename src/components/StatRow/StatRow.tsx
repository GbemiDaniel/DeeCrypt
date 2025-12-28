import styles from "./StatRow.module.css";

type Stat = {
  label: string;
  value: string;
  accent?: boolean;
};

type StatRowProps = {
  stats: Stat[];
};

export default function StatRow({ stats }: StatRowProps) {
  return (
    <div className={styles.row}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <div className={styles.label}>{s.label}</div>
          <div className={`${styles.value} ${s.accent ? styles.accent : ""}`}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
