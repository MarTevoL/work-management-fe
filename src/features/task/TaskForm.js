import { Box, Card, MenuItem, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createTask } from "./taskSlice";
import { getAllProjects } from "../project/projectSlice";

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
{
  /**TODO: create add with priority status assignee dueDate */
}
function TaskForm() {
  const { isLoading } = useSelector((state) => state.task);
  const { projectsById, currentPageProjects } = useSelector(
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
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(createTask(data)).then(() => reset());
  };
  {
    /**TODO: select project userEffect get project*/
  }

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField name="title" rows={4} placeholder="Task title" />
          <FTextField name="description" label="Task description" />
          <FSelect name="projectId" label="project">
            console.log(projectsList);
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
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Create
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default TaskForm;
