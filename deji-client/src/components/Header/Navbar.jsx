
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
        `https://deji-server-developers-projects-08e2b070.vercel.app/carts?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Drawer content WITHOUT cart icon on mobile/tablet
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 1, color: "#003049" }}>
        DEJI
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{ textAlign: "center" }}
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

        {user ? (
          <>
            {isAdmin && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/dashboard/adminhome"
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary="DASHBOARD" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={logOut} sx={{ textAlign: "center" }}>
                <ListItemText primary="LOGOUT" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/auth/login"
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary="LOGIN" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#232323",
            textAlign: "center",
            fontSize: "0.875rem",
            padding: "0.5rem",
            color: "#ffff",
          }}
        >
          🚚 Same-Day Singapore Delivery | Order Before 3PM for Today's Dispatch | Free Delivery for Orders{" "}
          <span>$100</span>
        </Box>

        <AppBar
          component="nav"
          position="static"
          sx={{
            backgroundColor: "white",
            color: "#000",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
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

            <Link to="/">
              <img
                src={icon}
                alt="logo"
                style={{ width: "50px", height: "40px" }}
              />
            </Link>

            {/* Show nav buttons only if NOT tablet or mobile */}
            {!isTabletOrMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { sm: 2, md: 3, lg: 4 },
                }}
              >
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
                  <Link
                    to="/dashboard/my-carts"
                    className="relative inline-block"
                    aria-label="My Cart"
                    style={{ marginLeft: 12 }}
                  >
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

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {user ? (
                    <>
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/2FsfXqM/default-user.png"
                        }
                        alt="profile"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          display: "block",
                        }}
                      />
                      {isAdmin && (
                        <Link
                          to="/dashboard/adminhome"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontWeight: "bold",
                            fontSize: 14,
                          }}
                        >
                          <LuLayoutDashboard />
                          <span>DASHBOARD</span>
                        </Link>
                      )}
                      <Button
                        onClick={logOut}
                        sx={{
                          textTransform: "none",
                          color: "#000",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
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
                </div>
              </Box>
            )}

            {/* Mobile & Tablet user menu with cart icon */}
            {isTabletOrMobile && user && (
              <div
                className="relative"
                ref={profileRef}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                {/* Cart icon */}
                <Link
                  to="/dashboard/my-carts"
                  aria-label="My Cart"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <ShoppingCart style={{ width: 24, height: 24, color: "#000" }} />
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

                {/* Profile image */}
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2FsfXqM/default-user.png"
                  }
                  alt="profile"
                  title="Tap to open menu"
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
                        style={{
                          display: "block",
                          px: 2,
                          py: 1,
                          textDecoration: "none",
                          color: "inherit",
                        }}
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
      </Box>

      {/* Spacer */}
      <Box sx={{ height: { xs: 56 + 36, sm: 64 + 36 } }} />

      {/* Drawer for tablet and below */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
