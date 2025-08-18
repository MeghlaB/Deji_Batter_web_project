import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
  styled,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGEHOSTING;
const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const EditProduct = () => {
  const CustomButton = styled(Button)({
  backgroundColor: "#f8961e",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "none",
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "#e07b00",
  },
});
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    
  } = useForm({
    defaultValues: {
      model: "",
      batteryType: "",
      capacity: "",
      voltage: "",
      limitedVoltage: "",
      chargingTime: "",
      standbyTime: "",
      cycleTime: "",
      safety: "",
      brand: "",
      price: "",
      stock: "",
      imageURL: "",
      description: "",
      image: null, 
    },
  });

  useEffect(() => {
    axios
      .get(`https://deji-baterryserver-1.onrender.com/products/${id}`)
      .then((res) => {
        const data = res.data[0];
        reset(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id, reset]);



  const onSubmit = async (data) => {
    try {
      let imageUrl = data.imageURL;

 
      if (data.image && data.image.length > 0) {
        const imageData = new FormData();
        imageData.append("image", data.image[0]);

        const imgUploadRes = await axios.post(imageHostingURL, imageData);
        imageUrl = imgUploadRes.data.data.display_url;
      }

      const updatedProduct = {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        imageURL: imageUrl,
      };

    
      delete updatedProduct.image;

      const res = await axios.patch(`https://deji-baterryserver-1.onrender.com/products/${id}`, updatedProduct);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Product Updated Successfully",
          icon: "success",
        });
        navigate("/dashboard/manage-products");
      } else {
        Swal.fire({
          title: "No changes were made",
          icon: "info",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4} color="#f8961e">
          Edit Product
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            {[
              { label: "Model", name: "model" },
              { label: "Battery Type", name: "batteryType" },
              { label: "Capacity (mAh)", name: "capacity" },
              { label: "Voltage (V)", name: "voltage" },
              { label: "Limited Voltage (V)", name: "limitedVoltage" },
              { label: "Charging Time", name: "chargingTime" },
              { label: "Standby Time", name: "standbyTime" },
              { label: "Cycle Time", name: "cycleTime" },
              { label: "Safety Info", name: "safety" },
              { label: "Brand", name: "brand" },
              { label: "Price (৳)", name: "price", type: "number" },
              { label: "Stock", name: "stock", type: "number" },
              { label: "Image URL", name: "imageURL" },
            ].map(({ label, name, type = "text" }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={label} fullWidth type={type} variant="outlined" />
                )}
              />
            ))}

         
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
              )}
            />

            <Button
              type="submit"
              
              fullWidth
              
            >
            <CustomButton>Update Product</CustomButton>
            
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditProduct;
