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
import { IoLogoWhatsapp } from "react-icons/io5";

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
            {/* Button container flex */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  flex: 1,
                  borderRadius: '12px',
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: '#11B808', 
                  color: '#fff',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#11B808',
                    transform: 'scale(1.05)',
                  
                  },
                  '&:disabled': {
                  
                    color: '#fff',
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Message'}
              </Button>

              <Button
                component="a"
                href="https://wa.me/65XXXXXXXX" // Replace with actual WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  minWidth: '56px',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: '#1ebe57',
                    boxShadow: '0 6px 12px rgba(37, 211, 102, 0.5)',
                    transform: 'scale(1.1)',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  padding: 0,
                }}
              >
                <IoLogoWhatsapp />
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default ContactPage;
