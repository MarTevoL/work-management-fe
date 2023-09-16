import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import HomeProjectBox from "./HomeProjectBox";
import HomeTaskBox from "./HomeTaskBox";
import HomeNotifBox from "./HomeNotifBox";

function Home() {
  const { user } = useAuth();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                {`Welcome ${user.name}`}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
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
              <HomeProjectBox />
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
            <HomeTaskBox />
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
            <HomeNotifBox />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
