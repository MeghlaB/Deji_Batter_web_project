// ExportButton.js
import { Button, styled } from "@mui/material";
import React from "react";

const ExportButton = () => {
  const CustomButton = styled(Button)({
  backgroundColor: "#11B808",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "none",
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "#11B808",
  },
});
  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/export-products");
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
     
    >
     <CustomButton> Export Products (CSV)</CustomButton>
     
    </Button>
  );
};

export default ExportButton;
