import { Stage, Layer, Text, Arrow, Line } from "react-konva";
import { Button, Slider } from "@mui/material";
import { useState } from "react";
import { Html } from "react-konva-utils";

const width = 500;
const height = 500;
const size = 150;
const sizeY = (size / 2) * Math.sqrt(3);
const mid = sizeY / 3;

const p0start = { x: -size, y: sizeY - mid };
const p1start = { x: 0, y: -sizeY - mid };
const p2start = { x: size, y: sizeY - mid };

export const EdgeRight = () => {
  const [rotation, setRotation] = useState<number>(0);

  const rotRad = rotation * (Math.PI / 180);

  const p0 = {
    x: p0start.x * Math.cos(rotRad) - p0start.y * Math.sin(rotRad) + 250,
    y: p0start.x * Math.sin(rotRad) + p0start.y * Math.cos(rotRad) + 250,
  };

  const p1 = {
    x: p1start.x * Math.cos(rotRad) - p1start.y * Math.sin(rotRad) + 250,
    y: p1start.x * Math.sin(rotRad) + p1start.y * Math.cos(rotRad) + 250,
  };

  const p2 = {
    x: p2start.x * Math.cos(rotRad) - p2start.y * Math.sin(rotRad) + 250,
    y: p2start.x * Math.sin(rotRad) + p2start.y * Math.cos(rotRad) + 250,
  };

  const midp0p1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
  const p1p0 = { x: p1.x - p0.x, y: p1.y - p0.y };
  const perp = { x: -p1p0.y / 1.75, y: p1p0.x / 1.75 };
  const end = { x: midp0p1.x + perp.x, y: midp0p1.y + perp.y };

  return (
    <div className="container" style={{ width: width }}>
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          setRotation(0);
        }}
      >
        Reset
      </Button>
      <Stage width={width} height={height} className="stage">
        <Layer>
          <Html
            divProps={{
              style: {
                position: "absolute",
                left: "5%",
                top: "450px",
                width: "90%",
              },
            }}
          >
            <Slider
              value={rotation}
              valueLabelDisplay="on"
              min={-180}
              max={180}
              onChange={(_, v) => setRotation(v as number)}
            />
          </Html>
          <Arrow
            points={[p0.x, p0.y, p1.x, p1.y]}
            stroke="black"
            pointerWidth={10}
            pointerLength={15}
            fill="black"
          />
          <Line
            points={[p1.x, p1.y, p2.x, p2.y]}
            stroke="black"
            pointerWidth={10}
            pointerLength={15}
            opacity={0.2}
            dash={[10, 5]}
          />
          <Line
            points={[p2.x, p2.y, p0.x, p0.y]}
            stroke="black"
            pointerWidth={10}
            pointerLength={15}
            opacity={0.2}
            dash={[10, 5]}
          />
          <Arrow
            points={[midp0p1.x, midp0p1.y, end.x, end.y]}
            stroke="red"
            fill="red"
          />
          <Text
            text="Right"
            fontSize={16}
            x={end.x}
            y={end.y}
            offsetY={20}
            offsetX={60}
            fill="red"
            rotation={rotation + 30}
          />
          <Text text={`A`} fontSize={16} x={p0.x - 12} y={p0.y + 5} />
          <Text text={`B`} fontSize={16} x={p1.x} y={p1.y - 20} />
        </Layer>
      </Stage>
    </div>
  );
};
