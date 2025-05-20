import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a1a1a", color: "#fff", py: 5, mt: 10 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Logo & About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🔋 DEJI Battery
            </Typography>
            <Typography variant="body2" color="gray">
              Singapore's trusted source for long-lasting mobile phone batteries. 12-month warranty on all products.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block">Home</Link>
            <Link href="/products" color="inherit" underline="hover" display="block">Products</Link>
            <Link href="/b2b" color="inherit" underline="hover" display="block">Wholesale</Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">Contact</Link>
          </Grid>

          {/* Contact + Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">WhatsApp: +65 1234 5678</Typography>
            <Typography variant="body2">Email: support@dejibattery.sg</Typography>
            <Box mt={1}>
              <IconButton href="https://wa.me/6512345678" target="_blank" sx={{ color: "#25D366" }}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton href="https://facebook.com/dejibattery" target="_blank" sx={{ color: "#1877F2" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://instagram.com/dejibattery" target="_blank" sx={{ color: "#E4405F" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box mt={4} pt={2} borderTop="1px solid #444" textAlign="center">
          <Typography variant="body2" color="gray">
            © {new Date().getFullYear()} DEJI Battery Singapore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
