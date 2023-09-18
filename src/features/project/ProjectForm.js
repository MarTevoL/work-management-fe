import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { createProject } from "./projectSlice";

const yupSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  title: "",
  description: "",
};

function ProjectForm() {
  const { isLoading, error } = useSelector((state) => state.project);
  const dispatch = useDispatch();

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
    dispatch(createProject(data)).then(() => reset());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          New Project
        </Typography>

        <FTextField name="title" label="title" />
        <FTextField name="description" label="description" />
        {/* <FSelect name="chose" children={menu} /> */}
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

export default ProjectForm;
