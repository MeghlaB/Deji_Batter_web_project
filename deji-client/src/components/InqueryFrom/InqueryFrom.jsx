import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [status, setStatus] = React.useState(null);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await axios.post("http://localhost:5000/api/inquiries", data);
      setStatus({ type: "success", msg: "✅ Your inquiry was submitted successfully!" });
      reset();
    } catch (err) {
      setStatus({
        type: "error",
        msg: "❌ Failed to submit inquiry. Please try again later.",err
      });
    }
  };

  return (
    <Paper elevation={4} className="max-w-xl mx-auto mt-8 p-6 rounded-xl">
      <Typography variant="h6" gutterBottom>
        Submit Your Wholesale Inquiry
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Full Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            {...register("phone")}
          />
          <TextField
            label="Company Name"
            fullWidth
            {...register("company")}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            minRows={4}
            {...register("message")}
          />
        </div>

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Submit Inquiry"}
          </Button>
        </Box>

        {status && (
          <Box mt={3}>
            <Alert severity={status.type}>{status.msg}</Alert>
          </Box>
        )}
      </form>
    </Paper>
  );
};

export default InquiryForm;
