import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import NotifList from "./NotifList";

function Notification() {
  return (
    <Container>
      <Stack>
        <Stack direction="column" alignItems="center">
          <NotifList />
        </Stack>
      </Stack>
    </Container>
  );
}

export default Notification;
