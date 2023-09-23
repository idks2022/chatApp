import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/users/signin",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      sessionStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.log(error.message);
        setError(`Request Error: ${error.message}`);
      }
    }
  };
  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={Boolean(errors.email)}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={Boolean(errors.password)}
            helperText={errors.password && errors.password.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => {
          setError("");
        }}
      >
        <Alert
          onClose={() => {
            setError("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
export default SignIn;
