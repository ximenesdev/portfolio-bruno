import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Poppins self-hospedada — só o subset latino e só os pesos usados.
// Carregamento performático, sem requisição ao Google Fonts.
// Poppins é a ÚNICA família do site.
import "@fontsource/poppins/latin-300.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";

import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
