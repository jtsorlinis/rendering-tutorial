import "./App.css";
import { Link, Typography } from "@mui/material";
import { Barycentric } from "./components/Barycentric/Barycentric";
import { SignedArea } from "./components/SignedArea/SignedArea";

function App() {
  return (
    <>
      <Typography variant="h3">Rasterizing a triangle</Typography>
      <Typography variant="body1">
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </Typography>
      <br />
      <Typography variant="h5">Area of a triangle</Typography>
      <SignedArea />
      <Typography variant="body1">
        <p>The area of a triangle is given by the following formula:</p>
      </Typography>
      <Typography variant="h5">
        Determining whether a point is inside a triangle
      </Typography>
      <br />
      <Typography variant="h5">Interpolating attributes</Typography>
      <Typography variant="body1">
        <p>bla bla bla</p>
      </Typography>
      <Barycentric />
    </>
  );
}

export default App;
