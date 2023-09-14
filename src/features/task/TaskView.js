import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../user/userSlice";
import TaskUpdateForm from "./TaskUpdateForm";
import TaskAssign from "./TaskAssign";
import TaskAssigneeCard from "./TaskAssigneeCard";

function TaskView({ taskId }) {
  const { tasksById, isLoading } = useSelector((state) => state.task);
  const { userById } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const task = tasksById[taskId];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              <TaskCard task={task} />
              <Typography>Assignee</Typography>
              {task.assignee ? (
                <TaskAssigneeCard
                  name={userById[task.assignee].name}
                  email={userById[task.assignee].email}
                  role={userById[task.assignee].role}
                />
              ) : (
                <Box>
                  <Typography>No assignee for this task</Typography>
                  <TaskAssign taskId={taskId} />
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Stack>
              <TaskUpdateForm taskId={taskId} />
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default TaskView;
