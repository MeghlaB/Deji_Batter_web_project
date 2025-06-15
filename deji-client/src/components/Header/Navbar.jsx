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
                    color:
                      location.pathname === item.path ? "#11B808" : "#000",
                    fontWeight:
                      location.pathname === item.path ? 700 : 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {user && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard/my-carts"
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary="MY CART" />
            </ListItemButton>
          </ListItem>
        )}

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
      {/* Sticky Wrapper for Both Banner + Navbar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left:0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        {/* 🔶 Announcement Banner */}
        <Box
          sx={{
            backgroundColor: "#232323",
            textAlign: "center",
            fontSize: "0.875rem",
            padding: "0.5rem",
             color: "#ffff",
          }}
        >
          Same-Day Singapore Delivery | Order before 3PM
        </Box>

        {/* 🟩 Navbar */}
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/">
              <img
                src={icon}
                alt="logo"
                style={{ width: "50px", height: "40px" }}
              />
            </Link>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color:
                      location.pathname === item.path ? "#11B808" : "#000",
                    fontWeight:
                      location.pathname === item.path ? 700 : 600,
                    textTransform: "none",
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {user && (
                <Link to="/my-carts" className="relative inline-block">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                    {cartItems?.length || 0}
                  </span>
                </Link>
              )}

              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/2FsfXqM/default-user.png"
                      }
                      alt="profile"
                      className="w-8 h-8 rounded-full hidden md:block"
                    />
                    {isAdmin && (
                      <Link
                        to="/dashboard/adminhome"
                        className="hidden md:flex items-center gap-1 font-bold"
                      >
                        <LuLayoutDashboard />
                        <span className="text-sm">DASHBOARD</span>
                      </Link>
                    )}
                    <Button
                      onClick={logOut}
                      className="hidden md:flex items-center gap-1"
                      sx={{ textTransform: "none", color: "#000" }}
                    >
                      <MdLogout />
                      <span className="text-sm font-bold">LogOut</span>
                    </Button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    className="md:block px-4 py-1 rounded-md text-sm font-semibold text-white"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #11B808, #77B254)",
                    }}
                  >
                    Login
                  </Link>
                )}

                {user && (
                  <div className="relative md:hidden" ref={profileRef}>
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/2FsfXqM/default-user.png"
                      }
                      alt="profile"
                      title="Tap to open menu"
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-32 text-black bg-white shadow-md rounded-md py-2 z-50">
                        {isAdmin && (
                          <Link
                            to="/dashboard/adminhome"
                            className="block px-4 py-2 text-sm hover:bg-gray-200"
                          >
                            <div className="flex items-center gap-1">
                              <LuLayoutDashboard />
                              <p>Dashboard</p>
                            </div>
                          </Link>
                        )}
                        <button
                          onClick={logOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          <div className="flex items-center gap-1">
                            <MdLogout />
                            <span>Logout</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Spacer to push page content below sticky nav+banner */}
      <Box sx={{ height: { xs: 56 + 36, sm: 64 + 36 } }} />

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
