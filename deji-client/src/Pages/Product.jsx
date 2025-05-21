import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Slider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import * as tf from "@tensorflow/tfjs";
import { Link } from "react-router-dom";

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
  const [priceRange, setPriceRange] = useState([20, 50]); // min 20, max 50 SGD
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

  // Filter brands to only iPhone and Samsung
  const filteredBrands = ["iPhone", "Samsung"];

  // Filtered products by brand and price range
  const filtered = products.filter(
    (p) =>
      (brand ? p.brand === brand : true) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
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
    <div className="container mx-auto mt-4 px-4">
      <Box sx={{ mt: 4, mx: "auto", maxWidth: 1200 }}>
        <Typography
          variant="h4"
          className="text-center"
          fontWeight="bold"
          mb={3}
        >
          🛍️ Our Products
        </Typography>

        {/* Filters */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={3}
          mb={5}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            select
            label="Filter by Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            sx={{ minWidth: 180 }}
            size="small"
          >
            <MenuItem value="">All Brands</MenuItem>
            {filteredBrands.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ width: 240 }}>
            <Typography gutterBottom>Price Range (SGD)</Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={20}
              max={50}
              step={1}
              marks={[
                { value: 20, label: "20" },
                { value: 50, label: "50" },
              ]}
              sx={{ color: "primary.main" }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={generateRecommendation}
            sx={{ whiteSpace: "nowrap", height: 40 }}
          >
            🎯 Recommend Product
          </Button>
        </Box>

        {/* Recommended Product */}
        {recommendation && (
          <Box mb={5}>
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
        <Grid container spacing={3}>
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              sx={{ width: "100%", mt: 4 }}
            >
              No products found for selected filters.
            </Typography>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Product;
