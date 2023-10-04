import { Box, Link, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../notification/notificationSlice";
import { Link as RouterLink } from "react-router-dom";

function HomeNotifBox() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { totalNotifs } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getUserNotifications({ page: 1 }));
  }, [dispatch, user]);
  return (
    <Box>
      <Link underline="none" component={RouterLink} to={`/notification`}>
        <Card>
          <CardContent>
            {totalNotifs ? (
              <Typography>{`You have ${totalNotifs} notifications`}</Typography>
            ) : (
              <Typography>{`You don't have any notification`}</Typography>
            )}
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}

export default HomeNotifBox;
