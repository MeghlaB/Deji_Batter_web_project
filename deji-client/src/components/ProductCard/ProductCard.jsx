import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();
  const [sgdPrice, setSgdPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch live exchange rate with better error handling and fallbacks
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Try primary API first
        const primaryResponse = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        
        if (primaryResponse.ok) {
          const data = await primaryResponse.json();
          const rate = data.rates.SGD;
          if (rate) {
            setSgdPrice(convertToSGD(product.price, rate));
            return;
          }
        }
        
        // Fallback to secondary API if primary fails
        const secondaryResponse = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=SGD"
        );
        
        if (secondaryResponse.ok) {
          const data = await secondaryResponse.json();
          const rate = data.rates.SGD;
          if (rate) {
            setSgdPrice(convertToSGD(product.price, rate));
            return;
          }
        }
        
        // Final fallback to static rate
        throw new Error("Using fallback exchange rate");
        
      } catch (err) {
        console.warn(err.message);
        // Static fallback rate (updated periodically)
        setSgdPrice(convertToSGD(product.price, 1.35));
      } finally {
        setLoading(false);
      }
    };

    // Helper function to convert and format SGD price
    const convertToSGD = (usdPrice, rate) => {
      return (usdPrice * rate).toLocaleString('en-SG', {
        style: 'currency',
        currency: 'SGD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

    fetchExchangeRate();
  }, [product.price]);

  return (
    <Card
      sx={{
        maxWidth: 250,
        height: 500,
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
            loading="lazy"
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

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", height: 40 }}>
            <CircularProgress size={20} />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                color: "#11B808",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {sgdPrice || "S$ --"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (Includes GST)
            </Typography>
          </Box>
        )}

        {/* Spacer to push button to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            backgroundColor: "#11B808",
            "&:hover": {
  transform: "scale(1.02)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
}
          }}
          onClick={() => handleAddToCart(product)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;