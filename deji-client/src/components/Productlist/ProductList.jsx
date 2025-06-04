import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid, CircularProgress, Typography } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import AIRecommendations from "../components/AIRecommendations";

const fetchProducts = async () => {
  const res = await axios.get("https://deji-server.vercel.app/products");
  console.log(res.data)
  return res.data;
};

const ProductList = () => {
  const { data: products = [], isLoading, isError } = useQuery(
    ["products"],
    fetchProducts
  );

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if (isLoading)
    return (
      <CircularProgress
        sx={{ mt: 10, mx: "auto", display: "block" }}
        size={60}
      />
    );
  if (isError)
    return <Typography color="error">Failed to load products.</Typography>;

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3 }}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product._id}>
            <ProductCard product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "40px" }}>
        <AIRecommendations products={products} cartItems={cartItems} />
      </div>
    </div>
  );
};

export default ProductList;
