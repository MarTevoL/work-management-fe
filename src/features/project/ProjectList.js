import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./projectSlice";
import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import ProjectCard from "./ProjectCard";

function ProjectList() {
  const [page, setPage] = useState(1);

  const {
    currentPageProjects,
    projectsById,
    totalProjects,
    totalPages,
    isLoading,
  } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const projects = currentPageProjects.map((id) => projectsById[id]);

  useEffect(() => {
    dispatch(getProjects({ page }));
  }, [dispatch, page]);

  return (
    <Container>
      <Typography variant="h8" sx={{ mb: 3 }}>
        Project List
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            {/* <SearchInput handleSubmit={handleSubmit} /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalProjects > 1
                ? `${totalProjects} projects found`
                : totalProjects === 1
                ? `${totalProjects} project found`
                : "No project found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {projects.map((project) => (
            <Grid key={project._id} item xs={12} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default ProjectList;
