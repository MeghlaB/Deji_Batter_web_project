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
      const res = await axios.get(`https://deji-server.vercel.app/products/${id}`);
      return res.data[0]; // assuming API returns array
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

  // For JSON-LD schema injection in React, use <script> with dangerouslySetInnerHTML
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: [product.imageURL, ...(product.gallery || [])],
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
  };

  return (
    <Box sx={{ px: 3, mt: 4, mb: 6 }}>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        // React এ সরাসরি script tag এ content দেওয়ার জন্য
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Grid: Left images + video, Right product info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Images gallery + YouTube demo video */}
        <div>
          {/* Main selected image */}
          <img
            src={selectedImage || product.imageURL}
            alt={product.title}
            className="w-full rounded-lg mb-4 object-contain max-h-[400px]"
          />

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[product.imageURL, ...(product.gallery || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === img ? "border-blue-600 border-2" : "border-gray-300 border"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* YouTube installation demo video */}
          {product.youtubeDemoVideoId && (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${product.youtubeDemoVideoId}`}
                title="Installation Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-60 md:h-96 rounded-lg"
              ></iframe>
            </div>
          )}
        </div>

        {/* Right side: Product Text Info + Specs Table */}
        <div className="flex flex-col justify-start">
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

          {/* Specs Table */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Brand</strong></TableCell>
                  <TableCell>{product.brand || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Model</strong></TableCell>
                  <TableCell>{product.model || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Battery Type</strong></TableCell>
                  <TableCell>{product.batteryType || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Capacity</strong></TableCell>
                  <TableCell>{product.capacity || "4000mAh"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Voltage</strong></TableCell>
                  <TableCell>{product.voltage || "3.8V"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Limited Voltage</strong></TableCell>
                  <TableCell>{product.limitedVoltage || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Safety</strong></TableCell>
                  <TableCell>{product.safety || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Charging Time</strong></TableCell>
                  <TableCell>{product.chargingTime || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Standby Time</strong></TableCell>
                  <TableCell>{product.standbyTime || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Cycle Time</strong></TableCell>
                  <TableCell>{product.cycleTime || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty</strong></TableCell>
                  <TableCell>{product.warranty || "12 months"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    </Box>
  );
};

export default ProductDetails;
