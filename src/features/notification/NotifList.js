import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Chip, Pagination, Stack, Typography } from "@mui/material";
import {
  getUserNotifications,
  readAllNotifications,
} from "./notificationSlice";
import NotifCard from "./NotifCard";

function NotifList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { currentPageNotifs, notifById, totalNotifs, totalPages } = useSelector(
    (state) => state.notification
  );

  const notifs = currentPageNotifs.map((id) => notifById[id]);

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  useEffect(() => {
    dispatch(getUserNotifications({ page }));
  }, [dispatch, page]);
  return (
    <>
      <Box marginBottom={2}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <Typography
            variant="subtitle"
            sx={{ color: "text.secondary", ml: 1 }}
            mr={2}
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
          <Chip label="read all" onDelete={handleReadAll} />
        </Stack>
      </Box>

      {notifs.map((noti) => (
        <NotifCard key={noti._id} notif={noti} />
      ))}
    </>
  );
}

export default NotifList;
