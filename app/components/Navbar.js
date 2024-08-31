import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          InstaWise AI
        </Typography>

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
        </Menu>

        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
