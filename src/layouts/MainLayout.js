import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainDrawer from "./MainDrawer";

// const MANAGER_TABS = [
//   {
//     value: "projects",
//     icon: <WorkIcon sx={{ fontSize: 20 }} />,
//     component: <ProjectPage />,
//   },

//   {
//     value: "Tasks",
//     icon: <TaskIcon sx={{ fontSize: 20 }} />,
//     component: <TaskPage />,
//   },
//   {
//     value: "Notifications",
//     icon: <NotificationsIcon sx={{ fontSize: 20 }} />,
//     component: <NotificationPage />,
//   },
// ];
// const STAFF_TABS = [];

export default function Sidenav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MainHeader
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <MainDrawer open={open} children={<Outlet />} />
    </Box>
  );
}
