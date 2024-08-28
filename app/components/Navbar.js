// components/Navbar.js
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
        position="static"
        sx={{ 
            backgroundColor: "#61dafb", // Change the background color here
            color: "#1e1e1e" // Change the text color here
          }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Wise AI
        </Typography>

        <Button color="inherit" //nClick={handleMenuClick}
        >
          Menu
        </Button>

            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
                '& .MuiPaper-root': {
                backgroundColor: '#282c34', // Menu background color
                }
            }}
            >
            <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="/"
                sx={{
                color: '#c5c6c7', // Text color
                '&:hover': {
                    backgroundColor: '#61dafb', // Hover background color
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
                color: '#c5c6c7',
                '&:hover': {
                    backgroundColor: '#61dafb',
                },
                }}
            >
                Chatbot
            </MenuItem>
            <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="/flashcards"
                sx={{
                color: '#c5c6c7',
                '&:hover': {
                    backgroundColor: '#61dafb',
                },
                }}
            >
                View Previous Chat History
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