import { Stage, Layer, Line, Rect } from "react-konva";
import { Button, Slider } from "@mui/material";
import { useState } from "react";
import { Html } from "react-konva-utils";
import { edgeFunction } from "./utils";

const width = 500;
const height = 500;
const pad = 80;

const p0 = { x: pad, y: height - pad };
const p1 = { x: width / 2, y: pad };
const p2 = { x: width - pad, y: height - pad };

const canvPad = 50;
const start = { x: canvPad, y: canvPad };
const end = { x: width - canvPad, y: height - canvPad };

const xLines = (end.y - start.y) / 10;
const yLines = (end.x - start.x) / 10;
const totalPixels = xLines * yLines;

export const Rasterisation = () => {
  const [progress, setProgress] = useState<number>(0);

  const canvasSize = Math.min(document.body.clientWidth - 32, 500);
  const scale = canvasSize / 500;

  return (
    <div className="container">
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          setProgress(0);
        }}
      >
        Reset
      </Button>
      <Stage
        width={canvasSize}
        height={canvasSize}
        scaleX={scale}
        scaleY={scale}
        className="stage"
      >
        <Layer>
          <Html
            divProps={{
              style: {
                position: "absolute",
                left: "5%",
                top: "92%",
                width: "450px",
              },
            }}
          >
            <Slider
              value={progress}
              valueLabelDisplay="on"
              min={0}
              max={totalPixels}
              onChange={(_, v) => setProgress(v as number)}
            />
          </Html>
          <Line points={[p0.x, p0.y, p1.x, p1.y]} stroke="black" />
          <Line points={[p1.x, p1.y, p2.x, p2.y]} stroke="black" />
          <Line points={[p2.x, p2.y, p0.x, p0.y]} stroke="black" />
          {/* Draw grid */}
          {Array.from(Array(xLines).keys()).map((i) => (
            <Line
              key={`x${i}`}
              points={[start.x, start.y + i * 10, end.x, start.y + i * 10]}
              stroke="black"
              strokeWidth={0.5}
            />
          ))}
          {Array.from(Array(yLines).keys()).map((i) => (
            <Line
              key={`y${i}`}
              points={[start.x + i * 10, start.y, start.x + i * 10, end.y]}
              stroke="black"
              strokeWidth={0.5}
            />
          ))}
          <Line points={[start.x, start.y, end.x, start.y]} stroke="black" />
          <Line points={[start.x, end.y, end.x, end.y]} stroke="black" />
          <Line points={[start.x, start.y, start.x, end.y]} stroke="black" />
          <Line points={[end.x, start.y, end.x, end.y]} stroke="black" />
          {/* Draw progress */}
          {Array.from(Array(progress).keys()).map((i) => {
            const pos = {
              x: start.x + (i % xLines) * 10 + 5,
              y: start.y + Math.floor(i / xLines) * 10 + 5,
            };
            const e1 = edgeFunction(p0, p1, pos);
            const e2 = edgeFunction(p1, p2, pos);
            const e3 = edgeFunction(p2, p0, pos);
            const inside = e1 >= 0 && e2 >= 0 && e3 >= 0;
            return (
              <Rect
                key={`p${i}`}
                x={pos.x - 5}
                y={pos.y - 5}
                width={10}
                height={10}
                fill={inside ? "red" : "black"}
                opacity={0.8}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
