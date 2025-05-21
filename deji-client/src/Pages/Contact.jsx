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
      await axios.post('http://localhost:5000/contact', formData);
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
        text: `Failed to send your message ${error}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Contact Form */}
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Send Message'}
            </Button>
          </form>
        </Paper>
      </Box>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/65XXXXXXXX" // Replace with actual WhatsApp number (no +, just countrycode+number)
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '50px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          textDecoration: 'none',
          fontWeight: 600,
          zIndex: 1000,
        }}
      >
        WhatsApp Us
      </a>
    </div>
  );
};

export default ContactPage;
