const line1 = `const drawLine(start: Point, end: Point) {
  // Make copies of start and end values
  let [sx, ex] = [start.x, end.x];
  let [sy, ey] = [start.y, end.y];

  // Calculate our slope
  let slope = (ey - sy) / (ex - sx);

  // Set our starting y value
  let y = sy;

  // Loop through all the x values
  for (let x = sx; x <= ex; x++) {
    // Draw a pixel at the current x and y values
    setPixel(x, y);

    // Increment our y value by the slope
    y += slope;
  }
}`;

const line2 = `let [sx, ex] = [start.x, end.x];
let [sy, ey] = [start.y, end.y];

let slope = (ey - sy) / (ex - sx);

// Check if the slope is steep
const steep = Math.abs(slope) > 1; // We use absolute value cause the slope can be negative

if (steep) {
  // Swap the x and y values
  [sx, sy] = [sy, sx];
  [ex, ey] = [ey, ex];

  // Invert the slope
  slope = 1 / slope;
}

let y = sy;
for (let x = sx; x <= ex; x++) {
  if (steep) {
    setPixel(y, x); // If we swapped the x and y values, we need to swap them back when drawing
  } else {
    setPixel(x, y);
  }
  y += slope;
}`;

const line3 = `let [sx, ex] = [start.x, end.x];
let [sy, ey] = [start.y, end.y];

let slope = (ey - sy) / (ex - sx);

const steep = Math.abs(slope) > 1;

if (steep) {
  [sx, sy] = [sy, sx];
  [ex, ey] = [ey, ex];
  slope = 1 / slope;
}

// This is all we're adding
if (ex < sx) {
  [sx, ex] = [ex, sx];
  [sy, ey] = [ey, sy];
}

let y = sy;
for (let x = sx; x <= ex; x++) {
  if (steep) {
    setPixel(y, x);
  } else {
    setPixel(x, y);
  }
  y += slope;
}`;

const bresenham = `// Make copies of start and end values
// ~~ is equivalent to Math.floor() but faster
let [x, y] = [~~start.x, ~~start.y];
const [x1, y1] = [~~end.x, ~~end.y];

// Calculate the difference between the start and end points
const diffx = Math.abs(x1 - x);
const diffy = -Math.abs(y1 - y);

// Calculate the step directions for x and y
const stepx = x < x1 ? 1 : -1;
const stepy = y < y1 ? 1 : -1;

// Calculate the error
let error = diffx + diffy;

// Loop until we reach the end point
while (true) {
  // Draw the current pixel
  setPixel(x, y);

  // Check if we've reached the end point
  if (x === x1 && y === y1) break;

  // Calculate double the error
  const e2 = 2 * error;

  // Check if we need to increment y
  if (e2 >= diffy) {
    error += diffy;
    x += stepx;
  }

  // Check if we need to increment x
  if (e2 <= diffx) {
    error += diffx;
    y += stepy;
  }
}`;

export const lineSnippets = {
  line1,
  line2,
  line3,
  bresenham,
};
