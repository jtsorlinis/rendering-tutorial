import { Typography } from "@mui/material";
import interpolatedTriangle from "../../images/interpolatedTriangle.png";
import rasterisation from "../../images/rasterisation.png";
import shapesFromTris from "../../images/shapesFromTris.png";
import { Rasterisation } from "../demos/Rasterisation";

export const Introduction = () => {
  return (
    <>
      <Typography className="sectionHeading" variant="h5">
        Introduction
      </Typography>
      <p>
        In this tutorial we're going to learn how to rasterise a triangle. I've
        been learning about triangle rasterisation recently and found a few
        different resources but I didn't feel like any of them explained the
        concepts too clearly.
      </p>
      <p>
        So I thought it would be fun (and hopefully helpful) to write a tutorial
        about it. I'm going to assume you have a basic understanding of linear
        algebra, and have a decent grasp on programming. If not, don't worry,
        I'll try to explain everything as best I can.
      </p>
      <div className="center">
        <figure>
          <img src={interpolatedTriangle} alt="triangle" />
          <figcaption>Here's what we'll (hopefully) end up with</figcaption>
        </figure>
      </div>
      <Typography className="sectionHeading" variant="h5">
        What even is Rasterisation?
      </Typography>
      <p>
        Put simply, rasterisation is the process of converting an image made up
        of lines and shapes into pixels. Why do we need to do this? Because
        screens/displays only understand pixels, they have no concept of
        anything like shapes or lines. It's much easier to draw with shapes and
        lines though, so this is how we store our graphics. The goal of our
        little rasteriser we'll be writing is to convert a triangle made up of 3
        points into its pixels on the screen. It might be easier to understand
        with an image:
      </p>
      <div className="center">
        <figure>
          <img src={rasterisation} alt="triangle" />
          <figcaption>Shapes to pixels</figcaption>
        </figure>
      </div>
      <p>
        The image on the right looks quite blocky, but pixels in real life are
        usually much smaller than this, so the image looks smooth. The smaller
        the pixels, the smoother the image. Our goal is to get from the triangle
        on the left to the pixels on the right so we can put it on the screen.
      </p>
      <p>
        Why triangles? There's a few reasons, but the main one is it's the
        simplest shape that can be used to make any shape. If you have enough
        triangles you can make any shape you want.
      </p>
      <div className="center">
        <figure>
          <img src={shapesFromTris} alt="triangle" />
          <figcaption>Triangles and more triangles</figcaption>
        </figure>
      </div>
      <Typography className="sectionHeading" variant="h5">
        So how do we actually rasterize a triangle?
      </Typography>
      <p>
        There's a few different ways to do this, but the way we'll be doing it
        is by looping through all the pixels in the canvas and determining if
        they are inside the triangle or not. If they are, we draw them. If not,
        we don't. Simple right? Have a play around with the below demo to see it
        in action:
      </p>
      <div className="center">
        <Rasterisation />
      </div>
      <br />
      <p>
        The demo above is single threaded and running sequentially, but GPU's
        usually do thousands or more in parallel. I've always found the
        following video to be a really great way of visualising it:
      </p>
      <br />
      <div className="ytWrapper">
        <div className="ytContainer">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/-P28LKWTzrI"
            title="YouTube video player"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
      </div>
    </>
  );
};
