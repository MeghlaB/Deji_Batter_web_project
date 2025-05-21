import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGEHOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProductForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        const productData = {
          id: data.productId,
          name: data.name,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          brand: data.brand,
          specs: {
            capacity: data.capacity,
            voltage: data.voltage,
            warranty: data.warranty,
          },
          imageURL: imageUrl,
        };
console.log(productData)
        const saveRes = await axios.post("http://localhost:5000/add-products", productData);
          if (saveRes.data.insertedId) {
          reset();
          Swal.fire({
            title: "Products Added Successfully",
            icon: "success",
            draggable: true,
          });
         
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("❌ Failed to add product", "", "error");
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(to right, #f0f4ff, #e0f7ff)",
      }}
    >
      <Typography variant="h4" textAlign="center" color="primary" fontWeight="bold" mb={4}>
        🛒 Add New Battery Product
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product ID"
              fullWidth
              variant="outlined"
              {...register("productId")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              fullWidth
              variant="outlined"
              {...register("name")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Price (SGD)"
              fullWidth
              variant="outlined"
              {...register("price")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Stock Quantity"
              fullWidth
              variant="outlined"
              {...register("stock")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Brand</InputLabel>
            <Select
              defaultValue=""
              fullWidth
              {...register("brand")}
              displayEmpty
              required
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Select Brand
              </MenuItem>
              <MenuItem value="iPhone">iPhone</MenuItem>
              <MenuItem value="Samsung">Samsung</MenuItem>
              <MenuItem value="Huawei">Huawei</MenuItem>
              <MenuItem value="Xiaomi">Xiaomi</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Upload Product Image</InputLabel>
            <input type="file" variant="outlined"  {...register("image")} required />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Capacity (mAh)"
              fullWidth
              variant="outlined"
              {...register("capacity")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Voltage (V)"
              fullWidth
              variant="outlined"
              {...register("voltage")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Warranty (Months)"
              fullWidth
              variant="outlined"
              {...register("warranty")}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              ➕ Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddProductForm;
