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
        backgroundColor:  "#2c2c2c",//"#161748", // Purple Baseline
        minHeight: "100vh", 
        color: "#f95d9b", // Pink Highlight
        padding: "0", 
        display: "flex", 
        flexDirection: "column",
        mt: 8 // Add margin top to push content below the Navbar
      }}
    >
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <Navbar />

      <Box
        sx={{
          textAlign: 'center',
          my: { xs: 2, md: 4 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", color: "#f95d9b", fontSize: { xs: "2rem", md: "3rem" } }}>
          Welcome to InstaWise AI
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", color: "#f95d9b", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
          The easiest way to get social advice for any social problem you may have!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, backgroundColor: "#f95d9b", color: "#161748", '&:hover': { backgroundColor: "#e34a6f" } }} // Slightly darker pink for hover
          onClick={handleGetStarted}
        >
          Get Started!
        </Button>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", color: "#f95d9b", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: "#f95d9b", // Bluewater Lowlight
                borderRadius: 2,
                backgroundColor: "#1e1e1e", // Dark Gray
                color: "#f95d9b", // Pink Highlight
                textAlign: 'left',
                height: '100%', // Ensures all boxes are the same height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Ensures content is spaced evenly
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' // Add shadow
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                <strong>Easy Text Input</strong>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Simply input your problem and let our software do the rest. Getting social advice cannot be easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: "#f95d9b", // Bluewater Lowlight
                borderRadius: 2,
                backgroundColor: "#1e1e1e", // Dark Gray
                color: "#f95d9b", // Pink Highlight
                textAlign: 'left',
                height: '100%', // Ensures all boxes are the same height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Ensures content is spaced evenly
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' // Add shadow
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                <strong>Smart Advice</strong>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Our AI intelligently breaks down your problem into concise feedback and advice to solve your problem.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#f95d9b', // Bluewater Lowlight
                borderRadius: 2,
                backgroundColor: "#1e1e1e", // Dark Gray
                color: "#f95d9b", // Pink Highlight
                textAlign: 'left',
                height: '100%', // Ensures all boxes are the same height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Ensures content is spaced evenly
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' // Add shadow
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                <strong>Accessible Anywhere</strong>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Access Wise AI from any device, at any time. Solve problems on the go!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", color: "#f95d9b", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#f95d9b', // Bluewater Lowlight
                borderRadius: 2,
                backgroundColor: "#1e1e1e", // Dark Gray
                color: "#f95d9b", // Pink Highlight
                textAlign: 'left',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' // Add shadow
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ p: 2, fontFamily: "Roboto, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                Free
              </Typography>
              <Typography sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "0.875rem", md: "1rem" }, fontWeight: 400 }}>
                Advice token limits each day
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: "#f95d9b", color: "#161748", '&:hover': { backgroundColor: "#e34a6f" } }} // Slightly darker pink for hover
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: "#f95d9b", // Bluewater Lowlight
                borderRadius: 2,
                backgroundColor: "#1e1e1e", // Dark Gray
                color: "#f95d9b", // Pink Highlight
                textAlign: 'left',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' // Add shadow
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700 }}>
                Premium
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ p: 2, fontFamily: "Roboto, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 400 }}>
                $ 5.00
              </Typography>
              <Typography sx={{ fontFamily: "Roboto, sans-serif", fontSize: { xs: "0.875rem", md: "1rem" }, fontWeight: 400 }}>
                Unlimited advice tokens
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: "#f95d9b", color: "#161748", '&:hover': { backgroundColor: "#e34a6f" } }} // Slightly darker pink for hover
              >
                Choose Premium
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
