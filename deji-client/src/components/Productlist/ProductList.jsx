// pages/ProductList.jsx
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Grid, CircularProgress, Typography } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/products"); // or your deployed endpoint
  return res.data;
};

const ProductList = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery(["products"], fetchProducts);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if (isLoading) return <CircularProgress sx={{ mt: 10, mx: "auto", display: "block" }} />;
  if (isError) return <Typography color="error">Failed to load products.</Typography>;

  return (
    <Grid container spacing={2} justifyContent="center">
      {products.map((product) => (
        <Grid item key={product._id}>
          <ProductCard product={product} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
