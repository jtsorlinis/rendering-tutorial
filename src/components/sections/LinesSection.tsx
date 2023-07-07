import { Link, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { lineSnippets } from "../../utils/lineSnippets";
import { Line1 } from "../demos/line/Line1";
import { Line2 } from "../demos/line/Line2";
import { Line2a } from "../demos/line/Line2a";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { Line3 } from "../demos/line/Line3";
import { Line4 } from "../demos/line/Line4";

export const LinesSection = () => {
  return (
    <>
      <Typography className="sectionHeading" variant="h5">
        What about lines?
      </Typography>
      <p>
        We've covered triangles, but what about lines? Lines are a bit simpler
        than triangles, but the same concepts apply. For lines we're going to
        need to calculate the slope of the line, and then use that to calculate
        the y value of each x value between the start and end points of the
        line. You may recognise the following formula:
      </p>
      <MathJax className="formula">{`$$y = mx + c$$`}</MathJax>
      <p>
        This is the formula for a straight line. m is the slope of the line,
        which is calculated by:
      </p>
      <MathJax className="formula">{`$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$`}</MathJax>
      <p>
        So if we have a line from (0, 0) to (10, 5), we can calculate the slope
        like so:
      </p>
      <MathJax className="formula">{`$$m = \\frac{5 - 0}{10 - 0} = \\frac{5}{10} = 0.5$$`}</MathJax>
      <p>
        Now we can calculate the y value given any x value along our line. Let's
        see how this looks in code:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {lineSnippets.line1}
      </SyntaxHighlighter>
      <p>
        This works, but it has a few issues. Try moving the point around and see
        what happens when the angle of the line changes:
      </p>
      <div className="center">
        <Line1 />
      </div>
      <br />
      <p>
        As the slope goes above 1, we start to see gaps in the line. This is
        because we're only drawing one pixel for each x value, but we need to
        draw multiple pixels for each y value. We can add a "steep" check that
        checks if the slope is greater than 1 and then swap the x and y values
        if it is:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {lineSnippets.line2}
      </SyntaxHighlighter>
      <p>Let's see how this looks now:</p>
      <div className="center">
        <Line2 />
      </div>
      <br />
      <p>
        This is much better, but we still have a problem. Let's zoom out a bit
        in the next demo so you can move the line more freely. Can you notice
        the issue? I've drawn a line cutting through the middle of the canvas to
        help:
      </p>
      <div className="center">
        <Line2a />
      </div>
      <br />
      <p>
        It only works in half the directions! This is because we're only drawing
        the line when the ex value is greater than the sx value. Remember this
        loop?
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`for (let x = sx; x <= ex; x++)`}
      </SyntaxHighlighter>
      <p>
        Remember we swap x and y for steep lines, that's, so x, sx, and ex don't
        necessarily refer to the x values. We need to add an additional check to
        see if our sx value is greater than ex, and if it is, we need to swap
        the start and end points:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {lineSnippets.line3}
      </SyntaxHighlighter>
      <p>Now we can draw lines in any direction! Try it out!</p>
      <div className="center">
        <Line3 />
      </div>
      <br />
      <p>
        You may have heard of Bresenham's line algorithm. It's a very popular
        and efficient way of drawing lines in computer graphics. It's quite
        close to what we've done here, but it avoids the use of floating point
        (decimal) numbers and avoids any divisions, which makes quite a bit
        faster. I won't go into it in too much detail here, but you can read
        more about it{" "}
        <Link href="https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm">
          here.
        </Link>
      </p>
      <p>Here's what it looks like in code:</p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {lineSnippets.bresenham}
      </SyntaxHighlighter>
      <p>
        Because it's more efficient, we can draw lines at much higher
        resolutions easily:
      </p>
      <div className="center">
        <Line4 />
      </div>
    </>
  );
};
