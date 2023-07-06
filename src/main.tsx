import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, StyledEngineProvider, Typography } from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";
import { ThemeToggleProvider } from "./components/ThemeToggleProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeToggleProvider>
      <StyledEngineProvider injectFirst>
        <MathJaxContext>
          <Typography component={"div"}>
            <App />
          </Typography>
        </MathJaxContext>
      </StyledEngineProvider>
    </ThemeToggleProvider>
  </React.StrictMode>
);
