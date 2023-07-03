const edgeFunc = `// Returns double the signed area but that's fine
const signedArea = (a: Point, b: Point, c: Point) => {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
};

signedArea(A, B, C);`;

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

const pointInTriangle2 = `// Get the signed area of all three triangles that make up ABC (Remember clockwise ordering)
const ABP = signedArea(A, B, P); 
const BCP = signedArea(B, C, P);
const CAP = signedArea(C, A, P);

if (ABP > 0 && BCP > 0 && CAP > 0) {
  // Point is inside the triangle ABC
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
  pointInTriangle1,
  pointInTriangle1b,
  pointInTriangle2,
  barycentric1,
  barycentric2,
  barycentric3,
};
