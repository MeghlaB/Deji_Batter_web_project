// Navbar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const navItems = ['HOME', 'PRODUCTS', 'ABOUT DEJI', 'CLIENT FEEDBACK', 'NEWS', 'CONTACT US'];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        DEJI
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar component="nav" position="fixed" sx={{ backgroundColor: 'white', color: '#000' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}

            <Typography
              variant="h6"
              component="div"
              color='green'
              sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
            >
              {/* <img src="/logo.png" alt="DEJI Logo" style={{ height: 32, marginRight: 8 }} /> */}
              DEJI
            </Typography>
            {/* Desktop Nav Items */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: item === 'HOME' ? 'green' : '#000',
                    fontWeight: 600,
                    textTransform: 'none',
                    mx: 1,
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Drawer for mobile */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* To prevent content from hiding behind AppBar */}
      <Toolbar />
    </>
  );
}
