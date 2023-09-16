import { Container, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import useAuth from "../../hooks/useAuth";

function Task() {
  const { user } = useAuth();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Stack>
            <TaskList />
          </Stack>
        </Grid>
        {user.role === "Manager" && (
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 340,
              }}
            >
              <TaskForm />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Task;
