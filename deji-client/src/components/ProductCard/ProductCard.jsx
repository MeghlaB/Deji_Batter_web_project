import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 250,
        m: 2,
        borderRadius: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        border: "1px solid transparent", // Default border
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          border: "2px solid green", // Green border on hover
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageURLs[0]}
        alt={product.name}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/products/${product._id}`)}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
       
<Typography
  sx={{
    border: '1px solid #ccc',
    textAlign: 'center',
    padding: '12px',
    borderRadius: '6px',
    width: '100%',
    fontWeight: 500,
  }}
>
  {product.model}
</Typography>
        {/* <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#f8961e",
            "&:hover": {
              backgroundColor: "#f57c00",
            },
          }}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
