import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "lenis/dist/lenis.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/rail.css";
import "./styles/hero.css";
import "./styles/bands.css";
import "./styles/sections.css";
import "./styles/effects.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
