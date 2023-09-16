import { Container, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

function Project() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Stack>
            <ProjectList />
          </Stack>
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
            <ProjectForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Project;
