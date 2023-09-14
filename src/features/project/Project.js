import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

function Project() {
  return (
    // <Grid container spacing={3}>
    //   <Grid item xs={12} md={6} xl={4}>
    //     {/**TODO: create float button for Create Task, when click appear task form */}
    //     <ProjectForm />
    //   </Grid>

    //   <Grid item>
    //     <ProjectList />
    //   </Grid>
    // </Grid>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
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
        <Grid item xs={12} md={8} lg={9}>
          <Stack>
            <ProjectList />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Project;
