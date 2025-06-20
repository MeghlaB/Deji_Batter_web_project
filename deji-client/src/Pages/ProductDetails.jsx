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
  Dialog,
  DialogContent,
  IconButton,
  Zoom,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeSection, setActiveSection] = useState("details");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");

  const handleOpenVideoModal = () => setOpenVideoModal(true);
  const handleCloseVideoModal = () => setOpenVideoModal(false);
  const handleZoomOpen = (img) => {
    setZoomImage(img);
    setZoomOpen(true);
  };
  const handleZoomClose = () => setZoomOpen(false);

  const {
    isError,
    isLoading,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://deji-server.vercel.app/products/${id}`);
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

  // Enhanced warranty display
  const warrantyText = product.warranty 
    ? product.warranty.includes("Year") || product.warranty.includes("year")
      ? product.warranty
      : `${product.warranty} Warranty`
    : "1 Year Manufacturer Warranty";

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
      itemCondition: "https://schema.org/NewCondition",
      warranty: {
        "@type": "WarrantyPromise",
        duration: warrantyText,
      }
    },
  };

  return (
    <div className="mt-[-30px]">
      <div>
        <Link to={"/products"}>
          <div className="border w-[160px] rounded-2xl text-center mx-5 mt-8 hover:bg-gray-100 transition-colors">
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
            <Box 
              onClick={() => handleZoomOpen(images[selectedImage])}
              sx={{ cursor: 'zoom-in' }}
            >
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full rounded-lg mb-4 object-contain max-h-[400px] transition-opacity duration-500 ease-in-out"
              />
            </Box>

            <div className="flex gap-3 flex-wrap">
              {images.slice(0, 4).map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    border: selectedImage === i ? '2px solid #11B808' : '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    width: '80px',
                    height: '80px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      borderColor: '#11B808'
                    }
                  }}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 4 && i === 3 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px'
                      }}
                    >
                      +{images.length - 4}
                    </Box>
                  )}
                </Box>
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "green",
                fontWeight: 500,
                whiteSpace: "pre-line",
                mb: 2,
              }}
            >
              {product.description}
            </Typography>
            
            {/* Key Specs Highlight */}
            <Box
              sx={{ 
                backgroundColor: "#f5f5f5", 
                borderRadius: 2, 
                p: 2, 
                mb: 2,
                borderLeft: '4px solid #11B808'
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Model:</strong> {product.model || '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Brand:</strong> {product.brand || '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Capacity:</strong> {product.capacity || '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Voltage:</strong> {product.voltage || '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Warranty:</strong> {warrantyText}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Stock:</strong> {product.stock || '-'}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#11B808",
                  '&:hover': { backgroundColor: "#0e9e06" },
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                Inquiry Now
              </Button>

              {product.youtubeDemoVideoId && (
                <Button
                  onClick={handleOpenVideoModal}
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{
                    color: "#11B808",
                    border: "1px solid #11B808",
                    '&:hover': { backgroundColor: "rgba(17, 184, 8, 0.1)" },
                    px: 3,
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Watch Demo
                </Button>
              )}
            </Box>
          </div>
        </div>

        {/* YouTube Demo Modal */}
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
              width: { xs: "90%", sm: 800 },
              height: { xs: 300, sm: 450 },
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              outline: "none",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseVideoModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${product.youtubeDemoVideoId}?autoplay=1`}
              title="Product Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            ></iframe>
          </Box>
        </Modal>

        {/* Image Zoom Modal */}
        <Dialog
          open={zoomOpen}
          onClose={handleZoomClose}
          maxWidth="md"
          TransitionComponent={Zoom}
        >
          <DialogContent sx={{ p: 0 }}>
            <IconButton
              aria-label="close"
              onClick={handleZoomClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={zoomImage}
              alt="Zoomed product"
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
            />
          </DialogContent>
        </Dialog>

        {/* Toggle Buttons */}
        <Box mt={6} mb={2} display="flex" gap={2}>
          <Button
            onClick={() => setActiveSection("details")}
            variant={activeSection === "details" ? "contained" : "outlined"}
            sx={{
              backgroundColor: activeSection === "details" ? "#11B808" : "transparent",
              color: activeSection === "details" ? "#fff" : "#11B808",
              borderColor: "#11B808",
              '&:hover': {
                backgroundColor: activeSection === "details" ? "#0e9e06" : "rgba(17, 184, 8, 0.1)",
              },
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none'
            }}
          >
            Product Details
          </Button>
          <Button
            onClick={() => setActiveSection("contact")}
            variant={activeSection === "contact" ? "contained" : "outlined"}
            sx={{
              backgroundColor: activeSection === "contact" ? "#11B808" : "transparent",
              color: activeSection === "contact" ? "#fff" : "#11B808",
              borderColor: "#11B808",
              '&:hover': {
                backgroundColor: activeSection === "contact" ? "#0e9e06" : "rgba(17, 184, 8, 0.1)",
              },
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none'
            }}
          >
            Contact Us
          </Button>
        </Box>

        {/* Product Details Section */}
        {activeSection === "details" && (
          <Box className="max-w-7xl mx-auto mt-10 px-4">
            {/* Full Image Gallery */}
            {images.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  Product Gallery
                </Typography>
                <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <Box 
                      key={index} 
                      onClick={() => handleZoomOpen(img)}
                      sx={{
                        cursor: 'zoom-in',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 3,
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Enhanced Specs & Warranty Table */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#11B808' }}>
                100% Brand NEW & Unused!
              </Typography>

              <Table size="small" sx={{ '& .MuiTableCell-root': { py: 1.5 } }}>
                <TableBody>
                  {/* Specs Title */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontSize: '18px', fontWeight: 'bold', pt: 0, borderBottom: '2px solid #11B808' }}>
                      Technical Specifications
                    </TableCell>
                  </TableRow>

                  {/* Battery Specifications */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>Battery Type</TableCell>
                    <TableCell>{product?.batteryType || "Lithium-ion"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Battery Cell Grade</TableCell>
                    <TableCell>{product?.batteryGrade || "A Grade"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nominal Capacity</TableCell>
                    <TableCell>{product?.capacity || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nominal Voltage</TableCell>
                    <TableCell>{product?.voltage || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Limited Voltage</TableCell>
                    <TableCell>{product?.limitedVoltage || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Internal Resistance</TableCell>
                    <TableCell>{product?.internalResistance || "≤100mΩ"}</TableCell>
                  </TableRow>

                  {/* Performance */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontSize: '18px', fontWeight: 'bold', pt: 3, borderBottom: '2px solid #11B808' }}>
                      Performance
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Cycle Life</TableCell>
                    <TableCell>{product?.cycleTime || "≥500 cycles"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Charging Time</TableCell>
                    <TableCell>{product?.chargingTime || "2-3 hours"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Standby Time</TableCell>
                    <TableCell>{product?.standbyTime || "Up to 30 days"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Operating Temperature</TableCell>
                    <TableCell>{product?.workingTemp || "-20°C to 60°C"}</TableCell>
                  </TableRow>

                  {/* Enhanced Warranty Section */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontSize: '18px', fontWeight: 'bold', pt: 3, borderBottom: '2px solid #11B808' }}>
                      Warranty & Support
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Warranty Period</TableCell>
                    <TableCell>{warrantyText}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Warranty Coverage</TableCell>
                    <TableCell>
                      Covers manufacturing defects under normal use. Does not cover physical damage, water damage, or unauthorized modifications.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Support</TableCell>
                    <TableCell>
                      24/7 email support. Phone support available Mon-Fri 9AM-6PM SGT.
                    </TableCell>
                  </TableRow>

                  {/* Safety & Certifications */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontSize: '18px', fontWeight: 'bold', pt: 3, borderBottom: '2px solid #11B808' }}>
                      Safety & Certifications
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Certification</TableCell>
                    <TableCell>{product?.certification || "CE, RoHS, UL Certified"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Safety Features</TableCell>
                    <TableCell>
                      Overcharge protection, over-discharge protection, short circuit protection, temperature protection
                    </TableCell>
                  </TableRow>

                  {/* Ordering Information */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontSize: '18px', fontWeight: 'bold', pt: 3, borderBottom: '2px solid #11B808' }}>
                      Ordering Information
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>MOQ</TableCell>
                    <TableCell>
                      {product?.moq ? `${product.moq} pcs` : "50 pcs"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Lead Time</TableCell>
                    <TableCell>3-5 business days for ready stock</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Payment Terms</TableCell>
                    <TableCell>{product?.paymentTerms || "T/T, PayPal, Credit Card"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Shipping</TableCell>
                    <TableCell>DHL/FedEx Express (2-3 days to Singapore)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            {/* Company Sections */}
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
                sx={{ 
                  backgroundColor: "#fff", 
                  borderRadius: 3, 
                  boxShadow: 2,
                  borderTop: '4px solid #11B808'
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Singapore Office
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Address:</strong> 123 Battery Street, #04-56, Singapore 123456
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Phone:</strong> +65 6123 4567
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>WhatsApp:</strong> +65 9123 4567
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@dejibattery.sg"
                    style={{ color: "#11B808" }}
                  >
                    support@dejibattery.sg
                  </a>
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Hours:</strong> Mon-Fri: 9AM-6PM SGT
                </Typography>
              </Box>

              {/* Right Column - Factory Addresses */}
              <Box
                flex={1}
                p={3}
                sx={{ 
                  backgroundColor: "#fff", 
                  borderRadius: 3, 
                  boxShadow: 2,
                  borderTop: '4px solid #11B808'
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Factory Addresses
                </Typography>

                <Box mb={3}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#11B808">
                    Shenzhen Factory:
                  </Typography>
                  <Typography variant="body2">
                    401, D Building, Jinchangda Industrial Park, ShangWei
                    Industrial Road, Zhangkengjing Community, Guanlan Street,
                    Longhua District, Shenzhen
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Phone:</strong> +86 755 1234 5678
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="#11B808">
                    Dongguan Factory:
                  </Typography>
                  <Typography variant="body2">
                    A003, Floor 4, Golden Phoenix Park Road, Fenggang Town,
                    Dongguan
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Phone:</strong> +86 769 1234 5678
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Enhanced Contact Form */}
            <Paper
              elevation={4}
              sx={{ 
                mt: 5, 
                p: 4, 
                borderRadius: 3, 
                backgroundColor: "#fafafa",
                borderTop: '4px solid #11B808'
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#11B808' }}>
                Product Inquiry Form
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Fill out the form below and our team will contact you within 24 hours.
              </Typography>

              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      margin="normal"
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      margin="normal"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      margin="normal"
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      margin="normal"
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Model"
                      margin="normal"
                      value={product.model || ''}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Quantity Needed"
                      margin="normal"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      multiline
                      rows={4}
                      margin="normal"
                      required
                      variant="outlined"
                      size="small"
                      placeholder="Please include any specific requirements or questions about this product..."
                    />
                  </Grid>
                </Grid>
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
                    Submit Inquiry
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ProductDetails;