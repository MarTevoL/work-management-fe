import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getUserNotifications } from "../features/notification/notificationSlice";

function NotificationIcon({ iconSize }) {
  const dispatch = useDispatch();
  const { totalNotifs } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getUserNotifications({ page: 1 }));
  }, [dispatch]);
  return (
    <Badge badgeContent={totalNotifs} color="primary">
      <NotificationsIcon sx={{ fontSize: iconSize }} />
    </Badge>
  );
}

export default NotificationIcon;
