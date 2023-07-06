import "./App.css";
import { Link, Typography } from "@mui/material";
import { Interpolate } from "./components/Interpolate";
import { SignedArea } from "./components/SignedArea";
import { Normalised } from "./components/Normalised";
import { snippets } from "./snippets";
import { PointInTriangle } from "./components/PointInTriangle";
import { PointInTriangle2 } from "./components/PointInTriangle2";
import { Barycentric } from "./components/Barycentric";
import { BoundingBox } from "./components/BoundingBox";
import { MathJax } from "better-react-mathjax";
import { EdgeFunction } from "./components/EdgeFunction";
import { EdgeRight } from "./components/EdgeRight";
import redTriangle from "./images/redTriangle.png";
import interpolatedTriangle from "./images/interpolatedTriangle.png";
import windingOrder from "./images/windingOrder.png";
import triangleEdges from "./images/triangleEdges.png";
import rasterisation from "./images/rasterisation.png";
import shapesFromTris from "./images/shapesFromTris.png";
import { Rasterisation } from "./components/Rasterisation";
import { Final } from "./components/Final";
import { FinalInterpolated } from "./components/FinalInterpolated";
import { ToggleThemeButton } from "./ThemeToggleProvider";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
        <Typography className="sectionHeading" variant="h5">
          Introduction
        </Typography>
        <p>
          In this tutorial we're going to learn how to rasterise a triangle.
          I've been learning about triangle rasterisation recently and found a
          few different resources but I didn't feel like any of them explained
          the concepts too clearly.
        </p>
        <p>
          So I thought it would be fun (and hopefully helpful) to write a
          tutorial about it. I'm going to assume you have a basic understanding
          of linear algebra, and have a decent grasp on programming. If not,
          don't worry, I'll try to explain everything as best I can.
        </p>
        <div className="center">
          <figure>
            <img src={interpolatedTriangle} alt="triangle" />
            <figcaption>Here's what we'll (hopefully) end up with</figcaption>
          </figure>
        </div>
        <Typography className="sectionHeading" variant="h5">
          What even is Rasterisation?
        </Typography>
        <p>
          Put simply, rasterisation is the process of converting an image made
          up of lines and shapes into pixels. Why do we need to do this? Because
          screens/displays only understand pixels, they have no concept of
          anything like shapes or lines. It's much easier to draw with shapes
          and lines though, so this is how we store our graphics. The goal of
          our little rasteriser we'll be writing is to convert a triangle made
          up of 3 points into its pixels on the screen. It might be easier to
          understand with an image:
        </p>
        <div className="center">
          <figure>
            <img src={rasterisation} alt="triangle" />
            <figcaption>Shapes to pixels</figcaption>
          </figure>
        </div>
        <p>
          The image on the right looks quite blocky, but pixels in real life are
          usually much smaller than this, so the image looks smooth. The smaller
          the pixels, the smoother the image. Our goal is to get from the
          triangle on the left to the pixels on the right so we can put it on
          the screen.
        </p>
        <p>
          Why triangles? There's a few reasons, but the main one is it's the
          simplest shape that can be used to make any shape. If you have enough
          triangles you can make any shape you want.
        </p>
        <div className="center">
          <figure>
            <img src={shapesFromTris} alt="triangle" />
            <figcaption>Triangles and more triangles</figcaption>
          </figure>
        </div>
        <Typography className="sectionHeading" variant="h5">
          So how do we actually rasterize a triangle?
        </Typography>
        <p>
          There's a few different ways to do this, but the way we'll be doing it
          is by looping through all the pixels in the canvas and determining if
          they are inside the triangle or not. If they are, we draw them. If
          not, we don't. Simple right? Have a play around with the below demo to
          see it in action:
        </p>
        <div className="center">
          <Rasterisation />
        </div>
        <br />
        <p>
          The demo above is single threaded and running sequentially, but GPU's
          usually do thousands or more in parallel. I've always found the
          following video to be a really great way of visualising it:
        </p>
        <br />
        <div className="ytWrapper">
          <div className="ytContainer">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/-P28LKWTzrI"
              title="YouTube video player"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            ></iframe>
          </div>
        </div>
        <Typography className="sectionHeading" variant="h4">
          Let's get Rasterising
        </Typography>
        <Typography className="subHeading" variant="h5">
          Area of a triangle (aka maths)
        </Typography>
        <p>
          Usually when you think of the area of a triangle, you probably think
          of the following formula:
        </p>
        <MathJax className="formula">
          {"\\[Area = \\frac{Base*Height}{2}\\]"}
        </MathJax>
        <p>
          While this formula works great for calculating the area of a triangle,
          it requires we know the base and height of the triangle. What if we
          don't know these values? What if we only know the coordinates of the
          vertices of the triangle? We could always calculate the base and
          height, but luckily there's a formula for calculating the area of a
          triangle from the coordinates of its points. This formula is called
          the{" "}
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
          So now we have a formula for calculating the area of a triangle, but
          how do we use it to determine whether a point is inside a triangle? If
          you notice the formula above has absolute value bars (| |) around it.
          This is because the area of a triangle should always be positive. If
          we remove the absolute value bars, then sometimes we will get a
          negative area. This is called a signed area.
        </p>
        <MathJax className="formula">
          {
            "\\[SignedArea = \\frac{(x_b-x_a)(y_c-y_a)-(y_b-y_a)(x_c-x_a)}{2}\\]"
          }
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
          triangle is that we can use it to skip drawing triangles that are
          facing away from the camera. Drawing the back sides of objects is a
          waste of processing power, as we can't see them anyway, so this gives
          us an easy way to speed up our rendering.
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
          point P, so we have an edge AB, and a point P. The following triangle
          is exactly the same as the triangle ABC, but we're only interested in
          the edge AB and the point P.
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {`const ABP = edgeFunction(A, B, P);`}
        </SyntaxHighlighter>
        <p>
          Try moving the point P around and see how the edge function changes.
          Do you notice a pattern for when our edge function is positive or
          negative?
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
          One thing to note is that the "right side" of an edge is relative to
          its direction. So if an edge is pointing downwards, then the right
          side would actually be on the left. Think of it if you were standing
          at point A and looking towards point B. Which direction would your
          right be? Try dragging the slider in the below demo to see what I
          mean.
        </p>
        <div className="center">
          <EdgeRight />
        </div>
        <br />
        <p>
          Remember, the only important thing when ordering the points is that
          they are in a clockwise order. So the following are all equivalent:
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
          When point P is outside the triangle, at least one of the edge
          functions will be negative. So all we need to do is check that all of
          the edge functions are positive:
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.pointInTriangle3}
        </SyntaxHighlighter>
        <br />
        <p>
          <b>
            Congratulations! You can now rasterise triangles! <br />
            <br />
            This was the hardest part so if everything still makes sense the
            rest should be easy!
          </b>
        </p>
        <Typography className="sectionHeading" variant="h5">
          Actually drawing our triangle
        </Typography>
        <p>
          Now let's get to actually drawing the triangle. All we need to do is
          loop through all the pixels in the canvas and calculate our edge
          function for each edge (AB, BC, CA) in relation to the current pixel
          (P). If all of our edge functions are positive, then the pixel is
          inside the triangle.
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.drawTriangle1}
        </SyntaxHighlighter>
        <p>
          Here's a simulation of what that would look like. In reality there'd
          be a lot more pixels but this is just to give an idea. Try moving the
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
          While our current implementation works, it's not very efficient. We
          can speed it up very easily by only looping through the pixels inside
          the bounding box of the triangle. Depending on the size of the
          triangle, this can be a huge speedup.
        </p>
        <div className="center">
          <BoundingBox />
        </div>
        <br />
        <p>
          As you can see from the above demo, if the triangle is small (which
          they generally are when rendering complex 3D models), we can save
          quite a bit of processing time.
        </p>
        <p>
          Fortunately, calculating the bounding box of a triangle is very easy,
          we just need to get the minimum and maximum x and y values of the
          triangle's vertices:
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.boundingBox}
        </SyntaxHighlighter>
        <Typography className="sectionHeading" variant="h5">
          Putting it all together
        </Typography>
        <p>
          Now that we have our bounding box, we can loop through all the pixels
          inside it and determine whether they are inside the triangle or not.
          If they are, we draw them. If not, we don't. Here's what we end up
          with:
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
            But there's another really cool thing we can do with edge
            functions...
          </b>
        </p>
        <Typography className="sectionHeading" variant="h4">
          One more (super) useful thing
        </Typography>
        <Typography className="subHeading" variant="h5">
          Normalised edge weights
        </Typography>
        <p>
          So our edge functions are pretty useful for determining whether a
          point is inside a triangle, but they can also be used to determine the
          weights of each vertex of the triangle. We'll see why this is useful
          in a second.
        </p>
        <p>
          Thankfully we've already done most of the work for this. All we need
          to do is normalise our edge functions. This is done by dividing each
          edge function by the edge function of the whole triangle. This gives
          us a value between 0 and 1 for each edge, which we can use as the
          weight of each vertex.
        </p>
        <p>
          The weight of a point is calculated by calculating the normalised edge
          function of the opposite edge. So to get the weight of point C, we
          would use the normalised edge function of edge AB.
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.barycentric1}
        </SyntaxHighlighter>
        <p>
          In the following example we're calculating the weight of point C by
          calculating the edge function of edge AB, and normalising it by
          dividing it by the edge function of the whole triangle (ABC).
        </p>
        <div className="center">
          <Normalised />
        </div>
        <br />
        <Typography className="sectionHeading" variant="h5">
          Barycentric coordinates
        </Typography>
        <p>
          Our normalised edge function we calculated in the previous step
          actually was a barycentric coordinate. Barycentric coordinates are
          just normalised edge functions. So if we have a triangle ABC, then the
          weights of each vertex of the triangle are the barycentric coordinates
          of the point P.
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.barycentric2}
        </SyntaxHighlighter>
        <p>
          Because they are normalised they will always add up to 1. So at each
          vertex the weight of that vertex will be 1, and the weight of the
          other vertices will be 0. In the center of the triangle all of the
          weights will be equal at 0.333.
        </p>
        <div className="center">
          <Barycentric />
        </div>
        <Typography className="sectionHeading" variant="h5">
          Interpolating attributes
        </Typography>
        <p>
          We've almost reached the end here. All that's left to do is put all
          our newfound knowledge to use. The reason these weights are so useful
          is we can use them to interpolate any attribute we want! In the
          following example we use our barycentric coordinates to interpolate
          the color for each pixel (P) in the triangle.
        </p>
        <p>
          All we need is our 3 weights (barycentric coordinates) and the colours
          at each vertex of the triangle. We then multiply each colour by its
          weights and add them all together to get the interpolated colour.
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.barycentric3}
        </SyntaxHighlighter>
        <div className="center">
          <Interpolate />
        </div>
        <Typography className="sectionHeading" variant="h5">
          That's it! We're done!
        </Typography>
        <p>
          Here's a simulation of our final triangle rasteriser, the real thing
          should more like the initial picture at the start of the article. Try
          dragging the points around to see how the colours change:
        </p>
        <div className="center">
          <FinalInterpolated />
        </div>
        <Typography className="sectionHeading" variant="h5">
          Wrapping up
        </Typography>
        <p>
          I hope you enjoyed this tutorial, and it gave you a good understanding
          of how triangle rasterisation works. One thing I didn't mention but
          you may have noticed, is that each pixel can be calculated
          independently, which means this algorithm is very easily made
          parallel. And GPU's are very good at doing things in parallel. Go
          figure.
        </p>
        <p>
          If you have any questions/suggestions or want to see more, feel free
          to drop me an <Link href="mailto:jtsorlinis@gmail.com">email</Link>.
        </p>
        <Typography className="sectionHeading" variant="h5">
          Full code for our triangle rasteriser
        </Typography>
        <p>
          Here's all the code we've worked through to rasterise and draw our
          triangle with interpolated colours:
        </p>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
          {snippets.final}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default App;
