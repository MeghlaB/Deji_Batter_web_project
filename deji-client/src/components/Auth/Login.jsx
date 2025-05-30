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
      console.log(user);
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

  const handleGoogleSign = async () => {
    GoogleLogin()
      .then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          photo: res.user?.photoURL,
        };
        axios.post("http://localhost:5000/users", userInfo).then((res) => {
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
            sx={{
              mt: 2,
              borderRadius: "12px",
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#f8961e",
              color: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: "#d67a19",
                transform: "scale(1.05)",
                boxShadow: "0 6px 12px rgba(214, 122, 25, 0.5)",
              },
              "&:disabled": {
                backgroundColor: "#fbbf24",
                color: "#fff",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{" "}
          <Link to="/auth/register" style={{ color: "#f8961e" }}>
            Register
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Box display="flex" justifyContent="center">
          <IconButton
            onClick={handleGoogleSign}
            sx={{
              backgroundColor: "#f8961e",
              color: "#fff",
              width: 56,
              height: 56,
              "&:hover": {
                backgroundColor: "#d67a19",
                transform: "scale(1.1)",
                boxShadow: "0 6px 12px rgba(214, 122, 25, 0.5)",
              },
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            aria-label="Sign in with Google"
          >
            <GoogleIcon fontSize="large" />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login