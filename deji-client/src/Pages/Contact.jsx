import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Chip,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  IoLogoWhatsapp, 
  IoCallSharp, 
  IoMailSharp, 
  IoTimeSharp,
  IoLocationSharp 
} from 'react-icons/io5';
import { FaTelegram } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Singapore contact information
  const contactInfo = {
    whatsapp: '+65 9123 4567',
    phone: '+65 6123 4567',
    telegram: '+65 8123 4567',
    email: 'sales@dejibattery.sg',
    address: '123 Battery Street, #04-56, Singapore 123456',
    hours: 'Monday - Saturday, 9:00 AM - 6:00 PM SGT',
    emergency: '+65 9123 4567 (After hours)'
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://api.dejibattery.sg/contact', formData);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you within 24 hours.',
        confirmButtonColor: '#11B808',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Failed to send your message. ${error?.message || 'Please try again later.'}`,
        confirmButtonColor: '#11B808',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Deji Battery Singapore</title>
        <meta name="description" content="Contact Deji Battery Singapore for inquiries about lithium batteries, bulk orders, or technical support. Available Mon-Sat, 9AM-6PM SGT." />
      </Helmet>

      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto', 
        mt: isMobile ? 2 : -5, 
        mb: 6, 
        px: isMobile ? 1 : 4,
        animation: 'fadeIn 0.5s ease-in'
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom 
          fontWeight="bold" 
          textAlign="center" 
          sx={{ 
            color: '#11B808', 
            mb: 3,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              background: '#11B808',
              margin: '16px auto 0',
              borderRadius: '2px'
            }
          }}
        >
          Contact Our Singapore Team
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 4,
          alignItems: 'stretch'
        }}>
          {/* Contact Form */}
          <Paper elevation={4} sx={{ 
            flex: 1,
            p: isMobile ? 2 : 4, 
            borderRadius: '16px',
            background: 'linear-gradient(to bottom right, #f9f9f9, #ffffff)',
            boxShadow: '0 8px 32px rgba(17, 184, 8, 0.1)',
            border: '1px solid rgba(17, 184, 8, 0.1)'
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              fontWeight="bold"
              sx={{ 
                color: '#11B808',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#11B808">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Send Us a Message
            </Typography>
            <Divider sx={{ 
              mb: 3, 
              borderColor: 'rgba(17, 184, 8, 0.2)',
              borderBottomWidth: '2px'
            }} />

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#11B808',
                    },
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#11B808',
                    },
                  }
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#11B808',
                    },
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#11B808',
                    },
                  }
                }}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
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
                    boxShadow: '0 4px 12px rgba(17, 184, 8, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#0e9c06',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(17, 184, 8, 0.4)'
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}>
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </Button>
              </Box>
            </form>
          </Paper>

          {/* Contact Info */}
          <Paper elevation={4} sx={{ 
            flex: 1,
            p: isMobile ? 2 : 4, 
            borderRadius: '16px',
            background: 'linear-gradient(to bottom right, #f9f9f9, #ffffff)',
            boxShadow: '0 8px 32px rgba(17, 184, 8, 0.1)',
            border: '1px solid rgba(17, 184, 8, 0.1)'
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              fontWeight="bold"
              sx={{ 
                color: '#11B808',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#11B808">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Contact Information
            </Typography>
            <Divider sx={{ 
              mb: 3, 
              borderColor: 'rgba(17, 184, 8, 0.2)',
              borderBottomWidth: '2px'
            }} />

            <Box sx={{ mb: 3 }}>
              <Chip 
                icon={<IoTimeSharp style={{ color: '#11B808' }} />} 
                label={`Support Hours: ${contactInfo.hours}`} 
                sx={{ 
                  mb: 2, 
                  backgroundColor: 'rgba(17, 184, 8, 0.1)',
                  color: '#333',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px'
                }} 
              />
              
              <Typography 
                variant="body2" 
                sx={{ 
                  fontStyle: 'italic',
                  mb: 2,
                  backgroundColor: 'rgba(255,0,0,0.05)',
                  p: 1,
                  borderRadius: '8px',
                  borderLeft: '3px solid #ff5252',
                  color: '#ff5252'
                }}
              >
                <strong>After hours:</strong> {contactInfo.emergency}
              </Typography>
            </Box>

            {/* Contact Methods */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 2
            }}>
              {/* WhatsApp */}
              <Button
                fullWidth
                component="a"
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<IoLogoWhatsapp style={{ fontSize: '1.5rem' }} />}
                sx={{
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  color: '#25D366',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.5,
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 211, 102, 0.2)',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                  },
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>WhatsApp</Typography>
                  <Typography variant="caption">{contactInfo.whatsapp}</Typography>
                </Box>
              </Button>

              {/* Telegram */}
              <Button
                fullWidth
                component="a"
                href={`https://t.me/${contactInfo.telegram.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<FaTelegram style={{ fontSize: '1.5rem' }} />}
                sx={{
                  backgroundColor: 'rgba(0, 136, 204, 0.1)',
                  color: '#0088cc',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.5,
                  border: '1px solid rgba(0, 136, 204, 0.3)',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 136, 204, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 136, 204, 0.2)',
                  },
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Telegram</Typography>
                  <Typography variant="caption">{contactInfo.telegram}</Typography>
                </Box>
              </Button>

              {/* Phone */}
              <Button
                fullWidth
                component="a"
                href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                startIcon={<IoCallSharp style={{ fontSize: '1.5rem' }} />}
                sx={{
                  backgroundColor: 'rgba(17, 184, 8, 0.1)',
                  color: '#11B808',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.5,
                  border: '1px solid rgba(17, 184, 8, 0.3)',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'rgba(17, 184, 8, 0.2)',
                    boxShadow: '0 4px 12px rgba(17, 184, 8, 0.2)',
                  },
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Call Us</Typography>
                  <Typography variant="caption">{contactInfo.phone}</Typography>
                </Box>
              </Button>

              {/* Email */}
              <Button
                fullWidth
                component="a"
                href={`mailto:${contactInfo.email}`}
                startIcon={<IoMailSharp style={{ fontSize: '1.5rem' }} />}
                sx={{
                  backgroundColor: 'rgba(212, 70, 56, 0.1)',
                  color: '#d44638',
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1.5,
                  border: '1px solid rgba(212, 70, 56, 0.3)',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 70, 56, 0.2)',
                    boxShadow: '0 4px 12px rgba(212, 70, 56, 0.2)',
                  },
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Email</Typography>
                  <Typography variant="caption">{contactInfo.email}</Typography>
                </Box>
              </Button>
            </Box>

            {/* Address */}
            <Box sx={{ 
              mt: 4,
              p: 3,
              borderRadius: '12px',
              backgroundColor: 'rgba(17, 184, 8, 0.05)',
              border: '1px solid rgba(17, 184, 8, 0.1)'
            }}>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#11B808'
                }}
              >
                <IoLocationSharp />
                Singapore Office
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {contactInfo.address}
              </Typography>
              <Link 
                href="https://maps.google.com/?q=123+Battery+Street+Singapore+123456" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#11B808',
                  fontWeight: '500',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#11B808" style={{ marginRight: '8px' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                View on Google Maps
              </Link>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;