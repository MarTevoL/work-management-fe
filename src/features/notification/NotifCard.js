import React from "react";
import { Box, Card, Chip, Stack, Typography, styled } from "@mui/material";
import { readNotification } from "./notificationSlice";
import { useDispatch } from "react-redux";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: 8,
  justifyContent: "space-between",
  padding: "16px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  fontSize: "14px",
  fontWeight: "500",
}));

function NotifCard({ notif }) {
  const { _id, title, body } = notif;

  const dispatch = useDispatch();

  const handleRead = (data) => {
    dispatch(readNotification(data));
  };

  return (
    <StyledCard elevation={5}>
      <Stack
        sx={{ display: "flex", alignItems: "start" }}
        direction={{ xs: "column", md: "row" }}
      >
        <Box ml="12px" sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              noWrap
              mr={1}
            >
              {"Title:"}
            </Typography>
            <Typography>{title}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }} mr={1}>
              {"Description:"}
            </Typography>

            <Heading>{body}</Heading>
          </Box>
        </Box>
      </Stack>
      <Box>
        <Chip label="Read" onDelete={() => handleRead({ _id })} />
      </Box>
    </StyledCard>
  );
}

export default NotifCard;
