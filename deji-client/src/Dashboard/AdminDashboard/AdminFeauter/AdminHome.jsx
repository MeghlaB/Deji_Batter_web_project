import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WarningIcon from "@mui/icons-material/Warning";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";
import DashboardChart from "../../../components/DashboardChart/DashboardCharat";

const AdminHome = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://deji-server.vercel.app/all-carts");
      const orders = res.data || [];
      setTotalOrders(orders.length);
      const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      setTotalRevenue(total);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://deji-server.vercel.app/products");
      const products = res.data || [];
      setTotalProducts(products.length);

      // Optional: Count low stock products (quantity <= 5)
      const lowStockItems = products.filter(p => p.quantity <= 5);
      setLowStock(lowStockItems.length);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://deji-server.vercel.app/users");
      const users = res.data || [];
      setTotalUsers(users.length);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchProducts(), fetchUsers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCartIcon fontSize="large" color="primary" />,
      bg: "#E3F2FD",
    },
   
   
    {
      title: "Total Products",
      value: totalProducts,
      icon: <InventoryIcon fontSize="large" color="info" />,
      bg: "#E1F5FE",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <GroupIcon fontSize="large" color="secondary" />,
      bg: "#F3E5F5",
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="1100px" mx="auto" p={3}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {stats.map(({ title, value, icon, bg }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: bg,
                borderRadius: 2,
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
              }}
            >
              <Box>{icon}</Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Orders & Revenue Overview
        </Typography>
        <DashboardChart />
      </Box>
    </Box>
  );
};

export default AdminHome;
