import { Stage, Layer, Line, Rect, Circle, Text } from "react-konva";
import { Button } from "@mui/material";
import { useState } from "react";
import { Point, dragProps } from "../../utils";

const width = 500;
const height = 500;
const pad = 75;

const pixelSize = 20;
const halfPixel = pixelSize / 2;

const p0 = { x: halfPixel, y: height - halfPixel };
const p1start = { x: width - pad, y: pad };

const canvPad = 0;
const start = { x: canvPad, y: canvPad };
const end = { x: width - canvPad, y: height - canvPad };

const xLines = (end.y - start.y) / pixelSize;
const yLines = (end.x - start.x) / pixelSize;
const totalPixels = xLines * yLines;

const lineAlgorithm2 = (start: Point, end: Point) => {
  const points = [];
  const slope = (end.y - start.y) / (end.x - start.x);
  const steep = Math.abs(slope) > 1;
  if (steep) {
    let x = start.x;
    for (let y = start.y; y >= end.y; y--) {
      points.push({ x: ~~x, y: ~~y });
      x += 1 / -slope;
    }
  } else {
    let y = start.y;
    for (let x = start.x; x <= end.x; x++) {
      points.push({ x: ~~x, y: ~~y });
      y += slope;
    }
  }
  return points;
};

export const Line2 = () => {
  const [p1, setP1] = useState<Point>(p1start);

  const p0grid = { x: p0.x / pixelSize, y: p0.y / pixelSize };
  const p1grid = { x: p1.x / pixelSize, y: p1.y / pixelSize };
  const points = lineAlgorithm2(p0grid, p1grid);
  const slope = -(p1grid.y - p0grid.y) / (p1grid.x - p0grid.x);

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
          <Text
            text={`Slope: ${slope.toFixed(2)}`}
            x={10}
            y={10}
            fontSize={16}
          />
          <Line points={[p0.x, p0.y, p1.x, p1.y]} stroke="black" />
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
              opacity={0.2}
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
              opacity={0.2}
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
            if (!isOnLine) return null;
            return (
              <Rect
                key={`p${i}`}
                x={pos.x * pixelSize}
                y={pos.y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={"red"}
                opacity={0.8}
              />
            );
          })}
          {/* Draggable points */}
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
