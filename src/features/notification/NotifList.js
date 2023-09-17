import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { getUserNotifications } from "./notificationSlice";

function NotifList() {
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { currentPageNotifs, notifById, totalNotifs, totalPages } = useSelector(
    (state) => state.notification
  );

  const notifs = currentPageNotifs.map((id) => notifById[id]);

  useEffect(() => {
    dispatch(getUserNotifications({ page }));
  }, [dispatch, page]);
  return (
    <Container>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notification List
          </Typography>
          <Typography
            variant="subtitle"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            {totalNotifs > 1
              ? `${totalNotifs} notifications found`
              : totalNotifs === 1
              ? `${totalNotifs} notification found`
              : "No notification found"}
          </Typography>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </Stack>

      <Grid container spacing={3} my={1}>
        {notifs.map((noti) => (
          <>
            <Typography key={noti._id}>{noti.title}</Typography>
          </>
        ))}
      </Grid>
    </Container>
  );
}

export default NotifList;
