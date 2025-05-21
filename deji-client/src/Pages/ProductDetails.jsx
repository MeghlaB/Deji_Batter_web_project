import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    isError,
    isLoading,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      return res.data[0];
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography color="error" mt={8} textAlign="center">
        ❌ Failed to load product
      </Typography>
    );

  return (
    <Box sx={{ px: 3, mt: 4, mb: 6 }}>
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.title,
          image: [product.imageURL],
          description: product.description,
          sku: product.model,
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "SGD",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        })}
      </script>

      {/* Tailwind Grid: Image Left, Text Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Images */}
        <div>
          <img
            src={selectedImage || product.imageURL}
            alt={product.title}
            className="w-full rounded-lg mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {[product.imageURL, ...(product.gallery || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === img
                    ? "border-blue-600 border-2"
                    : "border-gray-300 border"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Text Info */}
       <div className="flex items-center justify-center">
         <div >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {product.title}
          </Typography>

          <Typography
            sx={{
              color: "green",
              fontWeight: "500",
              whiteSpace: "pre-line",
              mb: 2,
            }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            gutterBottom
            display="block"
          >
            3170mAh high capacity iphone xs max battery
          </Typography>
        </div>
       </div>
      </div>

      {/* Product Specifications Table */}
      <Paper elevation={3} sx={{ mt: 6, p: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Brand</strong></TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Model</strong></TableCell>
              <TableCell>{product.model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Battery Type</strong></TableCell>
              <TableCell>{product.batteryType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Capacity</strong></TableCell>
              <TableCell>{product.capacity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Voltage</strong></TableCell>
              <TableCell>{product.voltage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Limited Voltage</strong></TableCell>
              <TableCell>{product.limitedVoltage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Safety</strong></TableCell>
              <TableCell>{product.safety}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Charging Time</strong></TableCell>
              <TableCell>{product.chargingTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Standby Time</strong></TableCell>
              <TableCell>{product.standbyTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Cycle Time</strong></TableCell>
              <TableCell>{product.cycleTime}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
