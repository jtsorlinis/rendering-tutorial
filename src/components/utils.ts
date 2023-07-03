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
