import {
  IconButton,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React, { ReactNode } from "react";
import { useMemo, useState } from "react";

const ThemeToggleContext = React.createContext({
  toggleColorMode: () => {
    undefined;
  },
});

export const ThemeToggleProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export const ToggleThemeButton = () => {
  const { toggleColorMode } = React.useContext(ThemeToggleContext);
  const theme = useTheme();
  return (
    <IconButton
      sx={{ position: "absolute", top: "8px", right: "0" }}
      onClick={toggleColorMode}
    >
      {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
