import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";


const CustomButton = styled(Button)({
  backgroundColor: "#f8961e",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "none",
  padding: "12px 0",
  "&:hover": {
    backgroundColor: "#e07b00",
  },
});

const imageHostingKey = import.meta.env.VITE_IMAGEHOSTING;
const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageData = new FormData();
      imageData.append("image", data.image[0]);

      const imgUploadRes = await axios.post(imageHostingURL, imageData);
      const imageUrl = imgUploadRes.data.data.display_url;

      const productData = {
        model: data.model,
        batteryType: data.batteryType,
        capacity: data.capacity,
        voltage: data.voltage,
        limitedVoltage: data.limitedVoltage,
        chargingTime: data.chargingTime,
        standbyTime: data.standbyTime,
        cycleTime: data.cycleTime,
        safety: data.safety,
        brand: data.brand,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        description: data.description,
        title: data.title,
        imageURL: imageUrl,
      };

      const res = await axios.post("https://deji-server.vercel.app/add-products", productData);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Product Added Successfully",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
          color="#f8961e"
        >
          Add New Battery Product
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="py-2">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                fullWidth
                {...register("title", { required: true })}
                error={!!errors.title}
              />
            </Grid>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Model"
                fullWidth
                {...register("model", { required: true })}
                error={!!errors.model}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Battery Type"
                fullWidth
                {...register("batteryType", { required: true })}
                error={!!errors.batteryType}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Capacity (mAh)"
                fullWidth
                {...register("capacity", { required: true })}
                error={!!errors.capacity}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Voltage (V)"
                fullWidth
                {...register("voltage", { required: true })}
                error={!!errors.voltage}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Limited Voltage (V)"
                fullWidth
                {...register("limitedVoltage", { required: true })}
                error={!!errors.limitedVoltage}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Charging Time"
                fullWidth
                {...register("chargingTime", { required: true })}
                error={!!errors.chargingTime}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Standby Time"
                fullWidth
                {...register("standbyTime", { required: true })}
                error={!!errors.standbyTime}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Cycle Time"
                fullWidth
                {...register("cycleTime", { required: true })}
                error={!!errors.cycleTime}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Safety Info"
                fullWidth
                {...register("safety", { required: true })}
                error={!!errors.safety}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                fullWidth
                {...register("brand", { required: true })}
                error={!!errors.brand}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Price (৳)"
                type="number"
                fullWidth
                {...register("price", { required: true })}
                error={!!errors.price}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Stock"
                type="number"
                fullWidth
                {...register("stock", { required: true })}
                error={!!errors.stock}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Upload Product Image
              </Typography>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                style={{ marginTop: "8px" }}
              />
            </Grid>
          </Grid>

          <div className="mt-8 space-y-2.5">
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                {...register("description", { required: true })}
                error={!!errors.description}
              />
            </Grid>

          
            <Grid item xs={12}>
              <CustomButton type="submit" fullWidth>
                Submit Product
              </CustomButton>
            </Grid>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProductForm;
