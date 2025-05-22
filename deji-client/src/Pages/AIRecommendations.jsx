import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const AIRecommendations = ({ products, cartItems }) => {
  // কার্টে থাকা ব্র্যান্ডের ইউনিক লিস্ট
  const brandsInCart = [...new Set(cartItems.map((item) => item.brand))];

  // ব্র্যান্ড মেলানো ছাড়া অন্য প্রোডাক্ট নিন (সিম্পল লজিক)
  const recommended = products
    .filter((p) => !brandsInCart.includes(p.brand))
    .slice(0, 4); // সর্বোচ্চ ৪ টি

  if (recommended.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        No recommendations available.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        You Might Also Like
      </Typography>
      <Grid container spacing={2}>
        {recommended.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} handleAddToCart={() => {}} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AIRecommendations;
