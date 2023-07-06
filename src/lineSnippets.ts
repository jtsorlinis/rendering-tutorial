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

export const lineSnippets = {
  line1,
};
