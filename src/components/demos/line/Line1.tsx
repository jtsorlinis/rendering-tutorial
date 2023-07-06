import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import { Button } from "@mui/material";
import { useState } from "react";
import { Point, dragProps } from "../../utils";

const width = 500;
const height = 500;
const pad = 80;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };

const canvPad = 0;
const start = { x: canvPad, y: canvPad };
const end = { x: width - canvPad, y: height - canvPad };

const pixelSize = 20;
const xLines = (end.y - start.y) / pixelSize;
const yLines = (end.x - start.x) / pixelSize;
const totalPixels = xLines * yLines;

const lineAlgorithm1 = (start: Point, end: Point) => {
  const points = [];
  const slope = (end.y - start.y) / (end.x - start.x);
  let y = start.y;
  for (let x = start.x; x <= end.x; x++) {
    points.push({ x: ~~x, y: ~~y });
    y += slope;
  }
  return points;
};

export const Line1 = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);

  const p0grid = { x: p0.x / pixelSize, y: p0.y / pixelSize };
  const p1grid = { x: p1.x / pixelSize, y: p1.y / pixelSize };
  const points = lineAlgorithm1(p0grid, p1grid);

  const canvasSize = Math.min(window.innerWidth - 32, 500);
  const scale = canvasSize / 500;

  return (
    <div className="container">
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          setP0(p0start);
          setP1(p1start);
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
          <Line
            points={[p0.x, p0.y, p1.x, p1.y]}
            stroke="black"
            opacity={0.5}
          />
          {/* Draw grid */}
          {Array.from(Array(xLines).keys()).map((i) => (
            <Line
              key={`x${i}`}
              points={[
                start.x,
                start.y + i * pixelSize,
                end.x,
                start.y + i * pixelSize,
              ]}
              stroke="black"
              strokeWidth={0.5}
            />
          ))}
          {Array.from(Array(yLines).keys()).map((i) => (
            <Line
              key={`y${i}`}
              points={[
                start.x + i * pixelSize,
                start.y,
                start.x + i * pixelSize,
                end.y,
              ]}
              stroke="black"
              strokeWidth={0.5}
            />
          ))}
          <Line points={[start.x, start.y, end.x, start.y]} stroke="black" />
          <Line points={[start.x, end.y, end.x, end.y]} stroke="black" />
          <Line points={[start.x, start.y, start.x, end.y]} stroke="black" />
          <Line points={[end.x, start.y, end.x, end.y]} stroke="black" />
          {Array.from(Array(totalPixels).keys()).map((i) => {
            const pos = {
              x: start.x + (i % xLines),
              y: start.y + ~~(i / xLines),
            };
            const isOnLine = points.some((p) => p.x === pos.x && p.y === pos.y);
            return (
              <Rect
                key={`p${i}`}
                x={pos.x * pixelSize}
                y={pos.y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={isOnLine ? "red" : "black"}
                opacity={0.8}
              />
            );
          })}
          {/* Draggable points */}
          <Circle
            draggable
            x={p0.x}
            y={p0.y}
            radius={5 / scale}
            fill={"dodgerblue"}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP0(mousePos);
              document.body.style.cursor = "grabbing";
            }}
            {...dragProps}
          />
          <Circle
            draggable
            x={p1.x}
            y={p1.y}
            radius={5 / scale}
            fill={"dodgerblue"}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP1(mousePos);
              document.body.style.cursor = "grabbing";
            }}
            {...dragProps}
          />

          {/* Mobile hit */}
          <Circle
            draggable
            x={p0.x}
            y={p0.y}
            radius={22}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP0(mousePos);
              document.body.style.cursor = "grabbing";
            }}
            {...dragProps}
          />
          <Circle
            draggable
            x={p1.x}
            y={p1.y}
            radius={22}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP1(mousePos);
              document.body.style.cursor = "grabbing";
            }}
            {...dragProps}
          />
        </Layer>
      </Stage>
    </div>
  );
};
