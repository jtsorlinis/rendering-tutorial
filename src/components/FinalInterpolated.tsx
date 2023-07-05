import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import { Button } from "@mui/material";
import { useState } from "react";
import { Point, dragProps, edgeFunction } from "./utils";

const width = 500;
const height = 500;
const pad = 80;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };
const p2start = { x: width - pad, y: height - pad };

const canvPad = 0;
const start = { x: canvPad, y: canvPad };
const end = { x: width - canvPad, y: height - canvPad };

const pixelSize = 10;
const halfPixel = pixelSize / 2;
const xLines = (end.y - start.y) / pixelSize;
const yLines = (end.x - start.x) / pixelSize;
const totalPixels = xLines * yLines;

export const FinalInterpolated = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);

  const invArea = Math.abs(1 / edgeFunction(p0, p1, p2));

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
          setP0(p0start);
          setP1(p1start);
          setP2(p2start);
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
          <Line
            points={[p1.x, p1.y, p2.x, p2.y]}
            stroke="black"
            opacity={0.5}
          />
          <Line
            points={[p2.x, p2.y, p0.x, p0.y]}
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
              x: start.x + (i % xLines) * pixelSize + halfPixel,
              y: start.y + Math.floor(i / xLines) * pixelSize + halfPixel,
            };
            const e1 = edgeFunction(p0, p1, pos) * invArea * 255;
            const e2 = edgeFunction(p1, p2, pos) * invArea * 255;
            const e3 = edgeFunction(p2, p0, pos) * invArea * 255;
            const inside = e1 >= 0 && e2 >= 0 && e3 >= 0;
            const col = `rgb(${e2}, ${e3}, ${e1})`;
            return (
              <Rect
                key={`p${i}`}
                x={pos.x - halfPixel}
                y={pos.y - halfPixel}
                width={pixelSize}
                height={pixelSize}
                fill={inside ? col : "black"}
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
          <Circle
            draggable
            x={p2.x}
            y={p2.y}
            radius={5 / scale}
            fill={"dodgerblue"}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP2(mousePos);
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
          <Circle
            draggable
            x={p2.x}
            y={p2.y}
            radius={22}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP2(mousePos);
              document.body.style.cursor = "grabbing";
            }}
            {...dragProps}
          />
        </Layer>
      </Stage>
    </div>
  );
};
