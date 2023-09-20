import { alpha } from "@mui/material";

const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#6200EE",
  dark: "#5300ee",
  darker: "#9300ee",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#03DAC6",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};
const APPBAR = {
  main: "#181618",
};

const themeOptions = {
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
    success: SUCCESS,
    appbar: APPBAR,
    text: { primary: GREY[500], secondary: GREY[600], disabled: GREY[700] },
    background: { paper: "#15161a", default: "#15121a", neutral: GREY[200] },
    action: {
      active: GREY[600],
      hover: GREY[500_16],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  },
  shape: { borderRadius: 8 },
};

export default themeOptions;
