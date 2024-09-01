import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <Container
            maxWidth="100vw"
            sx={{
                backgroundImage: 'url("/professor.png")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        AI Rate My Professor
                    </Typography>
                    <Button sx={{ color: 'white', textDecoration: 'none' }}>
                      <Link href="/sign-in" passHref style={{ color: 'inherit', textDecoration: 'none' }}>
                        Login
                      </Link>
                    </Button>
                    <Button sx={{ color: 'white', textDecoration: 'none' }}>
                      <Link href="/sign-up" passHref style={{ color: 'inherit', textDecoration: 'none' }}>
                        Sign Up
                      </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box 
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ flexGrow: 1, padding: 2 }}
            >
                <SignUp/>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ 
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 2,
                    width: 'fit-content',
                    margin: 'auto',
                    mb: 2
                }}  
            >
                <Typography>
                    Developed by{' '}
                    <Link href="https://www.linkedin.com/in/amilcarjpena/" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Amilcar Pena
                    </Link>{' '}
                    and{' '}
                    <Link href="https://www.linkedin.com/in/iba001/" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Brian Bazurto
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}