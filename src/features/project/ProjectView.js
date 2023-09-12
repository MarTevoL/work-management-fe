import React from "react";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";

function ProjectView({ projectId }) {
  const { projectsById } = useSelector((state) => state.project);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} xl={4}>
        <ProjectCard project={projectsById[projectId]} />
      </Grid>

      <Grid item>
        <Typography>Assginee</Typography>
      </Grid>
    </Grid>
  );
}

export default ProjectView;
