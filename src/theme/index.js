import React, { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import customizeComponents from "./customizations";
import { useDispatch, useSelector } from "react-redux";
import lightMode from "./themeOptions/lightMode";
import darkMode from "./themeOptions/darkMode";
import { updateDarkMode } from "./themeSlice";
import useAuth from "../hooks/useAuth";

function ThemeProvider({ children }) {
  const { user } = useAuth();
  const themeState = useSelector((state) => state.theme);
  let theme;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateDarkMode({ isDarkMode: user?.isDarkMode }));
  }, [dispatch, user]);

  if (themeState?.isDarkMode) {
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
