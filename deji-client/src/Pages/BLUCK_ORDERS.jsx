import React from "react";
import {
  Typography,
  Container,
  Box,
} from "@mui/material";
import InquiryForm from "../components/InqueryFrom/InqueryFrom";
import PriceTier from "./PriceTier";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BLUCK_ORDERS = () => {
  return (
    <Container maxWidth="lg" className="py-10">
      {/* Page Heading with Animation */}
      <motion.div
        className="text-center mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          B2B Wholesale Inquiry
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Get customized pricing for bulk orders. Fill out the form below!
        </Typography>
      </motion.div>

      {/* Grid Layout: Price Tier and Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Tier Section with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box className="p-6 md:p-8 shadow-md rounded-xl bg-white">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Pricing Tiers
            </Typography>
            <PriceTier />
          </Box>
        </motion.div>

        {/* Inquiry Form Section with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box className="p-6 md:p-8 shadow-md rounded-xl bg-white">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Inquiry Form
            </Typography>
            <InquiryForm />
          </Box>
        </motion.div>
      </div>
    </Container>
  );
};

export default BLUCK_ORDERS;
