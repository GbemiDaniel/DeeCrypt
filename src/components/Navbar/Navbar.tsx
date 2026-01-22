import { Moon, Sun } from "lucide-react";
import styles from "./Navbar.module.css";
// import Pill from "../Pill/Pill"; // Removed if unused
import type { Theme, Mode } from "../../app/modes"; // 1. Import Mode

type NavbarProps = {
  brand: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  // 2. Add the navigation props here
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

export default function Navbar({
  brand,
  theme,
  onThemeChange,
  mode,
  onModeChange,
}: NavbarProps) {
  // 3. Smart Toggle: If on About, go Home. If on Home, go About.
  const handleBrandClick = () => {
    if (mode === "about") {
      onModeChange("dev"); // Go back to portfolio
    } else {
      onModeChange("about"); // Go to story
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          {/* 4. Make the Brand Wrapper Clickable */}
          <div
            className={styles.brandWrap}
            onClick={handleBrandClick}
            role="button"
            tabIndex={0}
            title={mode === "about" ? "Back to Portfolio" : "Read my Story"}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/logos/Deecrypt logo.png"
              className={styles.logo}
              alt={`${brand} logo`}
            />
            <div className={styles.brandText}>
              <div className={styles.brandName}>{brand}</div>
              {/* 5. Dynamic Subtext */}
              <div className={styles.brandVer}>
                {mode === "about" ? "THE STORY" : "DEV | WRITER"}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {/* Optional: Add an explicit text link if you want it next to the theme toggle */}
          {/* <button 
             onClick={() => onModeChange('about')}
             style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginRight: '1rem' }}
          >
             About
          </button> 
          */}

          <button
            className={styles.themeBtn}
            type="button"
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className={styles.themeIcon} aria-hidden="true" />
            ) : (
              <Moon className={styles.themeIcon} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
