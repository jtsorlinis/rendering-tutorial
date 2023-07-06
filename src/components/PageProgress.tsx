import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const PageProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LinearProgress
      className="pageProgress"
      variant="determinate"
      value={progress}
      onScroll={() => {
        console.log("he");
      }}
    />
  );
};
