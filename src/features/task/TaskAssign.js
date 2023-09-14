import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, FSelect } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateTaskAssignee } from "./taskSlice";
import { getAllUsers } from "../user/userSlice";

const yupSchema = Yup.object().shape({
  assigneeId: Yup.string().required("assignee is required"),
});

function TaskAssign({ taskId }) {
  const { currentPageUser, userById } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const users = currentPageUser.map((id) => userById[id]);
  console.log(taskId);
  const defaultValues = {
    taskId,
  };
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(updateTaskAssignee({ ...data, taskId: taskId }));
    console.log("data", data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FSelect
          name="assigneeId"
          label="select a staff"
          InputLabelProps={{ shrink: true }}
        >
          {users.map((user) => (
            <option key={user._id} value={`${user._id}`}>
              {user.name}
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

export default TaskAssign;
