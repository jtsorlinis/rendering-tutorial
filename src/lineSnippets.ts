const line1 = `// Make copies of start and end values
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

export const lineSnippets = {
  line1,
  line2,
  line3,
};
