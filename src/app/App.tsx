import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import styles from "./App.module.css";
import { MODES } from "./modes";
import type { Mode, Theme } from "./modes";
import Navbar from "../components/Navbar/Navbar";
import DevView from "../views/DevView";
import WriterView from "../views/WriterView";
import AboutView from "../views/AboutView";
import Footer from "@/components/Footer/Footer";
import { setSectionLabel } from "../hooks/useScrollSpy";
import Background from "../components/Background/Background";
import { Preloader } from "@/components/Preloader/Preloader";

const LS_MODE = "deecrypt:mode";
const LS_THEME = "deecrypt:theme";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const isDevToWriter =
      (prevLocation.current === "/" && location.pathname === "/writer") ||
      (prevLocation.current === "/writer" && location.pathname === "/");

    if (!isDevToWriter && prevLocation.current !== location.pathname) {
      setIsLoading(true);
    }
    prevLocation.current = location.pathname;
  }, [location.pathname]);

  const mode = location.pathname === "/writer"
    ? MODES.WRITER
    : location.pathname === "/about"
      ? MODES.ABOUT
      : MODES.DEV;

  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem(LS_THEME);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_MODE, mode);
  }, [mode]);

  useEffect(() => {
    setSectionLabel(null);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(LS_THEME, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // NATIVE BROWSER CROSSFADE LOGIC
  const handleModeChange = (newMode: Mode) => {
    if (newMode === mode) return;

    const executeNavigation = () => {
      if (newMode === MODES.DEV) navigate("/");
      else if (newMode === MODES.WRITER) navigate("/writer");
      else if (newMode === MODES.ABOUT) navigate("/about");
    };

    // Safely check for View Transitions API to avoid TS/Browser errors
    if (!('startViewTransition' in document)) {
      executeNavigation();
      return;
    }

    // @ts-ignore - Bypass strict TS DOM typing for cutting-edge API
    (document as any).startViewTransition(() => {
      executeNavigation();
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            key="global-loader"
            onComplete={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col min-h-dvh">
        <Background />

        <Navbar
          theme={theme}
          onThemeChange={setTheme}
          mode={mode}
          onModeChange={handleModeChange}
        />

        {/* THE FIX: Pure React Router. No Framer Motion to cause ghosts. */}
        <main className={`container flex-1 min-h-[calc(100vh-200px)] grid ${styles.main}`}>
          <Routes location={location}>
            <Route path="/" element={<DevView mode={mode} />} />
            <Route path="/writer" element={<WriterView />} />
            <Route path="/about" element={<AboutView mode={mode} />} />
          </Routes>
        </main>

        <Footer mode={mode} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}