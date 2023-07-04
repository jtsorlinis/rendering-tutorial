import { Stage, Layer, Text, Arrow } from "react-konva";
import { Button } from "@mui/material";
import { Point, edgeFunction } from "../components/utils";
import { useState } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { Html } from "react-konva-utils";

const width = 1000;
const height = 500;
const pad = 150;
const add = 300;

const p0start = { x: pad, y: height - pad };
const p1start = { x: width / 2, y: pad };
const p2start = { x: width - pad, y: height - pad };

export const WindingOrderDemo = () => {
  const [p0, setP0] = useState<Point>(p0start);
  const [p1, setP1] = useState<Point>(p1start);
  const [p2, setP2] = useState<Point>(p2start);
  const signedArea = edgeFunction(p0, p1, p2);

  const center = {
    x: (p0.x + p1.x + p2.x) / 3 - 24,
    y: (p0.y + p1.y + p2.y) / 3 - 24,
  };

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
          <Html
            divProps={{
              style: {
                position: "absolute",
                top: `${center.y}px`,
                left: `${center.x}px`,
                scale: 2,
                pointerEvents: "none",
              },
            }}
          >
            {signedArea > 0 ? (
              <RotateRightIcon />
            ) : (
              <RotateLeftIcon sx={{ fill: "red" }} />
            )}
          </Html>
          <Text
            fill={signedArea > 0 ? "black" : "red"}
            text={`Winding order: ${
              signedArea > 0 ? "Clockwise" : "Counter-clockwise"
            }`}
            fontSize={16}
            x={10}
            y={10}
          />
          <Text
            text={`Signed area: ${signedArea}`}
            fontSize={16}
            x={10}
            y={30}
          />
          <Arrow
            points={[p0.x, p0.y, p1.x, p1.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill={signedArea > 0 ? "black" : "red"}
          />
          <Arrow
            points={[p1.x, p1.y, p2.x, p2.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill={signedArea > 0 ? "black" : "red"}
          />
          <Arrow
            points={[p2.x, p2.y, p0.x, p0.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill={signedArea > 0 ? "black" : "red"}
          />
          <Text text="A" fontSize={16} x={p0.x - 16} y={p0.y + 8} />
          <Text text="B" fontSize={16} x={p1.x - 5} y={p1.y - 20} />
          <Text text="C" fontSize={16} x={p2.x + 5} y={p2.y + 8} />
          <Text text="Clockwise" fontSize={20} x={205} y={400} />
          <Text text="Counter-clockwise" fontSize={20} x={470} y={400} />

          <Html
            divProps={{
              style: {
                position: "absolute",
                top: `${center.y}px`,
                left: `${center.x + 300}px`,
                scale: 2,
                pointerEvents: "none",
              },
            }}
          >
            <RotateLeftIcon sx={{ fill: "red" }} />
          </Html>

          <Arrow
            points={[p1.x + add, p1.y, p0.x + add, p0.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill="red"
          />
          <Arrow
            points={[p2.x + add, p2.y, p1.x + add, p1.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill={"red"}
          />
          <Arrow
            points={[p0.x + add, p0.y, p2.x + add, p2.y]}
            stroke={"black"}
            pointerWidth={10}
            pointerLength={15}
            fill="red"
          />
          <Text text="A" fontSize={16} x={p0.x - 16 + add} y={p0.y + 8} />
          <Text text="B" fontSize={16} x={p2.x + 5 + add} y={p2.y + 8} />
          <Text text="C" fontSize={16} x={p1.x - 5 + add} y={p1.y - 20} />

          {/* Draggable points */}
        </Layer>
      </Stage>
    </div>
  );
};
