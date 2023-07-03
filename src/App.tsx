import "./App.css";
import { Link, Typography } from "@mui/material";
import { Interpolate } from "./components/Interpolate";
import { SignedArea } from "./components/SignedArea";
import { Normalized } from "./components/Normalized";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { snippets } from "./snippets";
import { PointInTriangle } from "./components/PointInTriangle";
import { PointInTriangle2 } from "./components/PointInTriangle2";
import { Barycentric } from "./components/Barycentric";

function App() {
  return (
    <>
      <Typography variant="h3">Rasterizing a triangle</Typography>
      <Typography variant="body1">
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </Typography>
      <br />
      <Typography variant="h5">Area of a triangle (Edge functions)</Typography>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.edgeFunc}
      </SyntaxHighlighter>
      <SignedArea />
      <Typography variant="body1">
        The area of a triangle is given by the following formula:
      </Typography>
      <Typography variant="h5">
        Determining whether a point is inside a triangle
      </Typography>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle1}
        {snippets.pointInTriangle1b}
      </SyntaxHighlighter>
      <PointInTriangle />
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle2}
      </SyntaxHighlighter>
      <PointInTriangle2 />
      <br />
      <Typography variant="h5">Getting barycentric coordinates</Typography>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.barycentric1}
      </SyntaxHighlighter>
      <Normalized />
      <br />
      <Typography variant="h5">Putting it all together</Typography>
      <Typography variant="body1">bla bla bla</Typography>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.barycentric2}
      </SyntaxHighlighter>
      <Barycentric />
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.barycentric3}
      </SyntaxHighlighter>
      <Interpolate />
    </>
  );
}

export default App;
