import { Typography, Link } from "@mui/material";
import { PageProgress } from "./PageProgress";
import { ToggleThemeButton } from "./ThemeToggleProvider";
import { ReactNode } from "react";

export const PageWrapper = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => {
  return (
    <>
      <PageProgress />
      <ToggleThemeButton />
      <br />
      <Typography variant="h3">{heading}</Typography>
      <span>
        By <Link href="https://github.com/jtsorlinis">Jason Tsorlinis</Link>
      </span>
      <div>{children}</div>
    </>
  );
};
