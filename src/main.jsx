import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { InfoSimulationProvider } from "./contexts/infoSimulationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/Credixpress_Odontoamiga_Front/'}>
      <InfoSimulationProvider>
        <App />
      </InfoSimulationProvider>
    </BrowserRouter>
  </StrictMode>
);
