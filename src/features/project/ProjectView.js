import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ProjectMemberList from "../projectMember/ProjectMemberList";
import ProjectTaskList from "./ProjectTaskList";
import { useParams } from "react-router-dom";
import { getProjects } from "./projectSlice";

function ProjectView() {
  const { projectId } = useParams();
  const { projectsById, isLoading } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  const project = projectsById[projectId];

  useEffect(() => {
    dispatch(getProjects({ page: 1 }));
  }, [dispatch]);
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
            <Box ml="12px">
              <Box sx={{ display: "flex", alignItems: "last baseline" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                  mr={1}
                >
                  {"Title:"}
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.darker" }}>
                  {project?.title}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  mr={1}
                >
                  {"Description:"}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ color: "primary.dark" }}
                  noWrap
                >
                  {project?.description}
                </Typography>
              </Box>
            </Box>
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
