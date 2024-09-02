'use client';
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      }
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const handleGetStarted = () => {
    setLoading(true);
    router.push('/generate');
  };

  return (
    <Container 
      maxWidth="100%" 
      sx={{ 
        background: "linear-gradient(135deg, #FFC0CB 0%, #FFF5F7 50%, #FFC0CB 100%)", // Softer gradient from pink to white to pink
        minHeight: "100vh", 
        color: "#5D4037", // Darker brown color for text
        padding: "0", 
        display: "flex", 
        flexDirection: "column",
        mt: 8, // Add margin top to push content below the Navbar
      }}
    >
      <Head>
        <title>InstaWise AI</title>
        <meta name="description" content="Your AI-powered advice bot" />
      </Head>

      <Navbar />

      <Box
        sx={{
          textAlign: 'center',
          my: { xs: 2, md: 4 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", color: "#B22222", fontSize: { xs: "2rem", md: "3rem" } }}>
          Welcome to InstaWise AI
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", color: "#B22222", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
          The easiest way to get advice for any problem you may have!
        </Typography>
        <Button
          variant="contained"
          sx={{ 
            mt: 2, 
            backgroundColor: "#FFB6C1", // Soft pink color for the button
            color: "#5D4037", 
            fontFamily: "'Playfair Display', serif",
            '&:hover': { backgroundColor: "#B22222" } // Coral for hover
          }} 
          onClick={handleGetStarted}
        >
          Get Started!
        </Button>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", color: "#B22222", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: "#FFB6C1", // Soft pink lowlight
                borderRadius: 2,
                backgroundColor: "#FFE4E1", // Light rose
                color: "#5D4037", 
                textAlign: 'left',
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' 
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                <strong>Easy Text Input</strong>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Simply input your problem and let our software do the rest. Getting advice has never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: "#FFB6C1", // Soft pink lowlight
                borderRadius: 2,
                backgroundColor: "#FFE4E1", // Light rose
                color: "#5D4037", 
                textAlign: 'left',
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' 
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                <strong>Smart Advice</strong>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Our AI intelligently breaks down your problem into concise feedback and advice to help you find a solution.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#FFB6C1', // Soft pink lowlight
                borderRadius: 2,
                backgroundColor: "#FFE4E1", // Light rose
                color: "#5D4037", 
                textAlign: 'left',
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' 
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                <strong>Accessible Anywhere</strong>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Access InstaWise AI from any device, at any time. Solve problems on the go!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", color: "#B22222", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#FFB6C1', // Soft pink lowlight
                borderRadius: 2,
                backgroundColor: "#FFE4E1", // Light rose
                color: "#5D4037", 
                textAlign: 'left',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' 
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
                borderColor: '#FFB6C1', // Soft pink lowlight
                borderRadius: 2,
                backgroundColor: "#FFE4E1", // Light rose
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
