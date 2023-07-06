import { Stage, Layer, Shape, Circle, Text, Rect } from "react-konva";
import { Button } from "@mui/material";
import { Point, dragProps } from "../utils";
import { useState } from "react";

const width = 500;
const height = 500;
const pad = 100;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };
const p2start = { x: width - pad, y: height - pad };

export const BoundingBox = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);
  const canvasPixels = width * height;
  const minX = Math.min(p0.x, p1.x, p2.x);
  const minY = Math.min(p0.y, p1.y, p2.y);
  const maxX = Math.max(p0.x, p1.x, p2.x);
  const maxY = Math.max(p0.y, p1.y, p2.y);
  const bboxPixels = (maxX - minX) * (maxY - minY);
  const speedup = canvasPixels / bboxPixels;

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
          <Text
            text={`Canvas pixels: ${canvasPixels}`}
            fontSize={16}
            x={10}
            y={10}
          />
          <Text
            text={`Bounding Box pixels: ${~~bboxPixels}`}
            fontSize={16}
            x={10}
            y={30}
          />
          <Text
            text={`Speedup: ${speedup.toFixed(2)}x`}
            fill="green"
            fontSize={16}
            x={10}
            y={50}
          />
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(p0.x, p0.y);
              context.lineTo(p1.x, p1.y);
              context.lineTo(p2.x, p2.y);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            stroke={"black"}
            strokeWidth={2}
          />
          <Text text="A" fontSize={16} x={p0.x - 16} y={p0.y + 5} />
          <Text text="B" fontSize={16} x={p1.x - 5} y={p1.y - 20} />
          <Text text="C" fontSize={16} x={p2.x + 5} y={p2.y + 5} />

          <Rect
            x={minX}
            y={minY}
            width={maxX - minX}
            height={maxY - minY}
            fill={"red"}
            opacity={0.3}
          />

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
