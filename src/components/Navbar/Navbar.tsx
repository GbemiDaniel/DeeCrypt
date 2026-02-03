import { useEffect, useState, memo } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./Navbar.module.css";
import type { Theme, Mode } from "../../app/modes";
import { useNavState, setHoverState } from "../../hooks/useScrollSpy";

type NavbarProps = {
  brand: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  mode: Mode;
  onModeChange: (m: Mode) => void;
};

function Navbar({
  brand,
  theme,
  onThemeChange,
  mode,
  onModeChange,
}: NavbarProps) {
  const { sectionLabel } = useNavState();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsHovered(false);
    setHoverState(false);
  }, [mode]);

  const handleNav = (target: Mode) => {
    setIsOpen(false);
    setIsHovered(false);

    // FORCE BLUR: Removes focus from the clicked link immediately
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    onModeChange(target);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // --- VISIBILITY LOGIC ---
  const isScrolling = !!sectionLabel;
  const isIntroState = !isScrolling && showIntro;
  const shouldShowMenu = isOpen || isHovered || (!isScrolling && !showIntro);
  const shouldShowLabel = isScrolling && !shouldShowMenu;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div
            className={`${styles.brandWrap} ${
              shouldShowMenu ? styles.showMenu : ""
            }`}
            onClick={handleToggle}
            onMouseEnter={() => {
              setIsHovered(true);
              setHoverState(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsOpen(false);
              setHoverState(false);
            }}
            onTouchStart={() => setHoverState(true)}
            // Accessibility: Allow opening menu via Enter key
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            <img
              src="/logos/Deecrypt logo.png"
              className={styles.logo}
              alt="Logo"
            />

            <div className={styles.brandText}>
              <div className={styles.brandName}>{brand}</div>

              <div className={styles.brandVer}>
                {/* 1. SCROLL LABEL */}
                <div
                  className={styles.statusLabel}
                  style={{
                    opacity: shouldShowLabel ? 1 : 0,
                    transform: shouldShowLabel
                      ? "translateY(0)"
                      : "translateY(5px)",
                  }}
                >
                  {sectionLabel}
                </div>

                {/* 2. INTRO LABEL */}
                <div
                  className={styles.introLabel}
                  style={{
                    opacity: isIntroState && !shouldShowMenu ? 1 : 0,
                    transform:
                      isIntroState && !shouldShowMenu
                        ? "translateY(0)"
                        : "translateY(-5px)",
                  }}
                >
                  {mode === "about" ? "THE STORY" : "DEV | WRITER"}
                </div>

                {/* 3. MENU */}
                <div
                  className={styles.navMenu}
                  style={{
                    opacity: shouldShowMenu ? 1 : 0,
                    transform: shouldShowMenu
                      ? "translateY(0)"
                      : "translateY(5px)",
                    pointerEvents: shouldShowMenu ? "auto" : "none",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNav("about");
                    }}
                    // STORY: Merged Color + Pulse
                    className={`${styles.navLink} ${
                      mode === "about" ? styles.activeAbout : ""
                    }`}
                  >
                    Story
                  </button>
                  <span className={styles.separator}>•</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNav("dev");
                    }}
                    // DEV: Standard Cyan
                    className={`${styles.navLink} ${
                      mode === "dev" ? styles.activeDev : ""
                    }`}
                  >
                    Dev
                  </button>
                  <span className={styles.separator}>•</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNav("writer");
                    }}
                    // WRITER: Correct Purple Accent
                    className={`${styles.navLink} ${
                      mode === "writer" ? styles.activeWriter : ""
                    }`}
                  >
                    Writer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <button
            className={styles.themeBtn}
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(Navbar);
