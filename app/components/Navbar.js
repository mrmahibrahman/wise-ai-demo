import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import logoImage from './openart-6c1f0dad-3173-4861-a08b-8fc21254b77f.png'; // Adjust path accordingly

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed"
      sx={{ 
        backgroundColor: "#2c2c2c", // Purple Baseline
        color: "#f95d9b", // Pink Highlight
        top: 0,
        zIndex: 10,
        height: '64px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Container for logo and text */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2 }}> {/* Adds margin to the right of the image */}
            <Image
              src={logoImage}
              alt="InstaWise AI Logo"
              width={40} // Adjust size as needed
              height={40} // Adjust size as needed
              style={{ borderRadius: '50%' }} // Optional: makes the image circular
            />
          </Box>
          <Typography variant="h6">
            InstaWise AI
          </Typography>
        </Box>

        {/* Menu and authentication buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={handleMenuClick}>
            Menu
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#1e1e1e', // Dark Gray for menu background
                color: '#f95d9b', // Pink Highlight for menu text
              }
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              component="a"
              href="/"
              sx={{
                color: '#f95d9b',
                '&:hover': {
                  backgroundColor: '#39a0ca', // Bluewater Lowlight on hover
                },
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component="a"
              href="/generate"
              sx={{
                color: '#f95d9b',
                '&:hover': {
                  backgroundColor: '#39a0ca',
                },
              }}
            >
              Advice Bot
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component="a"
              href="/flashcards"
              sx={{
                color: '#f95d9b',
                '&:hover': {
                  backgroundColor: '#39a0ca',
                },
              }}
            >
              View Chat History
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component="a"
              href="/payment"
              sx={{
                color: '#f95d9b',
                '&:hover': {
                  backgroundColor: '#39a0ca',
                },
              }}
            >
              Upgrade Account
            </MenuItem>
          </Menu>

          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ ml: 2 }}>
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ ml: 2 }}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
