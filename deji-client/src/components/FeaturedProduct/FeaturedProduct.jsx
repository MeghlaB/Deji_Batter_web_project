import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // 

// Fetch products
const fetchProducts = async () => {
  const res = await axios.get("https://deji-server.vercel.app/products");
  return res.data;
};

// Add product to cart (localStorage)
const addToLocalCart = (product) => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = existing.find((item) => item._id === product._id);
  if (exists) {
    exists.quantity += 1;
  } else {
    existing.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(existing));

  Swal.fire({
    icon: 'success',
    title: 'Added!',
    text: `${product.name} has been added to your cart.`,
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    toast: true,
  });
};

const FeaturedProduct = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleAddToCart = (product) => {
    addToLocalCart(product);
  };

  if (isLoading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography textAlign="center" mt={5} color="#f8961e">
        Failed to load products
      </Typography>
    );

  return (
    <div className="container mx-auto mt-10">
  
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-bold text-gray-800"
        style={{color:'#f8961e'}}
      >
        Featured Products
      </motion.h1>

      <Box sx={{ mt: 4, px: 3, mx: "auto", width: "container" }}>
        {/* Product Grid with Animation */}
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Link to={`/products/${product._id}`}>
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default FeaturedProduct;
