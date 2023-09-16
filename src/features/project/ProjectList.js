import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectsWithPagination } from "./projectSlice";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import ProjectCard from "./ProjectCard";

function ProjectList() {
  const [page, setPage] = useState(1);

  const { currentPageProjects, projectsById, totalProjects, totalPages } =
    useSelector((state) => state.project);

  const dispatch = useDispatch();

  const projects = currentPageProjects.map((id) => projectsById[id]);

  useEffect(() => {
    dispatch(getAllProjectsWithPagination({ page }));
  }, [dispatch, page]);

  return (
    <>
      <Box>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Project List
          </Typography>
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
      </Box>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </>
  );
}

export default ProjectList;
