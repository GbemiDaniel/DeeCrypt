import { Moon, Sun } from "lucide-react";
import styles from "./Navbar.module.css";
import Pill from "../Pill/Pill";
import type { Theme } from "../../app/modes";

type NavbarProps = {
  brand: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
};

export default function Navbar({ brand, theme, onThemeChange }: NavbarProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.brandWrap}>
            <div className={styles.logo} aria-hidden="true" />
            <div className={styles.brandText}>
              <div className={styles.brandName}>{brand}</div>
              <div className={styles.brandVer}>PORTFOLIO v1.0</div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <button
            className={styles.themeBtn}
            type="button"
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className={styles.themeIcon} aria-hidden="true" />
            ) : (
              <Moon className={styles.themeIcon} aria-hidden="true" />
            )}
          </button>

          <Pill tone="success" icon={<span />}>
            ONLINE
          </Pill>
        </div>
      </div>
    </header>
  );
}
