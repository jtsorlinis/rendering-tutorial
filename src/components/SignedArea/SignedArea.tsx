import { Stage, Layer, Shape, Circle, Text, Rect } from "react-konva";
import "./SignedArea.css";
import { Button } from "@mui/material";
import { Point, edgeFunction } from "../utils";
import { useState } from "react";

const width = 600;
const height = 600;

const p0start = { x: 50, y: height - 50 };
const p1start = { x: width / 2, y: 50 };
const p2start = { x: width - 50, y: height - 50 };

export const SignedArea = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);
  const signedArea = edgeFunction(p0, p1, p2);

  return (
    <div className="container">
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
      >
        Reset
      </Button>
      <Stage width={width} height={height} className="stage">
        <Layer>
          {/* <Text
            fill={bcu > 0 ? "black" : "red"}
            text={`Edge BC: ${bcu.toFixed(3)}`}
            fontSize={16}
            x={10}
            y={10}
          /> */}
          {/* Main triangle */}
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
          <Text text="A" fontSize={16} x={p0.x - 16} y={p0.y} />
          <Text text="B" fontSize={16} x={p1.x - 5} y={p1.y - 20} />
          <Text text="C" fontSize={16} x={p2.x + 5} y={p2.y} />

          {/* Draggable points */}
          <Circle
            draggable
            x={p0.x}
            y={p0.y}
            radius={5}
            fill={"black"}
            onDragMove={(e) => {
              const mousePos = { x: e.target.x(), y: e.target.y() };
              setP0(mousePos);
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};
