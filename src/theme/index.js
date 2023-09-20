import React from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import customizeComponents from "./customizations";
import { useSelector } from "react-redux";
import lightMode from "./themeOptions/lightMode";
import darkMode from "./themeOptions/darkMode";

function ThemeProvider({ children }) {
  const themeState = useSelector((state) => state.theme);

  let theme;

  if (themeState.darkMode) {
    theme = createTheme(darkMode);
  } else {
    theme = createTheme(lightMode);
  }

  theme.components = customizeComponents(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
