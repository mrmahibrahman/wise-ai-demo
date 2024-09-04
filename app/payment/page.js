'use client'
import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust the import path as needed

export default function Pricing() {
  return (
    <Container 
      maxWidth="100%" 
      sx={{ 
        background: "linear-gradient(135deg, #FFC0CB 0%, #FFF5F7 50%, #FFC0CB 100%)", // Softer gradient from pink to white to pink
        minHeight: "100vh", 
        color: "#5D4037", // Darker brown color for text
        padding: "5", 
        display: "flex", 
        flexDirection: "column",
        mt: 8, // Add margin top to push content below the Navbar
      }}
    >
      <Navbar />
      <Box sx={{ my: { xs: 4, md: 6 }, mt: { xs: 10, md: 12 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", color: "#B22222", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
          Pricing
        </Typography>
        <Grid container spacing={4} sx={{mt: 8}}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#FFB6C1',
                borderRadius: 2,
                backgroundColor: "#FFE4E1",
                color: "#5D4037",
                textAlign: 'left',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ p: 2, fontFamily: "'Playfair Display', serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                $5/month
              </Typography>
              <Typography variant="body1" sx={{ p: 2, fontFamily: "'Playfair Display', serif", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                Basic features include unlimited advice and access to our AI engine.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#FFB6C1',
                borderRadius: 2,
                backgroundColor: "#FFE4E1",
                color: "#5D4037",
                textAlign: 'left',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                Premium
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ p: 2, fontFamily: "'Playfair Display', serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                $15/month
              </Typography>
              <Typography variant="body1" sx={{ p: 2, fontFamily: "'Playfair Display', serif", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                Includes all basic features, plus priority support and additional AI insights.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
