import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { getTasks } from "./taskSlice";
import useAuth from "../../hooks/useAuth";
import TaskCard from "./TaskCard";

function TaskList() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const { currentPageTasks, tasksById, totalTasks, totalPages } = useSelector(
    (state) => state.task
  );

  const dispatch = useDispatch();

  const tasks = currentPageTasks.map((id) => tasksById[id]);

  useEffect(() => {
    dispatch(getTasks({ page }));
  }, [dispatch, page]);

  return (
    <Container>
      <Typography variant="h8" sx={{ mb: 3 }}>
        Task List
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
    </Container>
  );
}

export default TaskList;
