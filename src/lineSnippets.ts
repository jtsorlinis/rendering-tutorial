const line1 = `// Calculate our slope
const slope = (end.y - start.y) / (end.x - start.x);

// Set our starting y value
let y = start.y;

// Loop through all the pixels on the x axis
for (let x = start.x; x <= end.x; x++) {
  
  // Draw the pixel
  setPixel(x, y);
  
  // Increment our y value by the slope
  y += slope;
}`;

const line2 = `// Calculate our slope
const slope = (end.y - start.y) / (end.x - start.x);

// Check if the slope is steep
const steep = Math.abs(slope) > 1; // We use absolute value cause the slope can be negative

if (steep) {
  let x = start.x; // We're going to be incrementing x instead of y

  // We loop through the y axis instead of the x axis
  for (let y = start.y; y <= end.y; y++) {
    setPixel(x, y);
    x += 1 / slope; // We increment x by the inverse of the slope
  }
} else {
  // Our previous code
  let y = start.y;
  for (let x = start.x; x <= end.x; x++) {
    setPixel(x, y);
    y += slope;
  }
}`;

export const lineSnippets = {
  line1,
  line2,
};
