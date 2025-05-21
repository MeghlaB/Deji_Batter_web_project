import React from "react";
import {
  Typography,
  Divider,
  Container,
  Box,
} from "@mui/material";
import InquiryForm from "../components/InqueryFrom/InqueryFrom";
import PriceTier from "./PriceTier";

const BLUCK_ORDERS = () => {
  return (
    <Container maxWidth="lg" className="py-10">
      {/*  Page Heading */}
      <div className="text-center mb-10">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          B2B Wholesale Inquiry
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Get customized pricing for bulk orders. Fill out the form below!
        </Typography>
      </div>

      {/*  Price Tier Section */}
      <Box className=" p-6 md:p-8 mb-10">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Price Tier 
        </Typography>
        <Divider className="mb-4" />
        <PriceTier />
      </Box>

      {/*  Inquiry Form Section */}
      <Box className=" p-6 md:p-8">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Inquiry Form
        </Typography>
        <Divider className="mb-4" />
        <InquiryForm />
      </Box>
    </Container>
  );
};

export default BLUCK_ORDERS;
