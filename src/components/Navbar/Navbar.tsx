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
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    onModeChange(target);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // --- THE FIX: STRICT VISIBILITY LOGIC ---

  // 1. Are we scrolling?
  const isScrolling = !!sectionLabel;

  // 2. Are we in the intro phase? (Only if NOT scrolling)
  const isIntroState = !isScrolling && showIntro;

  // 3. Should the MENU be visible?
  // YES if: Mobile Open OR Desktop Hover OR (Not Scrolling AND Not Intro)
  const shouldShowMenu = isOpen || isHovered || (!isScrolling && !showIntro);

  // 4. Should the LABEL be visible?
  // YES if: Scrolling AND Menu is NOT showing (Hover beats Scroll)
  const shouldShowLabel = isScrolling && !shouldShowMenu;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div
            className={`${styles.brandWrap} ${shouldShowMenu ? styles.showMenu : ""}`}
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
                    // FIX: Use 'shouldShowLabel' instead of just 'isScrolling'
                    // This forces it to hide if the menu overrides it.
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
                    // Hide if Menu is forced open
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
                {/* We can rely on the class .showMenu from CSS, but keeping inline style
                    logic here ensures double safety against overlap */}
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
                    className={`${styles.navLink} ${mode === "about" ? styles.navLinkActive : ""}`}
                  >
                    Story
                  </button>
                  <span className={styles.separator}>•</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNav("dev");
                    }}
                    className={`${styles.navLink} ${mode === "dev" ? styles.navLinkActive : ""}`}
                  >
                    Dev
                  </button>
                  <span className={styles.separator}>•</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNav("writer");
                    }}
                    className={`${styles.navLink} ${mode === "writer" ? styles.navLinkActive : ""}`}
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
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(Navbar);
