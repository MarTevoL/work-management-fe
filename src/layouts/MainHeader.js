import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ReactComponent as LogoIcon } from "../workin-logo.svg";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDarkModeOff, setDarkModeOn } from "../theme/themeSlice";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function MainHeader({ open, handleDrawerClose, handleDrawerOpen }) {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const setOn = () => {
    dispatch(setDarkModeOn());
  };

  const setOff = () => {
    dispatch(setDarkModeOff());
  };

  return (
    <AppBar position="fixed" color="appbar">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <SvgIcon component={LogoIcon} inheritViewBox />

        <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="flex-end">
          {themeState.darkMode ? (
            <IconButton onClick={setOff}>
              <DarkModeIcon />
            </IconButton>
          ) : (
            <IconButton onClick={setOn}>
              <DarkModeIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
