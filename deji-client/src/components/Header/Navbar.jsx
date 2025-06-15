import React, { useContext, useEffect, useRef, useState } from "react";
import icon from "../../assets/icon.png";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/Authprovider";
import { MdLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { ShoppingCart } from "lucide-react";
import useAdmin from "../../Hooks/useAdmin";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "PRODUCTS", path: "/products" },
  { label: "BULK ORDERS", path: "/b2b" },
  { label: "NEWS", path: "/news" },
  { label: "CONTACT US", path: "/contact" },
];

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const [isAdmin] = useAdmin();

  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: cartItems } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/carts?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 1, color: "#003049" }}>
        DEJI
      </Typography>
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                textAlign: "center",
                padding: "12px 16px !important",
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  style: {
                    color: location.pathname === item.path ? "#11B808" : "#000",
                    fontWeight: location.pathname === item.path ? 700 : 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {user && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/my-carts">
              <ShoppingCart />
              <ListItemText primary="MY CART" sx={{ ml: 1 }} />
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 16,
                  backgroundColor: "#dc2626",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {cartItems?.length || 0}
              </span>
            </ListItemButton>
          </ListItem>
        )}

        {user ? (
          <>
            {isAdmin && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/dashboard/adminhome">
                  <ListItemText primary="DASHBOARD" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={logOut}>
                <ListItemText primary="LOGOUT" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/auth/login">
              <ListItemText primary="LOGIN" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {/* Top Bar */}
      <Box
        sx={{
          backgroundColor: "#232323",
          textAlign: "center",
          fontSize: "0.875rem",
          padding: "0.5rem",
          color: "#ffff",
        }}
      >
        🚚 Same-Day Singapore Delivery | Order Before 3PM for Today's Dispatch | Free Delivery for Orders <span>$100</span>
      </Box>

      <AppBar
        component="nav"
        position="sticky"
        sx={{
          backgroundColor: "white",
          color: "#000",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Hamburger icon */}
          {isTabletOrMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, p: 1.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Link to="/">
            <img src={icon} alt="logo" style={{ width: "50px", height: "40px" }} />
          </Link>

          {/* Desktop Menu */}
          {!isTabletOrMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? "#11B808" : "#000",
                    fontWeight: location.pathname === item.path ? 700 : 600,
                    textTransform: "none",
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {user && (
                <Link to="/dashboard/my-carts" className="relative" aria-label="My Cart">
                  <ShoppingCart style={{ width: 24, height: 24 }} />
                  <span
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      backgroundColor: "#dc2626",
                      color: "white",
                      fontSize: 12,
                      padding: "2px 6px",
                      borderRadius: "50%",
                      fontWeight: "bold",
                    }}
                  >
                    {cartItems?.length || 0}
                  </span>
                </Link>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {user ? (
                  <>
                    <img
                      src={user.photoURL || "https://i.ibb.co/2FsfXqM/default-user.png"}
                      alt="profile"
                      style={{ width: 32, height: 32, borderRadius: "50%" }}
                    />
                    {isAdmin && (
                      <Link to="/dashboard/adminhome" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <LuLayoutDashboard />
                        <span>DASHBOARD</span>
                      </Link>
                    )}
                    <Button
                      onClick={logOut}
                      sx={{ color: "#000", textTransform: "none", fontWeight: 600 }}
                    >
                      <MdLogout />
                      LogOut
                    </Button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    style={{
                      padding: "6px 16px",
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 14,
                      color: "white",
                      backgroundImage: "linear-gradient(to right, #11B808, #77B254)",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                )}
              </Box>
            </Box>
          )}

          {/* Mobile Profile Dropdown */}
          {isTabletOrMobile && user && (
            <div className="relative" ref={profileRef}>
              <img
                src={user.photoURL || "https://i.ibb.co/2FsfXqM/default-user.png"}
                alt="profile"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
              {showDropdown && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    mt: 1,
                    width: 140,
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    borderRadius: 1,
                    py: 1,
                    zIndex: 1300,
                  }}
                >
                  {isAdmin && (
                    <Link
                      to="/dashboard/adminhome"
                      style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "inherit" }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LuLayoutDashboard />
                        Dashboard
                      </Box>
                    </Link>
                  )}
                  <Button
                    onClick={logOut}
                    sx={{
                      width: "100%",
                      justifyContent: "flex-start",
                      px: 2,
                      textTransform: "none",
                    }}
                  >
                    <MdLogout />
                    Logout
                  </Button>
                </Box>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Offset for fixed header */}
      <Box sx={{ height: { xs: 56 + 36, sm: 64 + 36 } }} />

      {/* Drawer for mobile */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
