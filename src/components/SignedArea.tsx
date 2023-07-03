import { Stage, Layer, Shape, Circle, Text } from "react-konva";
import { Button } from "@mui/material";
import { Point, dragProps, edgeFunction } from "./utils";
import { useState } from "react";

const width = 500;
const height = 500;
const pad = 150;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };
const p2start = { x: width - pad, y: height - pad };

export const SignedArea = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);
  const signedArea = edgeFunction(p0, p1, p2);

  return (
    <div className="container" style={{ width: width }}>
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
      <Stage width={width} height={height} className="stage">
        <Layer>
          <Text
            fill={signedArea > 0 ? "black" : "red"}
            text={`Order: ${
              signedArea > 0 ? "Clockwise" : "Counter-clockwise"
            }`}
            fontSize={16}
            x={10}
            y={10}
          />
          <Text
            text={`Signed area: ${signedArea / 2}`}
            fontSize={16}
            x={10}
            y={30}
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
          <Text
            text={`A (${p0.x},${p0.y})`}
            fontSize={16}
            x={p0.x - 16}
            y={p0.y + 8}
          />
          <Text
            text={`B (${p1.x},${p1.y})`}
            fontSize={16}
            x={p1.x - 5}
            y={p1.y - 20}
          />
          <Text
            text={`C (${p2.x},${p2.y})`}
            fontSize={16}
            x={p2.x + 5}
            y={p2.y + 8}
          />

          {/* Draggable points */}
          <Circle
            draggable
            x={p0.x}
            y={p0.y}
            radius={5}
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
            radius={5}
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
            radius={5}
            fill={"dodgerblue"}
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
