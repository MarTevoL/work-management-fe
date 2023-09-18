import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as LogoIcon } from "../workin-logo.svg";

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
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
