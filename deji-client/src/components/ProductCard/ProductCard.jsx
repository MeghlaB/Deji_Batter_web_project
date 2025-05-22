import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 300, m: 2, borderRadius: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageURL}
        alt={product.name}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/products/${product.id}`)}  
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">SGD {product.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
