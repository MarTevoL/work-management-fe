import React from "react";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { Container, Grid, Paper } from "@mui/material";
import ProjectMemberList from "../projectMember/ProjectMemberList";
import ProjectTaskList from "./ProjectTaskList";

function ProjectView({ projectId }) {
  const { projectsById } = useSelector((state) => state.project);

  return (
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
            <ProjectCard project={projectsById[projectId]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2 }}>
            <ProjectMemberList projectId={projectId} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <ProjectTaskList projectId={projectId} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectView;
