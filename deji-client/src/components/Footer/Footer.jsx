import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Stack } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a1a1a", color: "#fff", py: 5, mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo & About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🔋 DEJI Battery Singapore
            </Typography>
            <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
              Official distributor of DEJI batteries in Singapore. 2-year local warranty on all products.
            </Typography>
            
            {/* Singapore Trust Badges */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <img 
                src="https://i.ibb.co/jvnjXK5J/download-7.png" 
                alt="IMDA Certified" 
                style={{ height: 40 }} 
              />
              <img 
                src="https://i.ibb.co/gMn80J3P/download-10.jpg" 
                alt="ACRA Registered" 
                style={{ height: 40 }} 
              />
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
              Home
            </Link>
            <Link href="/products" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
              Products
            </Link>
            <Link href="/warranty" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
              Warranty
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
              Contact
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Our Singapore Office
            </Typography>
            
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
                123 Battery Street, #04-56, Singapore 123456
              </Typography>
              
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <ContactPhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                +65 6123 4567 (Mon-Sat, 10AM-7PM)
              </Typography>
              
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <VerifiedIcon sx={{ mr: 1, fontSize: 18 }} />
                UEN: 2023123456X (ACRA Registered)
              </Typography>
            </Stack>

            <Box mt={2}>
              <IconButton
                aria-label="WhatsApp"
                href="https://wa.me/6561234567"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#25D366", backgroundColor: 'rgba(37, 211, 102, 0.1)' }}
              >
                <WhatsAppIcon />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com/dejibatterysg"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#1877F2", backgroundColor: 'rgba(24, 119, 242, 0.1)', mx: 1 }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://instagram.com/dejibatterysg"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#E4405F", backgroundColor: 'rgba(228, 64, 95, 0.1)' }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Trust Bar */}
        <Box mt={5} py={2} sx={{ 
          backgroundColor: '#2a2a2a',
          borderRadius: 1,
          borderLeft: '4px solid #ff5e14' // Orange accent
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src="https://i.ibb.co/jvnjXK5J/download-7.png" 
                  alt="IMDA" 
                  style={{ height: 24, marginRight: 8 }} 
                />
                IMDA Certified Vendor
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                <strong>ACRA Registered</strong> UEN: 2023123456X
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2">
                <BusinessIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                100% Singapore-Based Operations
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Copyright */}
        <Box mt={3} pt={2} textAlign="center">
          <Typography variant="body2" color="gray">
            © {new Date().getFullYear()} DEJI Battery (Singapore) Pte Ltd. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;