import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createTask } from "./taskSlice";
import { getProjects } from "../project/projectSlice";

const yupSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  title: "",
  description: "",
  projectId: "",
  priority: "",
  assignee: "",
  dueDate: "",
};
function TaskForm() {
  const { isLoading } = useSelector((state) => state.task);

  const { currentPageProjects, projectsById } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();

  const projects = currentPageProjects.map((id) => projectsById[id]);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(createTask(data)).then(() => reset());
  };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          New Task
        </Typography>
        <FTextField name="title" rows={4} label="title" />
        <FTextField name="description" label="description" />
        <FSelect
          name="projectId"
          label="select a project"
          InputLabelProps={{ shrink: true }}
        >
          {projects.map((proj) => (
            <option key={proj._id} value={`${proj._id}`}>
              {proj.title}
            </option>
          ))}
        </FSelect>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <LoadingButton
            type="submit"
            variant="outlined"
            size="small"
            loading={isSubmitting || isLoading}
          >
            Create
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default TaskForm;
