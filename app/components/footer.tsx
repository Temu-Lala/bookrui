'use client';
import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import mylogo from '../../public/assets/TD(lala).jpg'
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#282c34',
        color: '#ffffff',
        padding: '40px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              <Link href="https://temesgen-lala.vercel.app/" underline="none" color="inherit">
              <Image
        src={mylogo}
        alt="Logo Image"
        
       
        className=' w-14 h-14 rounded-2xl'
      />
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaaaaa' }}>
              © {new Date().getFullYear()} Lala Info Theck. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            
            <Box>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
            </Box>
            <Box>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
            </Box>
            <Box>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
            <Box>
              <Link href="https://temesgen-lala.vercel.app/" color="inherit" underline="hover">
              Portfolio
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://www.facebook.com"
                sx={{ color: '#ffffff', '&:hover': { color: '#3b5998' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://telegram.org"
                sx={{ color: '#ffffff', '&:hover': { color: '#0088cc' } }}
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://github.com"
                sx={{ color: '#ffffff', '&:hover': { color: '#333333' } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://temesgen-lala.vercel.app/"
                sx={{ color: '#ffffff', '&:hover': { color: '#333333' } }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
