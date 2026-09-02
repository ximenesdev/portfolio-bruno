import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Inter self-hospedada — só o subset latino e só os pesos usados.
// Carregamento performático, sem requisição ao Google Fonts.
// Ela é o FALLBACK: em macOS/iOS o visitante recebe a San Francisco do sistema
// (ver --font em tokens.css), que não pode ser hospedada por licença.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
