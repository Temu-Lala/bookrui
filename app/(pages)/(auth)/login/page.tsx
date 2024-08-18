'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Avatar, Button, Box, Grid, TextField, Typography, Container, Link
} from '@mui/material';
import Booklogo from '../../../../public/assets/book.png'; // Adjust path if needed
import Image from 'next/image';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

// Define a type for the JWT payload
interface DecodedToken {
  role: string;
  // Add any other properties you expect in the token here
}

const LoginPage = () => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3001/', formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Save JWT token to local storage

        // Decode the token to extract user role
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userRole = decodedToken.role;

        setSuccess('Login successful!');

        // Redirect based on role
        if (userRole === 'user') {
          router.push('/books');
        } else if (userRole === 'owner') {
          router.push('/owner');
        } else if (userRole === 'admin') {
          router.push('/admin');
        } else {
          setError('Unknown role');
        }
      } else {
        setError('Failed to log in');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        padding: 0,
        overflow: 'hidden', // Prevents horizontal scroll
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          width: '50%', // Ensure it covers half the screen
          height: '100vh', // Ensure it covers the full height
        }}
      >
        <Image
          src={Booklogo}
          alt="Logo Image"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%', // Ensure it covers half the screen
          height: '100vh', // Ensure it covers the full height
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <Image
            src={Booklogo}
            alt="Book Logo"
            width={40}
            height={40}
          />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {error && <Typography color="error.main">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
