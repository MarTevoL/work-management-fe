import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, FSelect } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { updateTaskDetail } from "./taskSlice";
import { getAllUsers } from "../user/userSlice";

const defaultValues = {
  assignee: "",
  priority: "",
  dueDate: "",
};
function TaskUpdateForm({ taskId }) {
  const { isLoading, tasksById } = useSelector((state) => state.task);

  const { currentPageUser, userById } = useSelector((state) => state.user);
  const users = currentPageUser.map((id) => userById[id]);

  const [dayValue, setDayValue] = useState(dayjs().add(2, "day"));

  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues,
  });

  const task = tasksById[taskId];

  const priority = ["Urgent", "High", "Normal", "Low"];

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateTaskDetail({ ...data, dueDate: dayValue, taskId: taskId }));
  };

  useEffect(() => {
    dispatch(getAllUsers());
    if (currentPageUser.length > 0) {
      reset({
        ...defaultValues,
        assignee: currentPageUser[0],
        priority: "Urgent",
      });
    }
  }, [dispatch, reset, currentPageUser]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Update Task
        </Typography>
        {!task?.assignee ? (
          <FSelect
            name="assignee"
            label="select a staff"
            InputLabelProps={{ shrink: true }}
          >
            {users.map((user) => (
              <option key={user._id} value={`${user._id}`}>
                {user.name}
              </option>
            ))}
          </FSelect>
        ) : (
          <></>
        )}
        <FSelect
          name="priority"
          label="select priority"
          InputLabelProps={{ shrink: true }}
        >
          {priority.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </FSelect>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="dueDate"
            value={dayValue}
            onChange={(newValue) => setDayValue(newValue)}
          />
        </LocalizationProvider>

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
            Update
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default TaskUpdateForm;
