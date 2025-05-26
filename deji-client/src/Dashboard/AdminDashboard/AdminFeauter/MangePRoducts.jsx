import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Avatar,
  Button,
  Stack,
  styled,
} from "@mui/material";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import ExportButton from "./ExportButton";

// Custom styled button
const CustomButton = styled(Button)({
  backgroundColor: "#f8961e",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "none",
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "#e07b00",
  },
});

const ManageProducts = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://deji-server.vercel.app/products");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography color="error" fontSize={18}>
          Failed to load products. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={4}
      >
        <Typography variant="h5" fontWeight={600} color="#f8961e">
          Manage Products
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/dashboard/addproduct">
            <CustomButton>Add Product</CustomButton>
          </Link>
          <ExportButton CustomButton={CustomButton} />
        </Stack>
      </Stack>

      {/* Products Table */}
      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell>#</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Voltage</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item._id} hover sx={{ transition: "all 0.2s" }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={item.imageURL}
                    alt={item.model}
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.voltage}</TableCell>
                <TableCell>{item.price}৳</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell align="center">
                  <Link to={`/dashboard/products-edit/${item._id}`}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit size={18} />}
                      sx={{
                        borderColor: "#f8961e",
                        color: "#f8961e",
                        "&:hover": {
                          borderColor: "#e07b00",
                          backgroundColor: "#fff7f0",
                          color: "#e07b00",
                        },
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageProducts;
