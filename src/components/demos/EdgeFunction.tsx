import { Stage, Layer, Circle, Text, Arrow, Line } from "react-konva";
import { Button } from "@mui/material";
import { Point, dragProps, edgeFunction } from "../utils";
import { useState } from "react";

const width = 500;
const height = 500;
const pad = 125;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };
const p2start = { x: width - pad, y: height - pad };

export const EdgeFunction = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);
  const signedArea = edgeFunction(p0, p1, p2);

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
          <Text
            fill={signedArea > 0 ? "black" : "red"}
            text={`Edge Function ABP: ${~~signedArea}`}
            fontSize={16}
            x={10}
            y={10}
          />
          <Text
            fill="black"
            text={`Side of AB: ${signedArea > 0 ? "Right" : "Left"}`}
            fontSize={16}
            x={10}
            y={30}
          />
          <Arrow
            points={[p0.x, p0.y, p1.x, p1.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill="black"
          />
          <Line
            points={[p1.x, p1.y, p2.x, p2.y]}
            stroke={signedArea > 0 ? "black" : "red"}
            pointerWidth={10}
            pointerLength={15}
            dash={[10, 5]}
          />
          <Line
            points={[p2.x, p2.y, p0.x, p0.y]}
            stroke={signedArea > 0 ? "black" : "red"}
            pointerWidth={10}
            pointerLength={15}
            dash={[10, 5]}
          />
          <Text text={`A`} fontSize={16} x={p0.x - 12} y={p0.y + 5} />
          <Text text={`B`} fontSize={16} x={p1.x} y={p1.y - 20} />
          <Text text={`P`} fontSize={16} x={p2.x + 5} y={p2.y + 8} />

          {/* Visible dots */}
          <Circle x={p2.x} y={p2.y} radius={5 / scale} fill={"dodgerblue"} />
          {/* Invisible draggables */}
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
