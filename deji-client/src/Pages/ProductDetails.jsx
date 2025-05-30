import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import Companyinfo from "../components/Companyinf/Companyinfo";
import GlobalNetwork from "../components/GlobalNetwork/GlobalNetwork";
import FAQSection from "./Question";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSection, setActiveSection] = useState("details"); // 'details' or 'contact'

  const {
    isError,
    isLoading,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      console.log(res.data);
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
        Failed to load product
      </Typography>
    );

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Image + Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={selectedImage || product.imageURL}
            alt={product.title}
            className="w-full rounded-lg mb-4 object-contain max-h-[400px]"
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

        <div>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {product.title || "Samsung EB-BG950ABE Battery"}
          </Typography>

          <Typography
            sx={{
              color: "green",
              fontWeight: 500,
              whiteSpace: "pre-line",
              mb: 2,
            }}
          >
            {product.description ||
              "We Are Looking For Long-Term Partners And Distributors..."}
          </Typography>

          <Box
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 2, p: 2, mb: 2 }}
          >
            {product.model && (
              <Box sx={{ color: "#555", lineHeight: 2 }}>
                <Typography>
                  <strong>Brand:</strong> {product.brand}
                </Typography>
                <Typography>
                  <strong>Model:</strong> {product.model}
                </Typography>
                <Typography>
                  <strong>Battery Type:</strong> {product.batteryType}
                </Typography>
                <Typography>
                  <strong>Capacity:</strong> {product.capacity}
                </Typography>
                <Typography>
                  <strong>Voltage:</strong> {product.voltage}
                </Typography>
                <Typography>
                  <strong>Limited Voltage:</strong> {product.limitedVoltage}
                </Typography>
                <Typography>
                  <strong>Charging Time:</strong> {product.chargingTime}
                </Typography>
                <Typography>
                  <strong>Stock:</strong> {product.stock}
                </Typography>
              </Box>
            )}

            {product.title && product.title.includes("Samsung S8") && (
              <Box mt={2}>
                <Typography color="text.secondary">
                  <strong>Supports:</strong> Galaxy S8, G950, G950F, G950A
                </Typography>
              </Box>
            )}
          </Box>
        </div>
      </div>

      {/* YouTube */}
      {product.youtubeDemoVideoId && (
        <Box mt={4}>
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
        </Box>
      )}

      {/* Buttons to Toggle View */}
      <Box mt={6} mb={2} display="flex" justifyContent="flex" gap={2}>
        <button
          onClick={() => setActiveSection("details")}
          className={`px-4 py-2 rounded text-sm transition ${
            activeSection === "details"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Project Details
        </button>
        <button
          onClick={() => setActiveSection("contact")}
          className={`px-4 py-2 rounded text-sm transition ${
            activeSection === "contact"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Contact Us
        </button>
      </Box>

      {/* Conditional Section */}
      {activeSection === "details" && (
        <Box>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Brand</strong>
                  </TableCell>
                  <TableCell>{product.brand || "DEJI"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Model</strong>
                  </TableCell>
                  <TableCell>Samsung S8 Battery</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Battery Type</strong>
                  </TableCell>
                  <TableCell>Li-ion</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Capacity</strong>
                  </TableCell>
                  <TableCell>3000mAh</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Voltage</strong>
                  </TableCell>
                  <TableCell>3.85V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Limited Voltage</strong>
                  </TableCell>
                  <TableCell>4.4V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Material</strong>
                  </TableCell>
                  <TableCell>Eco-friendly</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Charging Time</strong>
                  </TableCell>
                  <TableCell>1–3 hours</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Standby Time</strong>
                  </TableCell>
                  <TableCell>5–8 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Cycle Time</strong>
                  </TableCell>
                  <TableCell>Over 550 times</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Companyinfo />
          <GlobalNetwork />
          <FAQSection />
        </Box>
      )}

      {activeSection === "contact" && (
        <Box mt={4} maxWidth={600} mx="auto">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" mb={2}>
              Contact Us About This Product
            </Typography>
            <form>
              <TextField fullWidth label="Your Name" margin="normal" required />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                margin="normal"
                required
              />
              <Box mt={2} textAlign="right">
                <Button variant="contained" color="primary" type="submit">
                  Send
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
