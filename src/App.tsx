import "./App.css";
import { Link, Typography } from "@mui/material";
import { Barycentric } from "./components/Barycentric";

function App() {
  return (
    <>
      <Typography variant="h3">Rasterizing a triangle</Typography>
      <Typography variant="body1">
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </Typography>
      <br />
      <Typography variant="h5">
        Determining whether a point is indide a triangle
      </Typography>
      <Barycentric />
    </>
  );
}

export default App;
