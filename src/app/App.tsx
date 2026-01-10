import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";
import { MODES, Mode, Theme, isValidMode } from "./modes";
import Navbar from "../components/Navbar/Navbar.tsx";
import DevView from "../views/DevView";
import WriterView from "../views/WriterView";
// optional later:
// import Playground from "../dev/Playground";

const LS_MODE = "deecrypt:mode";
const LS_THEME = "deecrypt:theme";

// flip to true later if you want to test experimental UI inside your real app
const SHOW_PLAYGROUND = false;

export default function App() {
  const [mode, setMode] = useState<Mode>(MODES.DEV);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedMode = localStorage.getItem(LS_MODE);
    if (isValidMode(savedMode)) setMode(savedMode);

    const savedTheme = localStorage.getItem(LS_THEME);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_MODE, mode);
  }, [mode]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(LS_THEME, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const brandName = mode === MODES.DEV ? "Gbemi Daniel" : "DeeCrypt";

  // if (SHOW_PLAYGROUND) return <Playground />;

  return (
    <div className={`bg-grid ${styles.app}`}>
      <Navbar brand={brandName} theme={theme} onThemeChange={setTheme} />

      <main className={`container ${styles.main}`}>
        {mode === MODES.DEV ? (
          <DevView mode={mode} onModeChange={setMode} />
        ) : (
          <WriterView mode={mode} onModeChange={setMode} />
        )}
      </main>

      <footer className={`container ${styles.footer}`}>
        <span>© {new Date().getFullYear()} DeeCrypt</span>
        <span className={styles.footerSep}>•</span>
        <span>Built with React + Vite</span>
      </footer>
    </div>
  );
}
