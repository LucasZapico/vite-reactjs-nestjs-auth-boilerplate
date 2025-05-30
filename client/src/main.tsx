import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { RouteWrapper } from "@/routes.tsx";
import { Providers } from "./providers";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <RouteWrapper />
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
