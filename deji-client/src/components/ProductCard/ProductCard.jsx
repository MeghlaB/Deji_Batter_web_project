import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// USD ➜ SGD conversion (1 USD = 1.35 SGD)
const convertToSGD = (usd) => (usd * 1.35).toFixed(2);

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 250,
        height: 450,
        m: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        border: "1px solid transparent",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          border: "2px solid green",
        },
      }}
    >
      <Box
        onClick={() => navigate(`/products/${product._id}`)}
        sx={{ cursor: "pointer" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.imageURLs?.[0]}
          alt={product.name}
          sx={{ objectFit: "contain", padding: 1 }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom noWrap>
          {product.name}
        </Typography>

        <Typography
          sx={{
            border: "1px solid #ccc",
            textAlign: "center",
            padding: "10px",
            borderRadius: "6px",
            width: "100%",
            fontWeight: 500,
            mb: 1,
          }}
        >
          {product.model}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#11B808",
            fontWeight: "bold",
            fontSize: "16px",
           
          }}
        >
         Price: S${convertToSGD(product.price)}

        </Typography>

        {/* Spacer to push button to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            backgroundColor: "#11B808",
            "&:hover": {
              backgroundColor: "#0f9d07",
            },
          }}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
