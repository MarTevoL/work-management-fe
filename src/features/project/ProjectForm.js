import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, MenuItem, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FSelect, FTextField } from "../../components/form";
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
  const { isLoading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

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
    dispatch(createProject(data)).then(() => reset());
  };
  // const menu = [
  //   <MenuItem value="250">$250</MenuItem>,
  //   <MenuItem value="500">$500</MenuItem>,
  //   <MenuItem value="$1000">$1000</MenuItem>,
  // ];
  {
    /**TODO: add status to project */
  }
  // const statusList = [
  //   { value: "Open", title: "Open" },
  //   { value: "Review", title: "Review" },
  //   { value: "Development", title: "Development" },
  //   { value: "Closed", title: "Closed" },
  // ];

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h8" sx={{ mb: 3 }}>
            New Project
          </Typography>

          <FTextField name="title" rows={4} placeholder="Project title" />
          <FTextField name="description" label="Project description" />
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

export default ProjectForm;
