// Login.jsx
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/Authprovider";

function Login() {
  const { signInUser, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password",error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSign = async () => {
    try {
      const result = await GoogleLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
        status: "active",
      };

      await axios.post("http://localhost:5000/users", userInfo);

      toast.success("Logged in with Google");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed",error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 12, p: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{" "}
          <Link to="/auth/register" style={{ color: "#1976d2" }}>
            Register
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Box display="flex" justifyContent="center">
          <IconButton onClick={handleGoogleSign}>
            <GoogleIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </Paper>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </Container>
  );
}

export default Login;
