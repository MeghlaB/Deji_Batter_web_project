import React, { useContext, useState } from "react";
import {
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
import Swal from "sweetalert2";

import { AuthContext } from "../../Provider/Authprovider";

function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    setLoading(true);

    try {
      // Create user
      const result = await createUser(data.email, data.password);
      const user = result.user;
      console.log(user);

      // Update profile
      await updateUserProfile(data.name, data.photo);

      // Save to database
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photo,
        role: "user",
        status: "active",
      };

      const res = await axios.post(
        "https://deji-baterryserver-1.onrender.com/users",
        userInfo
      );

      if (res.data.insertedId || res.data.success) {
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        throw new Error("User registration failed on server.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
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
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Photo URL"
            fullWidth
            margin="normal"
            {...register("photo", { required: "Photo URL is required" })}
            error={!!errors.photo}
            helperText={errors.photo?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Confirm your password",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#11B808",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#66A049",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{" "}
          <Link to="/auth/login" style={{ color: "#11B808" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
