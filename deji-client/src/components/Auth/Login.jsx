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
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Authprovider";

function Login() {
  const { signIn, GoogleLogin } = useContext(AuthContext);
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
      const result = await signIn(data.email, data.password);
      const user = result.user;
      console.log(user)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Logged In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSign = async() => {
    GoogleLogin()
      .then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          photo: res.user?.photoURL,
        };
       axios.post("https://deji-server.vercel.app/users", userInfo)
       .then((res) => {
          if (res.data.insertedId || res.data.success) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Account Created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message || "Something went wrong",
        });
      });
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
    </Container>
  );
}

export default Login;
