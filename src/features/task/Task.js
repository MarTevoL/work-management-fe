import { Box, Grid } from "@mui/material";
import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Task() {
  return (
    <Grid container spacing={3}>
      <Grid>
        {/**TODO: create float button for Create Task, when click appear task form */}
        <TaskForm />
        <Box mt={10} />
        <TaskList />
      </Grid>
    </Grid>
  );
}

export default Task;
