import { Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { lineSnippets } from "../../lineSnippets";
import { Line1 } from "../demos/line/Line1";

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
      <p>This works, but it has a few issues.</p>
      <div className="center">
        <Line1 />
      </div>
      <p>
        If we have a line with a slope of 0.5, then we'll be drawing a pixel
        every 2 x values. This means we'll be missing a lot of pixels. We can
        fix this by calculating the error of each pixel and adding it to the y
        value. This is called Bresenham's line algorithm. Let's see how this
        looks in code:
      </p>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const slope = (end.y - start.y) / (end.x - start.x);
        let y = start.y;
        let error = 0;
        for (let x = start.x; x <= end.x; x++) {
          setPixel(x, y);
          error += slope;
          if (error >= 0.5) {
            y += 1;
            error -= 1;
          }
        }`}
      </SyntaxHighlighter>
      <p>This is much better, but it's still not perfect. It works well for</p>
    </>
  );
};
