import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/products");
  return res.data;
};


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
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [brand, setBrand] = useState("");
  const [priceLimit, setPriceLimit] = useState(99999);
  const [recommendation, setRecommendation] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

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

  useEffect(() => {
    if (products.length < 3) return;

    const avgPrice =
      products.reduce((sum, p) => sum + p.price, 0) / products.length;

    const similarity = products
      .map((p) => ({
        product: p,
        score: 1 / (1 + Math.abs(p.price - avgPrice)), 
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.product);

    setSuggestedProducts(similarity);
  }, [products]);

  const brands = [...new Set(products.map((p) => p.brand))];

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
         Failed to load products
      </Typography>
    );

  return (
    <div className="container mx-auto mt-4">
      <Box sx={{ mt: 4, px: 3, mx: "auto", width: "container" }}>
        <Typography
          variant="h4"
          className="text-center"
          fontWeight="bold"
          mb={3}
        >
          Products
        </Typography>

        {/* Filters and Recommend Button */}
        <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Left side: Filters */}
          <div className="flex flex-wrap gap-4">
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
          </div>

          <Button
            variant="contained"
            onClick={generateRecommendation}
            sx={{
              backgroundColor: "orange",
              color: "white",
              "&:hover": {
                backgroundColor: "#cc5200",
              },
              whiteSpace: "nowrap",
              mt: { xs: 0, md: 0 },
            }}
          >
            Recommend Product
          </Button>
        </Box>

        {/* Recommended Product */}
        {recommendation && (
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Top Pick For You:
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
              <Link to={`/products/${product._id}`}>
                <ProductCard
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <Box mt={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              You Might Also Like
            </Typography>
            <Grid container spacing={2}>
              {suggestedProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Link to={`/products/${product._id}`}>
                    <ProductCard
                      product={product}
                      handleAddToCart={handleAddToCart}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Product;
