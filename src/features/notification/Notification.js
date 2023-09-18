import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import NotifList from "./NotifList";

function Notification() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Stack>
            <NotifList />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Notification;
