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
import windingOrder from "./images/windingOrder.png";
import { BoundingBox } from "./components/BoundingBox";
import { MathJax } from "better-react-mathjax";
import { EdgeFunction } from "./components/EdgeFunction";

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
          Usually when you think of the area of a triangle, you think of the
          following formula:
          <MathJax>{"\\[Area = \\frac{Base*Height}{2}\\]"}</MathJax>
          While this formula works great for calculating the area of a triangle,
          it requires we know the base and height of the triangle. What if we
          don't know the base and height? What if we only know the coordinates
          of the vertices of the triangle? Luckily there's a formula for that
          called the{" "}
          <Link href="https://en.wikipedia.org/wiki/Shoelace_formula">
            Shoelace formula
          </Link>
          . The shoelace formula lets us calculate the area of a triangle given
          the coordinates of its vertices. The formula is as follows:
          <MathJax>
            {
              "\\[Area = \\frac{1}{2}\\lvert(x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a)\\rvert\\]"
            }
          </MathJax>
          So now we have a formula for calculating the area of a triangle, but
          how do we use it to determine whether a point is inside a triangle? If
          you notice the formula above has absolute value bars around it. This
          is because the area of a triangle should always be positive. If we
          remove the absolute value bars, then sometimes we will get a negative
          area. This is called a signed area.
          <MathJax>
            {
              "\\[SignedArea = \\frac{1}{2}((x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a))\\]"
            }
          </MathJax>
          What does a negative area mean though? It all comes down to how the
          points of our triangle (ABC) are ordered.
          <ul>
            <li>
              If our points are in a Clockwise order the signed area will be
              positive.
            </li>
            <li>
              If our points are in a{" "}
              <span style={{ color: "red" }}>Counter-clockwise</span> order the
              signed area will be negative.
            </li>
          </ul>
          <div className="center">
            <figure>
              <img src={windingOrder} alt="winding order" />
              <figcaption>Clockwise and Counterclockwise winding</figcaption>
            </figure>
          </div>
          <br />
          While we're at it, lets also remove the{" "}
          <MathJax inline>{"\\(\\frac{1}{2}\\)"}</MathJax> from the formula as
          all we care about is whether the area is positive or negative. This is
          often referred to as an edge function, so let's call it that:
          <MathJax>
            {"\\[EdgeFunction = (x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a)\\]"}
          </MathJax>
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.edgeFunc}
        </SyntaxHighlighter>
        <div className="center">
          <SignedArea />
        </div>
        <br />
        <Typography className="subHeading" variant="h6">
          A nifty trick
        </Typography>
        <Typography variant="body1">
          Another really useful thing about knowing the winding order of a
          triangle is that we can use it to skip drawing triangles that are
          facing away from the camera. Drawing the back sides of objects is a
          waste of processing power, as we can't see them anyway, so this gives
          us an easy way to speed up our rendering.
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.backfaceCulling}
        </SyntaxHighlighter>
        <Typography className="sectionHeading" variant="h6">
          Back to business
        </Typography>
        <Typography variant="body1">
          Why is it called an edge function? Let's replace point C with a point
          P, so we have an edge AB, and a point P. The following triangle is
          exactly the same as the triangle ABC, but we're only interested in the
          edge AB and the point P.
          <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
            {`const ABP = edgeFunction(A, B, P);`}
          </SyntaxHighlighter>
        </Typography>
        <div className="center">
          <EdgeFunction />
        </div>
        <br />
        <Typography variant="body1">
          Do you notice a pattern for when our edge function is positive or
          negative? The edge function is positive when the point P is on the
          right side of the edge AB, and negative when the point P is on the
          left side of the edge AB. This is why we call it an edge function.
        </Typography>

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
          Fortunately, calculating the bounding box of a triangle is very easy,
          we just need to get the minimum and maximum x and y values of the
          triangle's vertices:
        </Typography>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.boundingBox}
        </SyntaxHighlighter>
        <Typography className="sectionHeading" variant="h4">
          Interpolation
        </Typography>
        <Typography className="subHeading" variant="h5">
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
          Vertex weights
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
