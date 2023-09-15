import { Container, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";

function Home() {
  const { user } = useAuth();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {user.role === "Manager" && (
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              projects
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            tasks
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            notifications
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
