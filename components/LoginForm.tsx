"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { loginUser } from "@/apis/userApi";
import { setLoading, setError } from "@/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { UserState } from "@/store/reducers";

const LoginForm: React.FC = () => {
  const { loading } = useSelector(({ user }: { user: UserState }) => user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await loginUser(email, password);
      localStorage.setItem("token", user.token);
      localStorage.setItem("uid", user.id);
      router.push("/");

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : "Login Failed")
      );
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
      p={2}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            loading={loading}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
