import { Container, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import ChangePass from "./ChangePass";
import useAuth from "../../hooks/useAuth";

function Account() {
  const { user } = useAuth();
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
        {user.role === "Manager" && (
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 340,
              }}
            >
              send invitation
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Account;
