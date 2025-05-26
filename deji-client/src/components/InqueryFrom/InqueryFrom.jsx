import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      orderID: data?.orderID,
      products: data?.products.split(",").map((p) => p.trim()),
      total: parseFloat(data?.total),
      status: "Processing",
      customerEmail: data?.customerEmail,
    };

    try {
      const res = await axios.post("https://deji-server.vercel.app/inquiries", formattedData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Order Submitted Successfully!",
          text: "We'll get in touch with you shortly.",
          icon: "success",
        });
        reset();
      }
    } catch (err) {
      Swal.fire({
        title: "Submission Failed",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <Box className="max-w-2xl mx-auto mt-12 px-4">
      <Paper elevation={4} className="rounded-2xl p-6 shadow-md">
        <Typography variant="h5" align="center" gutterBottom>
          Submit a Wholesale Order
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          className="mb-4"
        >
          Fill out the form below to send us your order inquiry. Our team will reach out to confirm the details.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box className="grid grid-cols-1 gap-4">
            <TextField
              label="Order ID"
              fullWidth
              {...register("orderID", { required: "Order ID is required" })}
              error={!!errors.orderID}
              helperText={errors.orderID?.message}
            />
            <TextField
              label="Product IDs (comma separated)"
              fullWidth
              {...register("products", { required: "Product IDs are required" })}
              error={!!errors.products}
              helperText={errors.products?.message}
            />
            <TextField
              label="Total Amount (SGD)"
              type="number"
              fullWidth
              {...register("total", { required: "Total amount is required" })}
              error={!!errors.total}
              helperText={errors.total?.message}
            />
            <TextField
              label="Customer Email"
              type="email"
              fullWidth
              {...register("customerEmail", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.customerEmail}
              helperText={errors.customerEmail?.message}
            />
          </Box>

          <Box mt={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: "12px",
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#f97316",     
                "&:hover": {
                  backgroundColor: "#ea580c",  
                },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit Order"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default InquiryForm;
