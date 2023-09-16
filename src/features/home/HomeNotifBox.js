import { Container, Stack, Typography } from "@mui/material";
import React from "react";

function HomeNotifBox() {
  return (
    <Container>
      <Stack>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notification List
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default HomeNotifBox;
