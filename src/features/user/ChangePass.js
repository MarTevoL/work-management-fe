import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultValues = {
  oldPass: "",
  password: "",
  passwordConfirm: "",
};

const yupSchema = Yup.object().shape({
  oldPass: Yup.string().required("old password is required"),
  password: Yup.string().required("new password is required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
function ChangePass() {
  const { isLoading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    // dispatch(changeUserPassword(data));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Change Password
        </Typography>
        <FTextField name="oldPass" rows={4} label="Old Password" />
        <FTextField name="password" label="Password" />
        <FTextField name="passwordConfirm" label="Password Confirmation" />

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

export default ChangePass;
