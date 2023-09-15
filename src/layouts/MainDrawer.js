import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkIcon from "@mui/icons-material/Work";
import TaskIcon from "@mui/icons-material/Task";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProjectPage from "../pages/ProjectPage";
import TaskPage from "../pages/TaskPage";
import NotificationPage from "../pages/NotificationPage";
import useAuth from "../hooks/useAuth";
import HomePage from "../pages/HomePage";
import HomeIcon from "@mui/icons-material/Home";

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
    path: "",
    title: "Home",
    icon: <HomeIcon sx={{ fontSize: iconSize }} />,
    component: <HomePage />,
  },
  {
    path: "project",
    title: "Projects",
    icon: <WorkIcon sx={{ fontSize: iconSize }} />,
    component: <ProjectPage />,
  },

  {
    path: "task",
    title: "Tasks",
    icon: <TaskIcon sx={{ fontSize: iconSize }} />,
    component: <TaskPage />,
  },
  {
    path: "notification",
    title: "Notifications",
    icon: <NotificationsIcon sx={{ fontSize: iconSize }} />,
    component: <NotificationPage />,
  },
];
const STAFF_TABS = [
  {
    path: "",
    title: "Home",
    icon: <HomeIcon sx={{ fontSize: iconSize }} />,
    component: <HomePage />,
  },
  {
    path: "task",
    title: "Tasks",
    icon: <TaskIcon sx={{ fontSize: iconSize }} />,
    // component: <TaskPage />,
  },
  {
    path: "notification",
    title: "Notifications",
    icon: <NotificationsIcon sx={{ fontSize: iconSize }} />,
    // component: <NotificationPage />,
  },
];

const SETTING_TABS = [
  {
    path: "user/",
    title: "My Profile",
    icon: <AccountCircleIcon sx={{ fontSize: iconSize }} />,
    // component: <TaskPage />,
  },
  {
    path: "account",
    title: "Account Setting",
    icon: <ManageAccountsIcon sx={{ fontSize: iconSize }} />,
    // component: <NotificationPage />,
  },
  {
    path: "",
    title: "Logout",
    icon: <LogoutIcon sx={{ fontSize: iconSize }} />,
    // component: <NotificationPage />,
  },
];
function MainDrawer({ open, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  let tabMenu;
  if (user.role === "Manager") {
    tabMenu = [...MANAGER_TABS];
  } else {
    tabMenu = [...STAFF_TABS];
  }

  const handleChangeTab = (newValue) => {
    navigate(`/${newValue}`);
  };

  const handleLogout = async () => {
    try {
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          {tabMenu.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  handleChangeTab(item.path);
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
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {SETTING_TABS.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  if (item.title === "Logout") {
                    handleLogout();
                  } else if (item.title === "My Profile") {
                    handleChangeTab(`${item.path}${user._id}`);
                  } else {
                    handleChangeTab(item.path);
                  }
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

                {/*TODO: add move logout into App setting popup button */}
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {/*TODO: MainFooter properties responsive between open & closed */}
        {/* <MainFooter /> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </>
  );
}
export default MainDrawer;
