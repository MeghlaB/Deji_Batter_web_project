import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";
import DashboardChart from "../../../components/DashboardChart/DashboardCharat";

const AdminHome = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://deji-server.vercel.app/carts");
      const orders = res.data || [];
      setTotalOrders(orders.length);
      const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      setTotalRevenue(total);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders()]);
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
      title: "Total Revenue",
      value: `৳ ${totalRevenue.toLocaleString()}`,
      icon: <MonetizationOnIcon fontSize="large" color="success" />,
      bg: "#E8F5E9",
    },
    {
      title: "Low Stock Alerts",
      value: lowStock,
      icon: <WarningIcon fontSize="large" color="warning" />,
      bg: "#FFF3E0",
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
    <Box maxWidth="900px" mx="auto" p={3}>
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
          <Grid item xs={12} sm={4} key={index}>
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
              <Box sx={{ color: "primary.main" }}>{icon}</Box>
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
