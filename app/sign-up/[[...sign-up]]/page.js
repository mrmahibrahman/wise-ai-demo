import { SignUp } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <Container 
            maxWidth="100%" 
            sx={{ 
                backgroundColor: "#fff5f7", 
                minHeight: "100vh", 
                color: "#000", 
                display: "flex", 
                flexDirection: "column", 
                padding: "0", 
            }}
        >
            {/* Updated Navbar */}
            <AppBar position="static" sx={{ backgroundColor: "#ff6699", boxShadow: "none", borderBottom: "1px solid #ff99aa" }}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            flexGrow: 1, 
                            fontFamily: "'Playfair Display', serif", 
                            color: "#fff", 
                            fontWeight: 600 
                        }}
                    >
                        CyberFlash
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                            <Typography 
                                sx={{ 
                                    color: "#fff", 
                                    textDecoration: "none", 
                                    fontFamily: "'Playfair Display', serif", 
                                    fontWeight: 400 
                                }}
                            >
                                Login
                            </Typography>
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            <Typography 
                                sx={{ 
                                    color: "#fff", 
                                    textDecoration: "none", 
                                    fontFamily: "'Playfair Display', serif", 
                                    fontWeight: 400 
                                }}
                            >
                                Sign Up
                            </Typography>
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Sign Up Form Section */}
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                sx={{ mt: 8 }}
            >
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontFamily: "'Playfair Display', serif", 
                        mb: 4, 
                        color: "#ff6699" 
                    }}
                >
                    Sign Up
                </Typography>
                <Box 
                    sx={{ 
                        width: "100%", 
                        maxWidth: 400, 
                        p: 4, 
                        bgcolor: "#ffe6e9", 
                        borderRadius: 2, 
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" 
                    }}
                >
                    <SignUp />
                </Box>
            </Box>
        </Container>
    );
}
