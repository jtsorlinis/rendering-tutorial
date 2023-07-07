export type Point = {
  x: number;
  y: number;
};

export const edgeFunction = (a: Point, b: Point, c: Point) => {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
};

export const midPoint = (a: Point, b: Point, c: Point) => {
  return {
    x: (a.x + b.x + c.x) / 3,
    y: (a.y + b.y + c.y) / 3,
  };
};

export const rgba = (
  red: number,
  green: number,
  blue: number,
  alpha?: number
) => {
  const r = Math.floor(red * 255);
  const g = Math.floor(green * 255);
  const b = Math.floor(blue * 255);
  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const mouseOver = () => {
  document.body.style.cursor = "grab";
};

export const mouseOut = () => {
  document.body.style.cursor = "default";
};

export const dragEnd = () => {
  document.body.style.cursor = "grab";
};

export const dragProps = {
  onMouseOver: mouseOver,
  onMouseOut: mouseOut,
  onDragEnd: dragEnd,
};

export const lineAlgorithm1 = (start: Point, end: Point) => {
  const points = [];
  // Make copies of start and end values
  const [sx, ex] = [start.x, end.x];
  const [sy, ey] = [start.y, end.y];

  const slope = (ey - sy) / (ex - sx);

  let y = sy;
  for (let x = sx; x <= ex; x++) {
    points.push({ x: ~~x, y: ~~y });
    y += slope;
  }
  return points;
};

export const lineAlgorithm2 = (start: Point, end: Point) => {
  const points = [];
  // Make copies of start and end values
  let [sx, ex] = [start.x, end.x];
  let [sy, ey] = [start.y, end.y];

  let slope = (ey - sy) / (ex - sx);
  const steep = Math.abs(slope) > 1;

  if (steep) {
    // Swap x and y
    [sx, sy] = [sy, sx];
    [ex, ey] = [ey, ex];

    // Invert slope
    slope = 1 / slope;
  }

  let y = sy;
  for (let x = sx; x <= ex; x++) {
    if (steep) {
      points.push({ x: ~~y, y: ~~x });
    } else {
      points.push({ x: ~~x, y: ~~y });
    }
    y += slope;
  }
  return points;
};

export const lineAlgorithm3 = (start: Point, end: Point) => {
  const points = [];
  // Make copies of start and end values
  let [sx, ex] = [start.x, end.x];
  let [sy, ey] = [start.y, end.y];

  let slope = (ey - sy) / (ex - sx);
  const steep = Math.abs(slope) > 1;

  if (steep) {
    // Swap x and y
    [sx, sy] = [sy, sx];
    [ex, ey] = [ey, ex];

    // Invert slope
    slope = 1 / slope;
  }

  if (ex < sx) {
    [sx, ex] = [ex, sx];
    [sy, ey] = [ey, sy];
  }

  let y = sy;
  for (let x = sx; x <= ex; x++) {
    if (steep) {
      points.push({ x: ~~y, y: ~~x });
    } else {
      points.push({ x: ~~x, y: ~~y });
    }
    y += slope;
  }
  return points;
};
