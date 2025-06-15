import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://deji-server-developers-projects-08e2b070.vercel.app/contact', formData);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you shortly.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Failed to send your message. ${error?.message || ''}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Deji Battery</title>
        <meta name="description" content="Get in touch with us for any inquiries about our batteries, bulk orders, or technical support." />
      </Helmet>

      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, px: 2 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
            Contact Us
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  flex: 1,
                  borderRadius: '12px',
                  py: 1.5,
                  fontWeight: 'bold',
                  backgroundColor: '#11B808',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0e9c06',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Message'}
              </Button>

              {/* WhatsApp Button */}
              <Button
                component="a"
                href="https://wa.me/6591234567" // ✅ Replace with actual number
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat with us on WhatsApp"
                sx={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  minWidth: '56px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  padding: 0,
                  '&:hover': {
                    backgroundColor: '#1ebe57',
                    boxShadow: '0 6px 12px rgba(37, 211, 102, 0.5)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <IoLogoWhatsapp />
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default ContactPage;
