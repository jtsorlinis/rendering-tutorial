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
import redTriangle from "./images/redTriangle.png";
import interpolatedTriangle from "./images/interpolatedTriangle.png";
import { BoundingBox } from "./components/BoundingBox";

function App() {
  return (
    <>
      <Typography variant="h3">Rasterizing a triangle</Typography>
      <Typography variant="body1">
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </Typography>
      <br />
      <div>
        <Typography variant="h5">
          Area of a triangle (Edge functions)
        </Typography>
        <Typography variant="body1">
          The area of a triangle is given by the following formula:
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.edgeFunc}
        </SyntaxHighlighter>
        <div className="center">
          <SignedArea />
        </div>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.edgeFunc2}
        </SyntaxHighlighter>
        <Typography className="sectionHeading" variant="h5">
          Determining whether a point is inside a triangle
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.pointInTriangle1}
          {snippets.pointInTriangle1b}
        </SyntaxHighlighter>
        <div className="center">
          <PointInTriangle />
        </div>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.pointInTriangle2}
        </SyntaxHighlighter>
        <div className="center">
          <PointInTriangle2 />
        </div>

        <Typography className="sectionHeading" variant="h5">
          Drawing a triangle
        </Typography>
        <Typography variant="body1">
          Now let's get to actually drawing the triangle. All we need to do is
          loop through all the pixels in the canvas and calculate the signed
          areas of each of our inner triangles (ABP, BCP, CAP). If all of the
          signed areas are positive, then the point is inside the triangle.
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.drawTriangle1}
        </SyntaxHighlighter>
        <div className="center">
          <figure>
            <img src={redTriangle} alt="red triangle" />
            <figcaption>Our beautiful triangle</figcaption>
          </figure>
        </div>

        <Typography className="sectionHeading" variant="h5">
          An easy speedup
        </Typography>
        <Typography variant="body1">
          While our current implementation works, it's not very efficient. We
          can speed it up very easily by only looping through the pixels inside
          the bounding box of the triangle. Depending on the size of the
          triangle, this can be a huge speedup.
        </Typography>
        <div className="center">
          <BoundingBox />
        </div>
        <Typography variant="body1">
          As you can see from the above demo, if the triangle is small (which
          they generally are when rendering complex 3D models), we can save
          quite a bit of processing time.
        </Typography>
        <Typography variant="body1">
          Fortunately, calculating the bounding box of a triangle is very easy:
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.boundingBox}
        </SyntaxHighlighter>

        <Typography className="sectionHeading" variant="h5">
          Getting barycentric coordinates
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.barycentric1}
        </SyntaxHighlighter>
        <div className="center">
          <Normalized />
        </div>
        <br />
        <Typography className="sectionHeading" variant="h5">
          Putting it all together
        </Typography>
        <Typography variant="body1">bla bla bla</Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.barycentric2}
        </SyntaxHighlighter>
        <div className="center">
          <Barycentric />
        </div>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.barycentric3}
        </SyntaxHighlighter>
        <div className="center">
          <Interpolate />
        </div>
        <div className="center">
          <figure>
            <img src={interpolatedTriangle} alt="triangle" />
            <figcaption>Interpolation is so pretty</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}

export default App;
