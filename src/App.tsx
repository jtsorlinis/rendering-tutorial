import "./App.css";
import { Link, Typography } from "@mui/material";
import { ToggleThemeButton } from "./components/ThemeToggleProvider";
import { IntroSection } from "./components/sections/IntroSection";
import { RasterisationSection } from "./components/sections/RasterisationSection";
import { BarycentricsSection } from "./components/sections/BarycentricsSection";
import { PageProgress } from "./components/PageProgress";
import { LinesSection } from "./components/sections/LinesSection";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
SyntaxHighlighter.registerLanguage("typescript", ts);

function App() {
  return (
    <>
      <PageProgress />
      <ToggleThemeButton />
      <br />
      <Typography variant="h3">Rasterising a triangle</Typography>
      <span>
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </span>
      <div>
        <LinesSection />
        <IntroSection />
        <RasterisationSection />
        <BarycentricsSection />
      </div>
    </>
  );
}

export default App;
