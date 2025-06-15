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
  Modal,
  Grid,
} from "@mui/material";
import Companyinfo from "../components/Companyinf/Companyinfo";
import GlobalNetworkSection from "../components/GlobalNetwork/GlobalNetwork";
import FAQSection from "./Question";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Play } from "lucide-react";
import CertificateSection from "../components/CertificateSection/CertificateSection";
import ExhibitionSection from "../components/Exhibition/Exhibition";
import ContactSection from "../components/Factory_Address/Factory_address";
const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSection, setActiveSection] = useState("details");
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const handleOpenVideoModal = () => setOpenVideoModal(true);
  const handleCloseVideoModal = () => setOpenVideoModal(false);

  const {
    isError,
    isLoading,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://deji-server-developers-projects-08e2b070.vercel.app/products/${id}`);
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

  const images =
    product.imageURLs?.length > 0
      ? product.imageURLs
      : product.imageURL
      ? [product.imageURL]
      : [];

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: images,
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
    <div>
      <div>
        <Link to={"/products"}>
          <div className="border w-[160px]  rounded-2xl text-center mx-5 mt-8">
            ← Back to Products
          </div>
        </Link>
      </div>
      <Box sx={{ px: 3, mt: 4, mb: 6 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* Image & Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={selectedImage || images[0]}
              alt={product.title}
              className="w-full rounded-lg mb-4 object-contain max-h-[400px] transition-opacity duration-500 ease-in-out"
            />

            <div className="flex gap-3">
              {images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 border ${
                    selectedImage === img
                      ? "border-blue-600 border-2"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {product.title}
            </Typography>
            <Typography
              sx={{
                color: "green",
                fontWeight: 500,
                whiteSpace: "pre-line",
                mb: 2,
              }}
            >
              {product.description}
            </Typography>
            <Box
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 2, p: 2, mb: 2 }}
            >
              {product.model && (
                <>
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
                    <strong>Cycle Time:</strong> {product.cycleTime}
                  </Typography>
                  <Typography>
                    <strong>Stock:</strong> {product.stock}
                  </Typography>
                  <Typography>
                    <strong>Battery Grade:</strong> {product.batteryGrade}
                  </Typography>
                  <Typography>
                    <strong>Certification:</strong> {product.certification}
                  </Typography>
                </>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link href="#" underline="none">
                <button className="bg-green-700 text-white px-2 py-2 rounded-2xl border-none">
                  Inquiry now
                </button>
              </Link>

              <Button
                onClick={handleOpenVideoModal}
                sx={{
                  color: "#fff",
                  backgroundColor: "green",
                  "&:hover": { backgroundColor: "darkgreen" },
                  minWidth: "40px",
                  padding: "6px",
                  borderRadius: "4px",
                }}
              >
                <Play />
              </Button>
            </Box>
          </div>
        </div>

        {/* YouTube Demo */}
        {product.youtubeDemoVideoId && (
          <Box mt={4}>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/watch?v=Lp7sZnLy62c`}
                title="Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-60 md:h-96 rounded-lg"
              ></iframe>
            </div>
          </Box>
        )}

        {/* Toggle Buttons */}
        <Box mt={6} mb={2} display="flex" gap={2}>
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

        {/* Product Details Section */}
        {activeSection === "details" && (
          <Box className="max-w-7xl mx-auto mt-10 px-4">
            {/* ✅ Image Gallery */}
            {images.length > 0 && (
              <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {images.slice(0, 4).map((img, index) => (
                  <Box key={index} className="w-full">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-64 object-cover rounded-md shadow hover:scale-105 transition-transform duration-300"
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* ✅ Specs & Warranty Table */}
            <Paper elevation={2} className="p-4">
              <Typography variant="h6" className="text-center font-bold mb-4">
                100% Brand NEW & Unused!
              </Typography>

              <Table size="small">
                <TableBody>
                  {/* Specs Title */}
                  <TableRow>
                    <TableCell colSpan={2} className="text-xl font-bold">
                      Specifications
                    </TableCell>
                  </TableRow>

                  {/* Specs Rows */}
                  <TableRow>
                    <TableCell>Battery Type</TableCell>
                    <TableCell>{product?.batteryType || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Battery Cell Grade</TableCell>
                    <TableCell>{product?.batteryGrade || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Capacity</TableCell>
                    <TableCell>{product?.capacity || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Voltage</TableCell>
                    <TableCell>{product?.voltage || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Limited Voltage</TableCell>
                    <TableCell>{product?.limitedVoltage || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PCM Board</TableCell>
                    <TableCell>Self Made & Designable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Color</TableCell>
                    <TableCell>Blue</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cycle Time</TableCell>
                    <TableCell>{product?.cycleTime || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Charging Time</TableCell>
                    <TableCell>{product?.chargingTime || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Standby Time</TableCell>
                    <TableCell>{product?.standbyTime || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Certification</TableCell>
                    <TableCell>{product?.certification || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Safety</TableCell>
                    <TableCell>Dual IC’s protection</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Material</TableCell>
                    <TableCell>{product?.material || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Compatible Models</TableCell>
                    <TableCell>{product?.model || "-"}</TableCell>
                  </TableRow>

                  {/* ✅ Warranty Section */}
                  <TableRow>
                    <TableCell colSpan={2} className="text-xl font-bold">
                      Warranty
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Warranty</TableCell>
                    <TableCell>
                      {product?.warranty || "1 Year Manufacturer Warranty"}
                    </TableCell>
                  </TableRow>

                  {/* Safety */}
                  <TableRow>
                    <TableCell colSpan={2} className="text-xl font-bold">
                      Safety
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Safety</TableCell>
                    <TableCell>{product?.safety || "-"}</TableCell>
                  </TableRow>

                  {/* Terms & Conditions */}
                  <TableRow>
                    <TableCell colSpan={2} className="text-xl font-bold">
                      Terms & Condition
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>MOQ</TableCell>
                    <TableCell>
                      {product?.moq ? `${product.moq} pcs` : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Terms</TableCell>
                    <TableCell>{product?.paymentTerms || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Port</TableCell>
                    <TableCell>{product?.port || "-"}</TableCell>
                  </TableRow>

                  {/* OEM */}
                  <TableRow>
                    <TableCell colSpan={2} className="text-xl font-bold">
                      OEM
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>OEM Order</TableCell>
                    <TableCell>OEM order is warmly welcomed.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Trial Order</TableCell>
                    <TableCell>Trial order is also accepted.</TableCell>
                  </TableRow>

                  {/* Working Temp */}
                  <TableRow>
                    <TableCell colSpan={2} className="text-xl font-bold">
                      Working Temp
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Working Temp</TableCell>
                    <TableCell>{product?.workingTemp || "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            {/* ✅ Other Sections */}
            <Companyinfo />
            <GlobalNetworkSection />
            <CertificateSection />
            <ExhibitionSection />
            <FAQSection />
          </Box>
        )}

        {/* Contact Section */}

        {activeSection === "contact" && (
          <Box mt={6} maxWidth={900} mx="auto" px={2}>
            {/* 📞 Customer Support Summary (Optional, can remove if redundant) */}
            <Box className="mb-6 bg-gray-100 p-4 rounded">
              <Typography variant="subtitle1" fontWeight="bold">
                📞 Customer Support (Singapore)
              </Typography>
              <Typography variant="body2">
                - Hotline: +65 6123 4567
                <br />- Email:{" "}
                <a
                  href="mailto:support@dejibattery.sg"
                  style={{ color: "#11B808" }}
                >
                  support@dejibattery.sg
                </a>
                <br />- Hours: Mon–Fri, 9 AM – 6 PM (SGT)
              </Typography>
            </Box>

            {/* Contact Info + Factory Addresses Section */}
            <Box
              mt={6}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap={5}
            >
              {/* Left Column - Contact Info */}
              <Box
                flex={1}
                p={3}
                sx={{ backgroundColor: "#fff", borderRadius: 3, boxShadow: 2 }}
              >
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Phone:</strong> +65 1234 5678
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Mobile:</strong> +65 1234 5678
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>WhatsApp:</strong> +65 1234 5678
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@dejibattery.sg"
                    style={{ color: "#11B808" }}
                  >
                    support@dejibattery.sg
                  </a>
                </Typography>
              </Box>

              {/* Right Column - Factory Addresses */}
              <Box
                flex={1}
                p={3}
                sx={{ backgroundColor: "#fff", borderRadius: 3, boxShadow: 2 }}
              >
                <Typography variant="h6" gutterBottom>
                  Factory Addresses
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Shenzhen Factory:
                  </Typography>
                  <Typography variant="body2">
                    401, D Building, Jinchangda Industrial Park, ShangWei
                    Industrial Road, Zhangkengjing Community, Guanlan Street,
                    Longhua District, Shenzhen
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Dongguan Factory:
                  </Typography>
                  <Typography variant="body2">
                    A003, Floor 4, Golden Phoenix Park Road, Fenggang Town,
                    Dongguan
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Contact Form Section */}
            <Paper
              elevation={4}
              sx={{ m: 5, p: 8, borderRadius: 3, backgroundColor: "#fafafa" }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Contact Us About This Product
              </Typography>

              <form>
                <TextField
                  fullWidth
                  label="Your Name"
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <Box mt={3} textAlign="right">
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 4,
                      backgroundColor: "#11B808",
                      "&:hover": {
                        backgroundColor: "#0e9e06",
                      },
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        )}

        <Modal
          open={openVideoModal}
          onClose={handleCloseVideoModal}
          aria-labelledby="youtube-video-modal"
          aria-describedby="youtube-demo-video"
          closeAfterTransition
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "90%", sm: 600 },
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              outline: "none",
            }}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Lp7sZnLy62c?si=V0b04Rsj0SC9DBYf"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default ProductDetails;
