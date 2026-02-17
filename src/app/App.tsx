import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { MODES, Mode, Theme, isValidMode } from "./modes";
import Navbar from "../components/Navbar/Navbar";
import DevView from "../views/DevView";
import WriterView from "../views/WriterView";
import AboutView from "../views/AboutView";
import Footer from "@/components/Footer/Footer";
import { setSectionLabel } from "../hooks/useScrollSpy";

// NEW IMPORT
import Background from "../components/Background/Background";

const LS_MODE = "deecrypt:mode";
const LS_THEME = "deecrypt:theme";

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
    // Scroll to top whenever the View changes
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setSectionLabel(null);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(LS_THEME, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    // Removed 'bg-grid' class from here
    <div className={styles.app}>
      {/* 1. BACKGROUND LAYER (Rendered once, stays fixed) */}
      <Background />

      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        mode={mode}
        onModeChange={setMode}
      />

      <main className={`container ${styles.main}`}>
        {mode === "dev" && <DevView mode={mode} onModeChange={setMode} />}
        {mode === "writer" && <WriterView mode={mode} onModeChange={setMode} />}
        {mode === "about" && <AboutView mode={mode} onModeChange={setMode} />}
      </main>

      <Footer mode={mode} />
    </div>
  );
}
