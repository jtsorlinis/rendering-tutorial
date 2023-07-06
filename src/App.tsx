import "./App.css";
import { Link, Typography } from "@mui/material";
import { ToggleThemeButton } from "./ThemeToggleProvider";
import { Introduction } from "./components/sections/Introduction";
import { Rasterisation } from "./components/sections/Rasterisation";
import { Barycentrics } from "./components/sections/Barycentrics";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
SyntaxHighlighter.registerLanguage("typescript", ts);

function App() {
  return (
    <>
      <ToggleThemeButton />
      <br />
      <Typography variant="h3">Rasterising a triangle</Typography>
      <span>
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </span>
      <div>
        <Introduction />
        <Rasterisation />
        <Barycentrics />
      </div>
    </>
  );
}

export default App;
