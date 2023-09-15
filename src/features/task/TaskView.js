import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../user/userSlice";
import TaskUpdateForm from "./TaskUpdateForm";
import TaskAssign from "./TaskAssign";
import TaskAssigneeCard from "./TaskAssigneeCard";
import { fDate } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";

function TaskView({ taskId }) {
  const { user } = useAuth();
  const { tasksById, isLoading } = useSelector((state) => state.task);
  const { userById } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role === "Manager") {
      dispatch(getAllUsers());
    }
  }, [dispatch, user]);

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
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
              >
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  {task.title}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    Priority
                  </Typography>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {task.priority ? task.priority : "no priority"}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    Due Date
                  </Typography>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {task.dueDate ? fDate(task.dueDate) : "no dueDate"}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Stack>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Description</Typography>
              </Box>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {task.description}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          {user.role === "Manager" && (
            <>
              <Grid item xs={12} md={4} lg={3}>
                {task.assignee ? (
                  <TaskAssigneeCard
                    name={userById[task.assignee]?.name}
                    email={userById[task.assignee]?.email}
                    role={userById[task.assignee]?.role}
                  />
                ) : (
                  <Box>
                    <Typography>No assignee for this task</Typography>
                    <TaskAssign taskId={taskId} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Stack>
                  <TaskUpdateForm taskId={taskId} />
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default TaskView;
