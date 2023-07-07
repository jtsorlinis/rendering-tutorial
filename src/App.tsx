import "./App.css";
import { IntroSection } from "./components/sections/IntroSection";
import { RasterisationSection } from "./components/sections/RasterisationSection";
import { BarycentricsSection } from "./components/sections/BarycentricsSection";
import { LinesSection } from "./components/sections/LinesSection";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import { PageWrapper } from "./components/PageWrapper";
SyntaxHighlighter.registerLanguage("typescript", ts);

function App() {
  return (
    <PageWrapper heading="Rasterising a triangle">
      <LinesSection />
      <IntroSection />
      <RasterisationSection />
      <BarycentricsSection />
    </PageWrapper>
  );
}

export default App;
