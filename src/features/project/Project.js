import { Box, Grid } from "@mui/material";
import React from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

function Project() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} xl={4}>
        {/**TODO: create float button for Create Task, when click appear task form */}
        <ProjectForm />
      </Grid>

      <Grid item>
        <ProjectList />
      </Grid>
    </Grid>
  );
}

export default Project;
