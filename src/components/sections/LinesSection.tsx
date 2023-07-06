import { Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { lineSnippets } from "../../lineSnippets";
import { Line1 } from "../demos/line/Line1";
import { Line2 } from "../demos/line/Line2";
import { Line2a } from "../demos/line/Line2a";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
SyntaxHighlighter.registerLanguage("typescript", ts);

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
        draw multiple pixels for each y value. We can instead drawing a pixel
        for each y value, and then calculating the x value for each y value:
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
        the issue?
      </p>
      <div className="center">
        <Line2a />
      </div>
    </>
  );
};
