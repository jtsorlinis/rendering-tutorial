import { Link, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { snippets } from "../../snippets";
import { BoundingBox } from "../demos/BoundingBox";
import { EdgeFunction } from "../demos/EdgeFunction";
import { EdgeRight } from "../demos/EdgeRight";
import { Final } from "../demos/Final";
import { PointInTriangle } from "../demos/PointInTriangle";
import { PointInTriangle2 } from "../demos/PointInTriangle2";
import { SignedArea } from "../demos/SignedArea";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import redTriangle from "../../images/redTriangle.png";
import windingOrder from "../../images/windingOrder.png";
import triangleEdges from "../../images/triangleEdges.png";

export const RasterisationSection = () => {
  return (
    <>
      <Typography className="sectionHeading" variant="h4">
        Let's get Rasterising
      </Typography>
      <Typography className="subHeading" variant="h5">
        Area of a triangle (aka maths)
      </Typography>
      <p>
        Usually when you think of the area of a triangle, you probably think of
        the following formula:
      </p>
      <MathJax className="formula">
        {"\\[Area = \\frac{Base*Height}{2}\\]"}
      </MathJax>
      <p>
        While this formula works great for calculating the area of a triangle,
        it requires we know the base and height of the triangle. What if we
        don't know these values? What if we only know the coordinates of the
        vertices of the triangle? We could always calculate the base and height,
        but luckily there's a formula for calculating the area of a triangle
        from the coordinates of its points. This formula is called the{" "}
        <Link href="https://en.wikipedia.org/wiki/Shoelace_formula">
          Shoelace formula
        </Link>
        , and it's what we'll be using it a lot. The formula is as follows:
      </p>
      <MathJax className="formula">
        {
          "\\[Area = \\lvert\\frac{(x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a)}{2}\\rvert\\]"
        }
      </MathJax>
      <p>
        So now we have a formula for calculating the area of a triangle, but how
        do we use it to determine whether a point is inside a triangle? If you
        notice the formula above has absolute value bars (| |) around it. This
        is because the area of a triangle should always be positive. If we
        remove the absolute value bars, then sometimes we will get a negative
        area. This is called a signed area.
      </p>
      <MathJax className="formula">
        {"\\[SignedArea = \\frac{(x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a)}{2}\\]"}
      </MathJax>
      <p>
        What does a negative area mean though? It all comes down to how the
        points of our triangle (ABC) are ordered.
      </p>
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
      <MathJax inline>{"\\(\\frac{1}{2}\\)"}</MathJax> from the formula as all
      we care about is whether the area is positive or negative. This is often
      referred to as an edge function, so let's call it that:
      <MathJax className="formula">
        {"\\[EdgeFunction = (x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a)\\]"}
      </MathJax>
      <p>Here's what that looks like in code:</p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.edgeFunc}
      </SyntaxHighlighter>
      <p>
        Have a play around with the below demo to see how the edge function
        works. Try changing the order of the points and see how it affects the
        results of the edge function:
      </p>
      <div className="center">
        <SignedArea />
      </div>
      <br />
      <Typography className="subHeading" variant="h6">
        A nifty trick
      </Typography>
      <p>
        Another really useful thing about knowing the winding order of a
        triangle is that we can use it to skip drawing triangles that are facing
        away from the camera. Drawing the back sides of objects is a waste of
        processing power, as we can't see them anyway, so this gives us an easy
        way to speed up our rendering.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.backfaceCulling}
      </SyntaxHighlighter>
      <br />
      <Typography className="subHeading" variant="h6">
        Back to business
      </Typography>
      <p>
        So, why is it called an edge function? Let's replace point C with a
        point P, so we have an edge AB, and a point P. The following triangle is
        exactly the same as the triangle ABC, but we're only interested in the
        edge AB and the point P.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const ABP = edgeFunction(A, B, P);`}
      </SyntaxHighlighter>
      <p>
        Try moving the point P around and see how the edge function changes. Do
        you notice a pattern for when our edge function is positive or negative?
      </p>
      <div className="center">
        <EdgeFunction />
      </div>
      <br />
      <p>
        The edge function is positive when the point P is on the right side of
        the edge AB, and negative when the point P is on the left side of the
        edge AB. This is why we call it an edge function.
      </p>
      <p>
        One thing to note is that the "right side" of an edge is relative to its
        direction. So if an edge is pointing downwards, then the right side
        would actually be on the left. Think of it if you were standing at point
        A and looking towards point B. Which direction would your right be? Try
        dragging the slider in the below demo to see what I mean.
      </p>
      <div className="center">
        <EdgeRight />
      </div>
      <br />
      <p>
        Remember, the only important thing when ordering the points is that they
        are in a clockwise order. So the following are all equivalent:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle1}
      </SyntaxHighlighter>
      <Typography className="sectionHeading" variant="h5">
        Determining whether a point is inside a triangle
      </Typography>
      <p>
        So this is what we've been building up to. Now that we know how to
        determine whether a point is on the left or right side of an edge, we
        can use that to determine which side of a triangle's edge point P is.
        We're doing the same thing as above, but making P a separate point on
        our triangle ABC.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle1a}
      </SyntaxHighlighter>
      <div className="center">
        <PointInTriangle />
      </div>
      <br />
      <p>
        You'll notice our edge function is only positive if point P is inside
        edge AB. So all we need to do is check that the edge function is
        positive.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle1b}
      </SyntaxHighlighter>
      <p>
        Now all we need to do is repeat this for each edge of the triangle.
        Remember our edges need to be in clockwise order, so we can just go
        clockwise around the triangle:
      </p>
      <div className="center">
        <figure>
          <img src={triangleEdges} alt="winding order" />
          <figcaption>The edges of our triangle</figcaption>
        </figure>
      </div>
      <br />
      <p>Now we just repeat what we did before for all three edges:</p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle2}
      </SyntaxHighlighter>
      <div className="center">
        <PointInTriangle2 />
      </div>
      <br />
      <p>
        You'll notice if you play around with the above demo that point P is
        inside the triangle only when all of the edge functions are positive.
        When point P is outside the triangle, at least one of the edge functions
        will be negative. So all we need to do is check that all of the edge
        functions are positive:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.pointInTriangle3}
      </SyntaxHighlighter>
      <br />
      <p>
        <b>
          Congratulations! You can now rasterise triangles! <br />
          <br />
          This was the hardest part so if everything still makes sense the rest
          should be easy!
        </b>
      </p>
      <Typography className="sectionHeading" variant="h5">
        Actually drawing our triangle
      </Typography>
      <p>
        Now let's get to actually drawing the triangle. All we need to do is
        loop through all the pixels in the canvas and calculate our edge
        function for each edge (AB, BC, CA) in relation to the current pixel
        (P). If all of our edge functions are positive, then the pixel is inside
        the triangle.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.drawTriangle1}
      </SyntaxHighlighter>
      <p>
        Here's a simulation of what that would look like. In reality there'd be
        a lot more pixels but this is just to give an idea. Try moving the
        points around below, notice what happens if the points become
        counter-clockwise?
      </p>
      <div className="center">
        <Final />
      </div>
      <Typography className="sectionHeading" variant="h5">
        An easy speedup
      </Typography>
      <p>
        While our current implementation works, it's not very efficient. We can
        speed it up very easily by only looping through the pixels inside the
        bounding box of the triangle. Depending on the size of the triangle,
        this can be a huge speedup.
      </p>
      <div className="center">
        <BoundingBox />
      </div>
      <br />
      <p>
        As you can see from the above demo, if the triangle is small (which they
        generally are when rendering complex 3D models), we can save quite a bit
        of processing time.
      </p>
      <p>
        Fortunately, calculating the bounding box of a triangle is very easy, we
        just need to get the minimum and maximum x and y values of the
        triangle's vertices:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.boundingBox}
      </SyntaxHighlighter>
      <p>
        While looping through the pixels in the bounding box saves a lot of
        time, it may still seem like a lot of looping and calculating for each
        pixel. But if we break down what's happening inside the inner loop all
        we really have is:
      </p>
      <ul>
        <li>
          <b>3</b> Edge functions (AB, BC, CA) each which contain:
        </li>
        <ul>
          <li>
            <b>2</b> multiplications
          </li>
          <li>
            <b>5</b> subtractions
          </li>
        </ul>
        <li>
          <b>3</b> Comparisons to check if the edge functions are positive
        </li>
      </ul>
      <p>
        All up that's <b>24</b> operations per pixel. But remember, GPU's can do
        all of these in parallel, as our calculations for each pixel are
        independent of each other and don't rely on any other pixels.
      </p>
      <p>
        <b>Note:</b> There is still room for more optimisation by
        pre-calculating some of the values, but that's a bit beyond the scope of
        this article.
      </p>
      <Typography className="sectionHeading" variant="h5">
        Putting it all together
      </Typography>
      <p>
        Now that we have our bounding box, we can loop through all the pixels
        inside it and determine whether they are inside the triangle or not. If
        they are, we draw them. If not, we don't. Here's what we end up with:
      </p>
      <div className="center">
        <figure>
          <img src={redTriangle} alt="red triangle" />
          <figcaption>Our beautiful triangle</figcaption>
        </figure>
      </div>
      <p>
        <b>
          That's it! We can now rasterise and draw triangles to the screen
          (somewhat efficiently).
          <br />
          <br />
          But there's another really cool thing we can do with edge functions...
        </b>
      </p>
    </>
  );
};
