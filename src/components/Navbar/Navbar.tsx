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
  // 1. Performance: Listen for scroll section updates
  const { sectionLabel } = useNavState();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 2. RESET ON MODE CHANGE
  useEffect(() => {
    setIsOpen(false);
    setIsHovered(false);
    setHoverState(false);
  }, [mode]);

  // 3. MOBILE FIX: Close menu instantly when dragging/scrolling
  // This prevents the menu from getting "stuck" open
  useEffect(() => {
    if (!isOpen && !isHovered) return;

    const closeAll = () => {
      setIsOpen(false);
      setIsHovered(false);
      setHoverState(false);
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

  const handleToggle = () => setIsOpen((prev) => !prev);

  // --- VISIBILITY LOGIC ---
  
  // 1. Are we currently scrolling through a section?
  const isScrolling = !!sectionLabel;

  // 2. Should we show the Menu (Story • Dev • Writer)?
  // Show if: 
  // - Manually Open OR Hovered
  // - OR We are at the top of the page (NOT scrolling)
  const shouldShowMenu = isOpen || isHovered || !isScrolling;

  // 3. Should we show the Label (e.g. "PROJECTS")?
  // Show if: We ARE scrolling AND the menu is hidden
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
            // Note: No onTouchStart to prevent "sticky hover" bugs on mobile
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
                {/* 1. SCROLL LABEL (Visible only when scrolling) */}
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

                {/* 2. MENU LINKS (Default view & Hover view) */}
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