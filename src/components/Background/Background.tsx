import { memo } from "react";
import styles from "./Background.module.css";

function Background() {
  return <div className={styles.fixedLayer} aria-hidden="true" />;
}

export default memo(Background);
