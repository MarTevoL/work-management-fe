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
import { fDate } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getTasks } from "./taskSlice";

function TaskView() {
  const { taskId } = useParams();
  const { user } = useAuth();
  const { tasksById, isLoading } = useSelector((state) => state.task);
  const { userById } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks({ page: 1 }));
  }, [dispatch]);

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
            <Typography>Task Detail</Typography>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Stack direction={{ xs: "column", md: "row" }} alignItems="start">
                <Box sx={{ flexGrow: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    Title
                  </Typography>
                  <Typography variant="h5">{task?.title}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    Priority
                  </Typography>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {task?.priority ? task.priority : "no priority"}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    Assignee
                  </Typography>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {task?.assignee
                      ? userById[task.assignee]?.name
                      : "no assignee"}
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
                    {task?.dueDate ? fDate(task.dueDate) : "no dueDate"}
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
                    {task?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          {user.role === "Manager" && (
            <>
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
