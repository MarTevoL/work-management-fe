import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { sendInvitation } from "./userSlice";

const defaultValues = {
  email: "",
};

const yupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function InviteUser() {
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
    console.log(data);
    dispatch(sendInvitation(data));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Invite User
        </Typography>

        <FTextField name="email" label="Email address" />
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
            // loading={isSubmitting || isLoading}
            loading={isSubmitting}
          >
            Send
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default InviteUser;
