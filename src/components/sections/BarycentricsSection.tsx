import { Link, Typography } from "@mui/material";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { snippets } from "../../snippets";
import { Barycentric } from "../demos/Barycentric";
import { FinalInterpolated } from "../demos/FinalInterpolated";
import { Interpolate } from "../demos/Interpolate";
import { Normalised } from "../demos/Normalised";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

export const BarycentricsSection = () => {
  return (
    <>
      <Typography className="sectionHeading" variant="h4">
        One more (super) useful thing
      </Typography>
      <Typography className="subHeading" variant="h5">
        Normalised edge weights
      </Typography>
      <p>
        So our edge functions are pretty useful for determining whether a point
        is inside a triangle, but they can also be used to determine the weights
        of each vertex of the triangle. We'll see why this is useful in a
        second.
      </p>
      <p>
        Thankfully we've already done most of the work for this. All we need to
        do is normalise our edge functions. This is done by dividing each edge
        function by the edge function of the whole triangle. This gives us a
        value between 0 and 1 for each edge, which we can use as the weight of
        each vertex.
      </p>
      <p>
        The weight of a point is calculated by calculating the normalised edge
        function of the opposite edge. So to get the weight of point C, we would
        use the normalised edge function of edge AB.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.barycentric1}
      </SyntaxHighlighter>
      <p>
        In the following example we're calculating the weight of point C by
        calculating the edge function of edge AB, and normalising it by dividing
        it by the edge function of the whole triangle (ABC).
      </p>
      <div className="center">
        <Normalised />
      </div>
      <br />
      <Typography className="sectionHeading" variant="h5">
        Barycentric coordinates
      </Typography>
      <p>
        Our normalised edge function we calculated in the previous step actually
        was a barycentric coordinate. Barycentric coordinates are just
        normalised edge functions. So if we have a triangle ABC, then the
        weights of each vertex of the triangle are the barycentric coordinates
        of the point P.
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {snippets.barycentric2}
      </SyntaxHighlighter>
      <p>
        Because they are normalised they will always add up to 1. So at each
        vertex the weight of that vertex will be 1, and the weight of the other
        vertices will be 0. In the center of the triangle all of the weights
        will be equal at 0.333.
      </p>
      <div className="center">
        <Barycentric />
      </div>
      <Typography className="sectionHeading" variant="h5">
        Interpolating attributes
      </Typography>
      <p>
        We've almost reached the end here. All that's left to do is put all our
        newfound knowledge to use. The reason these weights are so useful is we
        can use them to interpolate any attribute we want! In the following
        example we use our barycentric coordinates to interpolate the color for
        each pixel (P) in the triangle.
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
        of how triangle rasterisation works. One thing I didn't mention but you
        may have noticed, is that each pixel can be calculated independently,
        which means this algorithm is very easily made parallel. And GPU's are
        very good at doing things in parallel. Go figure.
      </p>
      <p>
        If you have any questions/suggestions or want to see more, feel free to
        drop me an <Link href="mailto:jtsorlinis@gmail.com">email</Link>.
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
    </>
  );
};
