import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./App.module.css";
import { MODES } from "./modes";
import type { Mode, Theme } from "./modes";
import Navbar from "../components/Navbar/Navbar";
import DevView from "../views/DevView";
import WriterView from "../views/WriterView";
import AboutView from "../views/AboutView";
import Footer from "@/components/Footer/Footer";
import { setSectionLabel } from "../hooks/useScrollSpy";
import { siteConfig } from "@/config/site";
import Background from "../components/Background/Background";
import { Preloader } from "@/components/Preloader/Preloader";

const LS_MODE = "deecrypt:mode";
const LS_THEME = "deecrypt:theme";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // GLOBAL CURTAIN LOADER LOGIC
  const [isLoading, setIsLoading] = useState(true); // True for initial boot
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    // Force reset immediately before any DOM locks occur
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const isDevToWriter =
      (prevLocation.current === "/" && location.pathname === "/writer") ||
      (prevLocation.current === "/writer" && location.pathname === "/");

    if (!isDevToWriter && prevLocation.current !== location.pathname) {
      setIsLoading(true);
    }
    prevLocation.current = location.pathname;
  }, [location.pathname]);

  // Derive mode from URL
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

  const handleModeChange = (newMode: Mode) => {
    if (newMode === MODES.DEV) navigate("/");
    else if (newMode === MODES.WRITER) navigate("/writer");
    else if (newMode === MODES.ABOUT) navigate("/about");
  };

  return (
    <>
      {/* GLOBAL CURTAIN */}
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
          brand={siteConfig.name}
          theme={theme}
          onThemeChange={setTheme}
          mode={mode}
          onModeChange={handleModeChange}
        />

        <main className={`container flex-1 min-h-[calc(100vh-200px)] grid ${styles.main}`}>
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              className="[grid-area:1/1] w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Routes location={location}>
                <Route path="/" element={<DevView mode={mode} />} />
                <Route path="/writer" element={<WriterView />} />
                <Route path="/about" element={<AboutView mode={mode} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer mode={mode} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* THE FIX: Removed <ScrollToTop /> to prevent race conditions */}
      <AppContent />
    </BrowserRouter>
  );
}