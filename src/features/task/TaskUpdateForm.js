import { Box, Card, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createTask } from "./taskSlice";
import { getProjects } from "../project/projectSlice";
import { getAllStaffs, getAllUsers } from "../user/userSlice";

const yupSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  priority: "",
  assignee: "",
  dueDate: "",
};
function TaskUpdateForm({ taskId }) {
  const { currentPageUser, userById } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const users = currentPageUser.map((id) => userById[id]);

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

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Update Task
        </Typography>
        <FSelect
          name="priority"
          label="select priority"
          InputLabelProps={{ shrink: true }}
        >
          <option>high</option>
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

export default TaskUpdateForm;
