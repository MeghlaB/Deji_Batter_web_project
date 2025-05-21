import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import * as tf from "@tensorflow/tfjs";

// Fetch products from backend
const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/products");
  return res.data;
};

// Add product to localStorage cart
const addToLocalCart = (product) => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = existing.find((item) => item._id === product._id);
  if (exists) {
    exists.quantity += 1;
  } else {
    existing.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(existing));
};

const Product = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [brand, setBrand] = useState("");
  const [priceLimit, setPriceLimit] = useState(99999);
  const [recommendation, setRecommendation] = useState(null);

  const handleAddToCart = (product) => {
    addToLocalCart(product);
  };

  const generateRecommendation = () => {
    if (products.length < 2) return;

    const prices = products.map((p) => p.price);
    const tensor = tf.tensor1d(prices);
    const min = tensor.min();
    const max = tensor.max();
    const normalized = tensor.sub(min).div(max.sub(min));
    const scores = normalized.dataSync();

    let bestIndex = 0;
    let highest = scores[0];

    for (let i = 1; i < scores.length; i++) {
      if (scores[i] > highest) {
        highest = scores[i];
        bestIndex = i;
      }
    }

    setRecommendation(products[bestIndex]);
  };

  // Get unique brands
  const brands = [...new Set(products.map((p) => p.brand))];

  // Filtered products
  const filtered = products.filter(
    (p) => (brand ? p.brand === brand : true) && p.price <= priceLimit
  );

  if (isLoading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography textAlign="center" mt={5} color="error">
        ❌ Failed to load products
      </Typography>
    );

  return (
    <Box sx={{ mt: 4, px: 3, mx: "auto", width: "container" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🛍️ Products
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          select
          label="Filter by Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Brands</MenuItem>
          {brands.map((b, i) => (
            <MenuItem key={i} value={b}>
              {b}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="number"
          label="Max Price"
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
        />

        <Button
          variant="contained"
          onClick={generateRecommendation}
          sx={{ whiteSpace: "nowrap" }}
        >
          🎯 Recommend Product
        </Button>
      </Box>

      {/* Recommended Product */}
      {recommendation && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            🎉 Recommended for You:
          </Typography>
          <ProductCard
            product={recommendation}
            handleAddToCart={handleAddToCart}
          />
        </Box>
      )}

      {/* Product Grid */}
      <Grid container spacing={2}>
        {filtered.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
