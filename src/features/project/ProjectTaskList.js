import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { getProjectTasks } from "../task/taskSlice";
import TaskCard from "../task/TaskCard";

function ProjectTaskList({ projectId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { currentPageTasks, tasksById, totalTasks, totalPages, isLoading } =
    useSelector((state) => state.task);

  const tasks = currentPageTasks.map((id) => tasksById[id]);

  useEffect(() => {
    dispatch(getProjectTasks({ projectId, page }));
  }, [dispatch, page, projectId]);

  return (
    <Container>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
              {/* <SearchInput handleSubmit={handleSubmit} /> */}
              <Typography variant="h8" sx={{ flexGrow: 1 }}>
                Project's Task List
              </Typography>
              <Typography
                variant="subtitle"
                sx={{ color: "text.secondary", ml: 1 }}
              >
                {totalTasks > 1
                  ? `${totalTasks} tasks found`
                  : totalTasks === 1
                  ? `${totalTasks} task found`
                  : "No task found"}
              </Typography>

              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, page) => setPage(page)}
              />
            </Stack>
          </Stack>

          <Grid container spacing={3} my={1}>
            {tasks.map((task) => (
              <Grid key={task._id} item xs={12} md={4}>
                <TaskCard task={task} />
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </Container>
  );
}

export default ProjectTaskList;
