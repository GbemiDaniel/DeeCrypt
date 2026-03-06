import { Code, PenLine } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ModeToggle.module.css";

export default function ModeToggle() {
  const location = useLocation();
  const navigate = useNavigate();
  const isWriter = location.pathname === "/writer";

  return (
    <div className={styles.wrap} role="group" aria-label="Mode toggle">
      <button
        type="button"
        className={`${styles.btn} ${!isWriter ? `${styles.active} ${styles.devActive}` : ""}`}
        onClick={() => navigate("/")}
        aria-pressed={!isWriter}
        aria-label="Switch to Developer/Builder View"
      >
        <span className={styles.btnInner}>
          Dev
          <Code size={15} strokeWidth={2} aria-hidden="true" />
        </span>
      </button>

      <button
        type="button"
        className={`${styles.btn} ${isWriter ? `${styles.active} ${styles.writerActive}` : ""}`}
        onClick={() => navigate("/writer")}
        aria-pressed={isWriter}
        aria-label="Switch to Writer View"
      >
        <span className={styles.btnInner}>
          Writer
          <PenLine size={15} strokeWidth={2} aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
