import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import { Button } from "@mui/material";
import { useState } from "react";
import { Point, bresenham, dragProps } from "../../../utils/helperFuncs";

const width = 500;
const height = 500;
const pad = 75;

const pixelSize = 5;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };
const p2start = { x: width - pad, y: height - pad };

const canvPad = 0;
const start = { x: canvPad, y: canvPad };
const end = { x: width - canvPad, y: height - canvPad };

const xLines = (end.y - start.y) / pixelSize;
const yLines = (end.x - start.x) / pixelSize;

export const Line4 = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);

  const p0grid = { x: p0.x / pixelSize, y: p0.y / pixelSize };
  const p1grid = { x: p1.x / pixelSize, y: p1.y / pixelSize };
  const p2grid = { x: p2.x / pixelSize, y: p2.y / pixelSize };
  const points01 = bresenham(p0grid, p1grid);
  const points12 = bresenham(p1grid, p2grid);
  const points20 = bresenham(p2grid, p0grid);
  const points = [...points01, ...points12, ...points20];

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
          {points.map((pos, i) => {
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
          {/* Draggable visuals */}
          <Circle x={p0.x} y={p0.y} radius={5 / scale} fill={"dodgerblue"} />
          <Circle x={p1.x} y={p1.y} radius={5 / scale} fill={"dodgerblue"} />
          <Circle x={p2.x} y={p2.y} radius={5 / scale} fill={"dodgerblue"} />
          {/* Draggable hitboxes */}
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
