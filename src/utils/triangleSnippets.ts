const edgeFunc = `// Let's assume we have a Point type with an x and y property
interface Point {
  x: number;
  y: number;
}

// Returns double the signed area but that's fine
const edgeFunction = (a: Point, b: Point, c: Point) => {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
};

const ABC = edgeFunction(A, B, C);`;

const backfaceCulling = `const ABC = edgeFunction(A, B, C);

// If our edge function (signed area x2) is negative, it's a back facing triangle and we can cull it
if (ABC < 0) {
  // Don't bother drawing this triangle
}`;

const pointInTriangle1 = `// We can pass the points in any order as long as they're clockwise
const ABP = edgeFunction(A, B, P);
const BPA = edgeFunction(B, P, A);
const PAB = edgeFunction(P, A, B);

ABP === BPA === PAB;`;

const pointInTriangle1a = `// Calculate our edge function for AB and P
const ABP = edgeFunction(A, B, P);`;

const pointInTriangle1b = `// Check if the point is inside the edge AB
if (ABP >= 0) {
  // Point is inside the edge AB
}`;

const pointInTriangle2 = `// Calculate our edge function for all three edges of the triangle ABC
const ABP = edgeFunction(A, B, P); 
const BCP = edgeFunction(B, C, P);
const CAP = edgeFunction(C, A, P);`;

const pointInTriangle3 = `if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
  // Point is inside the triangle ABC
}`;

const drawTriangle1 = `const P = new Point(0, 0);

// Loop through all the pixels of the canvas
for (P.y = 0; P.y < canvas.height; P.y++) {
  for (P.x = 0; P.x < canvas.width; P.x++) {
    // Calculate our edge functions
    const ABP = edgeFunction(A, B, P);
    const BCP = edgeFunction(B, C, P);
    const CAP = edgeFunction(C, A, P);

    // If all the edge functions are positive, the point is inside the triangle
    if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
      // Draw the pixel
      setPixel(P.x, P.y, "red");
    }
  }
}`;

const boundingBox = `// Get the bounding box of the triangle
const minX = Math.min(A.x, B.x, C.x);
const minY = Math.min(A.y, B.y, C.y);
const maxX = Math.max(A.x, B.x, C.x);
const maxY = Math.max(A.y, B.y, C.y);

// Loop through all the pixels of the bounding box
for (P.y = minY; P.y < maxY; P.y++) {
  for (P.x = minX; P.x < maxX; P.x++) {
    // Calculate our edge functions
    const ABP = edgeFunction(A, B, P);
    const BCP = edgeFunction(B, C, P);
    const CAP = edgeFunction(C, A, P);

    // If all the edge functions are positive, the point is inside the triangle
    if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
      // Draw the pixel
      setPixel(P.x, P.y, "red");
    }
  }
}`;

const barycentric1 = `// Double the signed area of the triangle ABP
const ABP = edgeFunction(A, B, P);

// Double the signed area of the triangle ABC
const ABC = edgeFunction(A, B, C);

// We can divide ABP by the total area (ABC) to get the normalised weight of the point P towards point C
const normalised = ABP / ABC;`;

const barycentric2 = `// Get double the signed area of all three triangles that make up ABC
const BCP = edgeFunction(B, C, P);
const CAP = edgeFunction(C, A, P);
const ABP = edgeFunction(A, B, P);

// We now have the weights of the point P towards each of the vertices (Barycentric coordinates)
const weightA = BCP / ABC;
const weightB = CAP / ABC;
const weightC = ABP / ABC;

// These will always add up to 1
weightA + weightB + weightC === 1;
`;

const barycentric3 = `// We can interpolate attributes using the barycentric coordinates
const colourA = new Colour(255, 0, 0); // Red
const colourB = new Colour(0, 255, 0); // Green
const colourC = new Colour(0, 0, 255); // Blue

// We can now calculate the interpolated colour of the point P
const r = colourA.r * weightA + colourB.r * weightB + colourC.r * weightC;
const g = colourA.g * weightA + colourB.g * weightB + colourC.g * weightC;
const b = colourA.b * weightA + colourB.b * weightB + colourC.b * weightC;
const colourP = new Colour(r, g, b);
`;

const final = `// Create our points
const A = new Point(50, 450);
const B = new Point(250, 50);
const C = new Point(450, 450);

// Create our colours
const colourA = new Colour(255, 0, 0); // Red
const colourB = new Colour(0, 255, 0); // Green
const colourC = new Colour(0, 0, 255); // Blue

// Get the bounding box of the triangle
const minX = Math.min(A.x, B.x, C.x);
const minY = Math.min(A.y, B.y, C.y);
const maxX = Math.max(A.x, B.x, C.x);
const maxY = Math.max(A.y, B.y, C.y);

// Calculate the edge function for the whole triangle (ABC)
const ABC = edgeFunction(A, B, C);

// Our nifty trick: Don't bother drawing the triangle if it's back facing
if (ABC < 0) {
  return;
}

// Initialise our point
const P = new Point(0, 0);

// Loop through all the pixels of the bounding box
for (P.y = minY; P.y < maxY; P.y++) {
  for (P.x = minX; P.x < maxX; P.x++) {
    // Calculate our edge functions
    const ABP = edgeFunction(A, B, P);
    const BCP = edgeFunction(B, C, P);
    const CAP = edgeFunction(C, A, P);

    // Normalise the edge functions by dividing by the total area to get the barycentric coordinates
    const weightA = BCP / ABC;
    const weightB = CAP / ABC;
    const weightC = ABP / ABC;

    // If all the edge functions are positive, the point is inside the triangle
    if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
      // Interpolate the colours at point P
      const r = colourA.r * weightA + colourB.r * weightB + colourC.r * weightC;
      const g = colourA.g * weightA + colourB.g * weightB + colourC.g * weightC;
      const b = colourA.b * weightA + colourB.b * weightB + colourC.b * weightC;
      const colourP = new Colour(r, g, b);

      // Draw the pixel
      setPixel(P.x, P.y, "red");
    }
  }
}`;

export const snippets = {
  edgeFunc,
  backfaceCulling,
  pointInTriangle1,
  pointInTriangle1a,
  pointInTriangle1b,
  pointInTriangle2,
  pointInTriangle3,
  drawTriangle1,
  boundingBox,
  barycentric1,
  barycentric2,
  barycentric3,
  final,
};
