import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/tokens.css";
import "./styles/globals.css";
import { MotionConfig } from "framer-motion";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MotionConfig transition={{ duration: 0 }}>
        <App />
      </MotionConfig>{" "}
    </React.StrictMode>,
  );
}
