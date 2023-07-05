import { Stage, Layer, Shape, Circle, Text } from "react-konva";
import { useState } from "react";
import { Button } from "@mui/material";
import { Point, midPoint, edgeFunction, dragProps } from "./utils";

const width = 500;
const height = 500;
const pad = 52;

const p0 = { x: pad, y: height - pad };
const p1 = { x: width / 2, y: pad };
const p2 = { x: width - pad, y: height - pad };

export const PointInTriangle = () => {
  const [dot, setDot] = useState<Point>(midPoint(p0, p1, p2));
  const signedArea = edgeFunction(p0, p1, p2);
  const edgeAB = edgeFunction(p0, p1, dot);
  const bcw = edgeAB / signedArea;

  const canvasSize = Math.min(document.body.clientWidth - 32, 500);
  const scale = canvasSize / 500;

  return (
    <div className="container">
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => setDot(midPoint(p0, p1, p2))}
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
            fill={bcw > 0 ? "black" : "red"}
            text={`Edge function ABP: ${~~edgeAB}`}
            fontSize={16}
            x={10}
            y={10}
          />
          {/* Main triangle */}
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(p1.x, p1.y);
              context.setLineDash([5, 5]);
              context.lineTo(p2.x, p2.y);
              context.lineTo(p0.x, p0.y);
              context.fillStrokeShape(shape);
            }}
            stroke={"black"}
            strokeWidth={2}
          />
          <Text text="A" fontSize={16} x={p0.x - 16} y={p0.y} />
          <Text text="B" fontSize={16} x={p1.x - 5} y={p1.y - 20} />
          <Text text="C" fontSize={16} x={p2.x + 5} y={p2.y} />

          {/* BC W */}
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(p0.x, p0.y);
              context.lineTo(p1.x, p1.y);
              context.lineTo(dot.x, dot.y);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            stroke={"black"}
            fill={bcw > 0 ? "green" : "red"}
            strokeWidth={1}
          />
          {/* Draggable dot */}
          <Circle
            draggable
            x={dot.x}
            y={dot.y}
            radius={5}
            fill={"dodgerblue"}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setDot(mousePos);
              document.body.style.cursor = "grabbing";
            }}
            {...dragProps}
          />

          <Text text="P" fontSize={16} x={dot.x + 8} y={dot.y - 6} />
        </Layer>
      </Stage>
    </div>
  );
};
