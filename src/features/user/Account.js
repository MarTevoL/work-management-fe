import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import ChangePass from "./ChangePass";
import InviteUser from "./InviteUser";

function Account() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 340,
            }}
          >
            <ChangePass />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 340,
            }}
          >
            <InviteUser />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
