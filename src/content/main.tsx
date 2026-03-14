import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App";
import "./tocbot.css";

const container = document.createElement("div");
container.id = "crxjs-app";
document.body.appendChild(container);
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
