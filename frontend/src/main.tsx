import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Theme } from "./styles/Theme.tsx";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
