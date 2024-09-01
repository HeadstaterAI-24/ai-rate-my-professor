import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#1565c0',
          padding: '0.5rem 1rem',
          '&:hover': {
            backgroundColor: '#1e88e5',
            transition: 'background-color 0.3s ease-in-out',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Website Name on the Left */}
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            <Link href="/" passHref style={{ color: 'inherit', textDecoration: 'none' }}>
              AI Rate My Professor
            </Link>
          </Typography>

          {/* Centered Developer Message */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexGrow: 1, justifyContent: 'center' }}>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>
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

          {/* Right-Aligned Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SignedOut>
              <Button sx={{ color: 'white', textDecoration: 'none' }}>
                <Link href="/sign-in" passHref style={{ color: 'inherit', textDecoration: 'none' }}>
                  Login
                </Link>
              </Button>
              <Box sx={{ borderLeft: '1px solid white', height: '24px', marginX: '0.5rem' }} />
              <Button sx={{ color: 'white', textDecoration: 'none' }}>
                <Link href="/sign-up" passHref style={{ color: 'inherit', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
