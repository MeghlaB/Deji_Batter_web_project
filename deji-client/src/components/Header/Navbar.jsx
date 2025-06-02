
import React, { useContext, useRef, useState } from "react";
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
import useAdmin from "../../Hooks/useAdmin";

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

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "#003049" }}>
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
                    fontWeight: location.pathname === item.path ? 700 : 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {!user && (
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
      {/* ✅ Fixed AppBar */}
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link to="/">
            <img
              src={icon}
              alt="logo"
              style={{ width: "50px", height: "40px" }}
            />
          </Link>

          {/* Desktop Navigation */}
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
                  fontWeight: location.pathname === item.path ? 700 : 600,
                  textTransform: "none",
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Auth / Dashboard / Profile */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <img
                    src={user.photoURL}
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

              {/* Mobile profile dropdown */}
              {user && (
                <div className="relative md:hidden" ref={profileRef}>
                  <img
                    src={user.photoURL}
                    alt="profile"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-32 text-black bg-white shadow-md rounded-md py-2 z-50">
                      {isAdmin && (
                        <Link
                          to="/dashboard"
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

      {/* ✅ Spacer below fixed navbar */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />

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
