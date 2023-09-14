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
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { currentPageTasks, tasksById, totalTasks, totalPages } = useSelector(
    (state) => state.task
  );

  const tasks = currentPageTasks.map((id) => tasksById[id]);

  useEffect(() => {
    dispatch(getTasks({ page }));
  }, [dispatch, page]);

  return (
    <Container>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task List
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
          <Grid item xs={12} md={4}>
            <TaskCard task={task} key={task._id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TaskList;
