import { SignIn } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function SignInPage() {
    return (
        <Container maxWidth="100vw" sx={{ backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#c5c6c7" }}>
            <AppBar position="static" sx={{ backgroundColor: "#282c34", boxShadow: "none", borderBottom: "1px solid #61dafb" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "monospace", color: "#61dafb" }}>
                        CyberFlash
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                            <Typography sx={{ color: "#61dafb", textDecoration: "none" }}>Login</Typography>
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            <Typography sx={{ color: "#61dafb", textDecoration: "none" }}>Sign Up</Typography>
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ fontFamily: "monospace", mb: 4 }}>
                    Sign In
                </Typography>
                <SignIn />
            </Box>
        </Container>
    );
}
