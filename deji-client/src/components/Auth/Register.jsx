// Register.jsx
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/Authprovider";

function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateUserProfile(data.name, data.photo);

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photo,
        role: "user",
        status: "active",
      };

      await axios.post("http://localhost:5000/users", userInfo);

      toast.success("Registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Photo URL */}
          <TextField
            label="Photo URL"
            fullWidth
            margin="normal"
            {...register("photo", { required: "Photo URL is required" })}
            error={!!errors.photo}
            helperText={errors.photo?.message}
          />

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required", minLength: 6 })}
            error={!!errors.password}
            helperText={
              errors.password?.type === "minLength"
                ? "Password must be at least 6 characters"
                : errors.password?.message
            }
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword", { required: "Confirm your password" })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{" "}
          <Link to="/account/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </Paper>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </Container>
  );
}

export default Register;
