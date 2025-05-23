// ExportButton.js
import { Button } from "@mui/material";
import React from "react";

const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await fetch("https://deji-server.vercel.app/api/export-products");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="contained"
      color="primary"
      size="small"
    >
      Export Products (CSV)
    </Button>
  );
};

export default ExportButton;
