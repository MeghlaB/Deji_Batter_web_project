import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inquiries");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, currentStatus) => {
    let newStatus = "";
    if (currentStatus === "Processing") newStatus = "Shipped";
    else if (currentStatus === "Shipped") newStatus = "Delivered";
    else newStatus = currentStatus;

    if (newStatus === currentStatus) return;

    try {
      await axios.patch(`http://localhost:5000/inquiries/${id}`, {
        status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: 900,
        margin: "40px auto",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom color="#11B808">
        Manage Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Update Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderID || "N/A"}</TableCell>
                  <TableCell>{order.customerEmail || order.email || "N/A"}</TableCell>
                  <TableCell>{order.status || "N/A"}</TableCell>
                  <TableCell align="center">
                    {(order.status === "Processing" || order.status === "Shipped") && (
                      <Button
                        variant="contained"
                        color={order.status === "Processing" ? "primary" : "success"}
                        onClick={() => updateStatus(order._id, order.status)}
                      >
                        Mark as {order.status === "Processing" ? "Shipped" : "Delivered"}
                      </Button>
                    )}
                    {order.status === "Delivered" && <Typography>Completed</Typography>}
                    {!order.status && <Typography>N/A</Typography>}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageOrders;
