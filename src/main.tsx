import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { App } from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "[main.tsx] No se encontró el elemento #root en el DOM. " +
    "Verificá que index.html tenga <div id='root'></div>.",
  );
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
