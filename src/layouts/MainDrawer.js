import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import WorkIcon from "@mui/icons-material/Work";
import TaskIcon from "@mui/icons-material/Task";
import NotificationsIcon from "@mui/icons-material/Notifications";

const drawerWidth = 240;
const iconSize = 25;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MANAGER_TABS = [
  {
    value: "projects",
    icon: <WorkIcon sx={{ fontSize: iconSize }} />,
    // component: <ProjectPage />,
  },

  {
    value: "Tasks",
    icon: <TaskIcon sx={{ fontSize: iconSize }} />,
    // component: <TaskPage />,
  },
  {
    value: "Notifications",
    icon: <NotificationsIcon sx={{ fontSize: iconSize }} />,
    // component: <NotificationPage />,
  },
];
const STAFF_TABS = [
  {
    value: "Tasks",
    icon: <TaskIcon sx={{ fontSize: iconSize }} />,
    // component: <TaskPage />,
  },
  {
    value: "Notifications",
    icon: <NotificationsIcon sx={{ fontSize: iconSize }} />,
    // component: <NotificationPage />,
  },
];

function MainDrawer({ user, open, children }) {
  let tabMenu;
  if (user.role === "Manager") {
    tabMenu = [...MANAGER_TABS];
  } else {
    tabMenu = [...STAFF_TABS];
  }
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          {/*TODO: change to 2 array, managerFunction & staffFunction then use user.role to check*/}
          {tabMenu.map((item, index) => (
            <ListItem key={item.value} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.value}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {/*TODO: change to array user setting*/}
          {["My Profile", "Account Setting", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {/*TODO: MainFooter properties responsive between open & closed */}
        <MainFooter />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </>
  );
}
export default MainDrawer;
