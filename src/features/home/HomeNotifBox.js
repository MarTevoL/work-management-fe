import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../notification/notificationSlice";

function HomeNotifBox() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { totalNotifs } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getUserNotifications({ page: 1 }));
  }, [dispatch, user]);
  return (
    <Box>
      <Card>
        <CardContent>
          {totalNotifs ? (
            <Typography>{`You have ${totalNotifs} notifications`}</Typography>
          ) : (
            <Typography>{`You don't have any notification`}</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default HomeNotifBox;
