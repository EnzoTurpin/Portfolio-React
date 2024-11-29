import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { registerLicense } from "@syncfusion/ej2-base";

// Ajoutez votre clé ici
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cX2hIfEx0Qnxbf1x0ZFRGal5WTndZUiweQnxTdEFiWH1ZcXRXQWFUUkFyXQ=="
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
