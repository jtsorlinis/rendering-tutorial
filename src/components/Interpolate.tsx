import { Stage, Layer, Shape, Circle, Text, Rect } from "react-konva";
import { useState } from "react";
import { Button } from "@mui/material";
import { Point, midPoint, edgeFunction, rgba } from "./utils";

const width = 500;
const height = 500;
const pad = 50;

const p0 = { x: pad, y: height - pad };
const p1 = { x: width / 2, y: pad };
const p2 = { x: width - pad, y: height - pad };

export const Interpolate = () => {
  const [dot, setDot] = useState<Point>(midPoint(p0, p1, p2));
  const signedArea = edgeFunction(p0, p1, p2);
  const bcu = edgeFunction(p1, p2, dot) / signedArea;
  const bcv = edgeFunction(p2, p0, dot) / signedArea;
  const bcw = edgeFunction(p0, p1, dot) / signedArea;

  return (
    <div className="container" style={{ width: width }}>
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => setDot(midPoint(p0, p1, p2))}
      >
        Reset
      </Button>
      <Stage width={width} height={height} className="stage">
        <Layer>
          <Text
            fill={bcu > 0 ? "black" : "red"}
            text={`Red (A):\t\t\t\t\t${~~(bcu * 255)}`}
            fontSize={16}
            x={10}
            y={10}
          />
          <Text
            fill={bcv > 0 ? "black" : "red"}
            text={`Green (B):\t${~~(bcv * 255)}`}
            fontSize={16}
            x={10}
            y={30}
          />
          <Text
            fill={bcw > 0 ? "black" : "red"}
            text={`Blue (C):\t\t\t\t${~~(bcw * 255)}`}
            fontSize={16}
            x={10}
            y={50}
          />
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
          {/* BC U */}
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.lineTo(p1.x, p1.y);
              context.lineTo(p2.x, p2.y);
              context.lineTo(dot.x, dot.y);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            stroke={"black"}
            fill="red"
            opacity={bcu > 0 ? bcu : 0}
            strokeWidth={1}
          />
          {/* BC V */}
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(p2.x, p2.y);
              context.lineTo(p0.x, p0.y);
              context.lineTo(dot.x, dot.y);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            stroke={"black"}
            fill="lime"
            opacity={bcv > 0 ? bcv : 0}
            strokeWidth={1}
          />
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
            fill="blue"
            opacity={bcw > 0 ? bcw : 0}
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
            }}
          />
          {/* Colour at P */}
          {bcu >= 0 && bcv >= 0 && bcw >= 0 && (
            <Rect
              x={10}
              y={80}
              width={40}
              height={40}
              fill={rgba(bcu, bcv, bcw)}
            />
          )}
          <Text text="P" fontSize={16} x={dot.x + 8} y={dot.y - 6} />
        </Layer>
      </Stage>
    </div>
  );
};
