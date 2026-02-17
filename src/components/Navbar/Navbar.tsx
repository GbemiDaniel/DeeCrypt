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

  // 1. INTRO TIMER
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // 2. RESET ON MODE CHANGE
  useEffect(() => {
    setIsOpen(false);
    setIsHovered(false);
    setHoverState(false);
  }, [mode]);

  // 3. === THE MOBILE FIX ===
  // We listen for BOTH 'scroll' and 'touchmove'.
  // 'touchmove' fires immediately when you drag your finger, making it snappier on mobile.
  useEffect(() => {
    // We only care if the menu is visible (open or "hovered")
    if (!isOpen && !isHovered) return;

    const closeAll = () => {
      setIsOpen(false);
      setIsHovered(false);
      setHoverState(false); // Force-kill the global hover state
    };

    window.addEventListener("scroll", closeAll, { passive: true });
    window.addEventListener("touchmove", closeAll, { passive: true });

    return () => {
      window.removeEventListener("scroll", closeAll);
      window.removeEventListener("touchmove", closeAll);
    };
  }, [isOpen, isHovered]);

  const handleNav = (target: Mode) => {
    setIsOpen(false);
    setIsHovered(false);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    onModeChange(target);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const isScrolling = !!sectionLabel;
  const isIntroState = !isScrolling && showIntro;
  const shouldShowMenu = isOpen || isHovered || (!isScrolling && showIntro);
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
            // REMOVED: onTouchStart={() => setHoverState(true)}
            // This was the cause of the bug. No hover on touch!

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
            <div className={styles.themeIcon}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(Navbar);
