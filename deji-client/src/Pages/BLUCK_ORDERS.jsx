import React from "react";
import {
  Typography,
  Container,
  Box,
} from "@mui/material";
import InquiryForm from "../components/InqueryFrom/InqueryFrom";
import PriceTier from "./PriceTier";

const BLUCK_ORDERS = () => {
  return (
    <Container maxWidth="lg" className="py-10">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          B2B Wholesale Inquiry
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Get customized pricing for bulk orders. Fill out the form below!
        </Typography>
      </div>

      {/* Grid Layout: Price Tier and Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Tier Section */}
        <Box className="p-6 md:p-8">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
             Pricing Tiers
          </Typography>
          <PriceTier />
        </Box>

        {/* Inquiry Form Section */}
        <Box className="p-6 md:p-8">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
             Inquiry Form
          </Typography>
          <InquiryForm />
        </Box>
      </div>
    </Container>
  );
};

export default BLUCK_ORDERS;
