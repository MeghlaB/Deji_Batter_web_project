import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Authprovider";

// Fetch products
const fetchProducts = async () => {
  const res = await axios.get("https://deji-server.vercel.app/products");
  return res.data;
};

// Add to cart (localStorage + DB)
const addToLocalCart = async (product, user) => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = existing.find((item) => item._id === product._id);

  if (exists) {
    exists.quantity += 1;
  } else {
    existing.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(existing));

  try {
    const cartData = {
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.imageURLs?.[0] || "",
      quantity: 1,
      email: user?.email,
    };

    await axios.post("https://deji-server.vercel.app/cart", cartData);
  } catch (error) {
    console.error("Error posting to cart DB:", error);
  }

  Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: `${product?.title} has been added to your cart.`,
    timer: 1500,
    showConfirmButton: false,
    position: "top-center",
    toast: true,
  });
};

const FeaturedProduct = () => {
  const { user } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes before data becomes stale
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const handleAddToCart = (product) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please log in to add items to your cart.",
      });
      return;
    }
    addToLocalCart(product, user);
  };

  if (isError)
    return (
      <Typography textAlign="center" mt={5} color="#f8961e">
        Failed to load products
      </Typography>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-bold text-gray-800"
        style={{ color: "#11B808" }}
      >
        Featured Products
        {isFetching && !isLoading && (
          <CircularProgress size={20} sx={{ ml: 2 }} />
        )}
      </motion.h1>

      <Box sx={{ 
        mt: 4,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        {isLoading && !products.length ? (
          <Box textAlign="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={3}
            sx={{
              maxWidth: '1400px',
              justifyContent: 'center'
            }}
          >
            {products.map((product, index) => (
              <Grid
                item
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  style={{
                    width: '100%',
                    maxWidth: '300px'
                  }}
                >
                  <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                    <ProductCard
                      product={product}
                      handleAddToCart={() => handleAddToCart(product)}
                    />
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default FeaturedProduct;