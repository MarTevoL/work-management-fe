import { Container, Stack, Typography } from "@mui/material";
import React from "react";

function Notification() {
  return (
    <Container>
      <Stack>
        <Stack direction="column" alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            notification
          </Typography>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            notification
          </Typography>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            notification
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Notification;
