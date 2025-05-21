// PriceTier.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PriceTier = () => {
  const tiers = [
    { minQty: 10, maxQty: 50, price: 28 },
    { minQty: 51, maxQty: null, price: 25 },
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
