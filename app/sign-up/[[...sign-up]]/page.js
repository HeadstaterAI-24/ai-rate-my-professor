// File: PROJECT-4/ai_flashcards/app/sign-up/page.js

import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
    return (
        <Container maxWidth="100vw">
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
            >
                <Typography variant="h4">
                    Sign Up
                </Typography>
                <SignUp/>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ paddingTop: 4 }}  
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