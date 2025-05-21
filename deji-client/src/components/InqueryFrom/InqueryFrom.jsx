
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
import Swal from "sweetalert2";

const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();



  const onSubmit = async (data) => {
    const detailsData = {
      name: data?.name,
      email: data?.email,
      shop: data?.shop,
      phone: data?.phone,
      company: data?.company,
      quantity: data?.quantity,

    };

    try {
     const details= await axios.post("http://localhost:5000/inquiries", detailsData);
       if (details.data.insertedId) {
        reset();
        Swal.fire({
          title: " Successfully",
          icon: "success",
          draggable: true,
        });
        // Navigate if needed
        // navigate("/addproduct");
      }
      reset(); // clear form
    } catch (err) {
       Swal.fire({
          title: `Please try again ${err}`,
          icon: "error",
          draggable: true,
        });
      
    }
  };

  return (
     <Paper elevation={4} className="max-w-xl mx-auto mt-8 p-6 rounded-xl">
      <Typography variant="h6" gutterBottom>
        📝 Submit Your Wholesale Inquiry
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
            label="Shop Name"
            fullWidth
            {...register("shop", { required: "Shop Name is required" })}
            error={!!errors.shop}
            helperText={errors.shop?.message}
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
            {...register("phone", { required: "Phone number is required" })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            label="Quantity Required"
            type="number"
            fullWidth
            {...register("quantity", {
              required: "Please enter quantity",
              min: { value: 10, message: "Minimum quantity is 10" },
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
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
      </form>
    </Paper>
  );
};

export default InquiryForm;
