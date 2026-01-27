import { useEffect, useState } from "react";
import styles from "./App.module.css";
// Ensure your modes.ts includes 'ABOUT' or just use string literals like below
import { MODES, Mode, Theme, isValidMode } from "./modes";
import Navbar from "../components/Navbar/Navbar";
import DevView from "../views/DevView";
import WriterView from "../views/WriterView";
import AboutView from "../views/AboutView";
import Footer from "@/components/Footer/Footer";
import { setSectionLabel } from "../hooks/useScrollSpy";

const LS_MODE = "deecrypt:mode";
const LS_THEME = "deecrypt:theme";

export default function App() {
  // Ensure your modes.ts defines MODES.DEV, etc.
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
    // Scroll to top whenever the View changes
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // This wipes the "stale" text from the previous page
    setSectionLabel(null);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(LS_THEME, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={`bg-grid ${styles.app}`}>
      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        mode={mode}
        onModeChange={setMode}
      />

      <main className={`container ${styles.main}`}>
        {/* LOGIC UPDATE: Handle all 3 views explicitly */}

        {mode === "dev" && <DevView mode={mode} onModeChange={setMode} />}

        {mode === "writer" && <WriterView mode={mode} onModeChange={setMode} />}

        {mode === "about" && <AboutView />}
      </main>

      <Footer />
    </div>
  );
}
