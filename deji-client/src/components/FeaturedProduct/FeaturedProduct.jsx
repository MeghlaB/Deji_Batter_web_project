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
import ProductCard from "../ProductCard/ProductCard";
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
      <Typography textAlign="center" mt={5} color="error">
        ❌ Failed to load products
      </Typography>
    );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold">FeaturedProduct</h1>
      <Box sx={{ mt: 4, px: 3, mx: "auto", width: "container" }}>
        {/* Product Grid */}
        <Grid container spacing={2}>
          {products.map((product) => (
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
    </div>
  );
};

export default FeaturedProduct;
