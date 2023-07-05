import { Stage, Layer, Line } from "react-konva";
import { Button, Slider } from "@mui/material";
import { useState } from "react";
import { Html } from "react-konva-utils";

const width = 500;
const height = 500;
const pad = 100;

const p0 = { x: pad, y: height - pad };
const p1 = { x: width / 2, y: pad };
const p2 = { x: width - pad, y: height - pad };

export const Rasterisation = () => {
  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="container" style={{ width: width }}>
      <Button
        className="resetButton"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          setProgress(0);
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
                top: "460px",
                width: "90%",
              },
            }}
          >
            <Slider
              value={progress}
              valueLabelDisplay="on"
              min={0}
              max={100}
              onChange={(_, v) => setProgress(v as number)}
            />
          </Html>
          <Line points={[p0.x, p0.y, p1.x, p1.y]} stroke="black" fill="black" />
          <Line points={[p1.x, p1.y, p2.x, p2.y]} stroke="black" />
          <Line points={[p2.x, p2.y, p0.x, p0.y]} stroke="black" />
        </Layer>
      </Stage>
    </div>
  );
};
