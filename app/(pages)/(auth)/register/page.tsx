'use client';
// components/RegistrationForm.js

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Avatar, Button, Box, Grid, TextField, Typography, Container, Link
} from '@mui/material';
import Booklogo from '../../../../public/assets/book.png'; // Adjust path if needed
import Image from 'next/image';
import SideImage from '../../../../public/assets/book.png'

const RegistrationForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState({
    username: '',
    email: '',
    location: '',
    phone: '',
    password: '',
    repassword: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.repassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3001/register', formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccess('Registration successful!');
        router.push('/'); // Redirect to login page
      } else {
        setError('Failed to register');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
    component="main"
    sx={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      width: '100vw',
      padding: 0,
      overflow: 'hidden', // Prevents horizontal scroll
    }}
  >
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src={Booklogo}
        alt="Logo Image"
        layout="fill"
        objectFit="cover"
        style={{ width: '100%', height: '100%' }}
       // Ensures image covers the entire box
      />
    </Box>
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        overflow: 'auto', // Allows scrolling if content overflows
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
        Sign up As Owner
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              id="username"
              label="User Name"
              value={formValues.username}
              onChange={handleChange}
            />
          </Grid>
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
              id="location"
              label="Location"
              name="location"
              autoComplete="text"
              value={formValues.location}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={formValues.phone}
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
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="repassword"
              label="Re-Password"
              type="password"
              id="repassword"
              autoComplete="new-password"
              value={formValues.repassword}
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
          {loading ? 'Submitting...' : 'Sign Up'}
        </Button>
        <Link href="/pages/auth/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  </Container>
  );
};

export default RegistrationForm;
