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
} from "@mui/material";

const PriceTier = () => {
  const tiers = [
    { minQty: 1, maxQty: 9, price: 20 },
    { minQty: 10, maxQty: 49, price: 18 },
    { minQty: 50, maxQty: 99, price: 15 },
    { minQty: 100, maxQty: null, price: 12 },
  ];

  return (
    <TableContainer
      component={Paper}
      className="max-w-xl mx-auto shadow-md rounded-xl overflow-hidden"
    >
      <Table aria-label="Price Tier Table">
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="font-bold text-gray-700">Quantity</TableCell>
            <TableCell className="font-bold text-gray-700">Price (SGD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tiers.map((tier, i) => (
            <TableRow key={i}>
              <TableCell>
                {tier.minQty} - {tier.maxQty ? tier.maxQty : "and above"}
              </TableCell>
              <TableCell>${tier.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PriceTier;
