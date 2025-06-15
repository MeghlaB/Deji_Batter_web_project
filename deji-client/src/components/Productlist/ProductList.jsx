import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid, CircularProgress, Typography } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import AIRecommendations from "../components/AIRecommendations";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Authprovider";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/products");
  console.log(res.data)
  return res.data;
};

const ProductList = () => {
  const {user} =useContext(AuthContext)
  const { data: products = [], isLoading, isError } = useQuery(
    ["products"],
    fetchProducts
  );

  const handleAddToCart = async (product) => {
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  //   const cartItem = {
  //   productId: product._id,
  //   name: product.name,
  //   image: product.imageURLs?.[0],
  //   price: product.price,
  //   model: product.model,
  //   email:user?.email,
  //   quantity: 1, // default quantity
  //   // optionally add user info if using auth
  // };

  // try {
  //   const res = await axios.post("http://localhost:5000/cart", cartItem);
  //   if (res.data.insertedId) {
  //     Swal.fire("Added!", "Product added to cart.", "success");
  //   }
  // } catch (error) {
  //   console.error("Error adding to cart", error);
  //   Swal.fire("Error", "Failed to add product to cart.", "error");
  // }
     
   }

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
