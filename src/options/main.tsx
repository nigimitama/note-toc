import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OptionsApp from "./views/OptionsApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OptionsApp />
  </StrictMode>,
);
