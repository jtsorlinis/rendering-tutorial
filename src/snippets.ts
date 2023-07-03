const edgeFunc = `// Returns double the signed area but that's fine
const signedArea = (a: Point, b: Point, c: Point) => {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
};

const ABC = signedArea(A, B, C);`;

const edgeFunc2 = `const ABC = signedArea(A, B, C);

// If the signed area is negative, it's a back facing triangle and we can cull it
if (ABC < 0) {
  // Don't bother drawing this triangle
}`;

const pointInTriangle1 = `// Get the signed area of the triangle ABP
const ABP = signedArea(A, B, P);

if (ABP > 0) {
  // Point is inside the edge AB
}`;

const pointInTriangle1b = `// We can pass the points in any order as long as they're clockwise
const ABP = signedArea(A, B, P);
const BPA = signedArea(B, P, A);
const PAB = signedArea(P, A, B);

ABP === BPA === PAB;`;

const pointInTriangle2 = `// Get the signed area of all three triangles that make up ABC 
// (Remember clockwise ordering)
const ABP = signedArea(A, B, P); 
const BCP = signedArea(B, C, P);
const CAP = signedArea(C, A, P);

if (ABP > 0 && BCP > 0 && CAP > 0) {
  // Point is inside the triangle ABC
}`;

const drawTriangle1 = `const P = new Point(0, 0);

// Loop through all the pixels of the canvas
for (P.y = 0; P.y < canvas.height; P.y++) {
  for (P.x = 0; P.x < canvas.width; P.x++) {
    // Get our signed areas
    const ABP = signedArea(A, B, P);
    const BCP = signedArea(B, C, P);
    const CAP = signedArea(C, A, P);

    // If all the signed areas are positive, the point is inside the triangle
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
    // Get our signed areas
    const ABP = signedArea(A, B, P);
    const BCP = signedArea(B, C, P);
    const CAP = signedArea(C, A, P);

    // If all the signed areas are positive, the point is inside the triangle
    if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
      // Draw the pixel
      setPixel(P.x, P.y, "red");
    }
  }
}`;

const barycentric1 = `
const ABP = signedArea(A, B, P);

// Total signed area of the triangle ABC
const ABC = signedArea(A, B, C);

// We can divide ABP by the total area (ABC) to get the weight of the point P towards point C
const normalized = ABP / ABC;`;

const barycentric2 = `// Get the signed area of all three triangles that make up ABC (Remember clockwise ordering)
const BCP = signedArea(B, C, P);
const CAP = signedArea(C, A, P);
const ABP = signedArea(A, B, P);

// We now have the weights of the point P towards each of the vertices (Barycentric coordinates)
const weightA = BCP / ABC;
const weightB = CAP / ABC;
const weightC = ABP / ABC;
`;

const barycentric3 = `// We can interpolate attributes using the barycentric coordinates
const colourA = new Colour(255, 0, 0); // Red
const colourB = new Colour(0, 255, 0); // Green
const colourC = new Colour(0, 0, 255); // Blue

// We now have the interpolated colour of the point P
const colourP = colourA.multiply(weightA) + colourB.multiply(weightB) + colourC.multiply(weightC);
`;

export const snippets = {
  edgeFunc,
  edgeFunc2,
  pointInTriangle1,
  pointInTriangle1b,
  pointInTriangle2,
  drawTriangle1,
  boundingBox,
  barycentric1,
  barycentric2,
  barycentric3,
};
