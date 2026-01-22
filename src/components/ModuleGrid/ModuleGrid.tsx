import styles from "./ModuleGrid.module.css";

type ModuleGridProps = {
  left: React.ReactNode;
  rightTop: React.ReactNode;
  rightBottom: React.ReactNode;
};

export default function ModuleGrid({
  left,
  rightTop,
  rightBottom,
}: ModuleGridProps) {
  return (
    <section className={styles.grid}>
      <div className={styles.left}>{left}</div>
      <div className={styles.rightColumn}>
        <div className={styles.rightTop}>{rightTop}</div>
        <div className={styles.rightBottom}>{rightBottom}</div>
      </div>
    </section>
  );
}
