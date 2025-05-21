import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const PriceTier = () => {
  const tiers = [
    { minQty: 10, maxQty: 50, price: 28 },
    { minQty: 51, maxQty: null, price: 25 },
  ];

  return (
    <Box className="max-w-2xl mx-auto mt-10 px-4">
      <Typography variant="h6" align="center" gutterBottom>
         Wholesale Pricing Tiers
      </Typography>

      <Typography variant="body2" align="center" color="textSecondary" className="mb-4">
        Get better pricing with bulk orders. Our tiered pricing ensures maximum value as you scale.
      </Typography>

      <TableContainer component={Paper} className="rounded-xl shadow-lg">
        <Table aria-label="Wholesale Price Tiers">
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity Range</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Unit Price (SGD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tiers.map((tier, i) => (
              <TableRow
                key={i}
                hover
                sx={{ transition: "all 0.2s", "&:hover": { backgroundColor: "#f9fafb" } }}
              >
                <TableCell>
                  {tier.minQty} – {tier.maxQty ? tier.maxQty : "and above"}
                </TableCell>
                <TableCell>${tier.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PriceTier;
