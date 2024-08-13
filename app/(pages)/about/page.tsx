'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles'; // Ensure this is imported from the right place
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import Footer from '../../components/footer'
import Navbar from '../../components/navBar'
const AboutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#1a2840', // Changed background color
  color: '#ffffff', // Changed text color
}));

const DeveloperSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#1a2840', 
  textAlign: 'center',
  color: '#ffffff', // text color
}));

const DeveloperCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  color: '#000000', // Text color within the card remains black for contrast
}));

const About: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Navbar/>
      <AboutSection>
        <Typography variant="h3" align="center" gutterBottom>
          About the Website
        </Typography>
        <Typography variant="body1" align="center" color="inherit" paragraph>
          This website is dedicated to providing users with a seamless and efficient way to rent books online. Our platform offers a vast selection of books across various genres, ensuring that readers of all interests can find what they are looking for. We aim to promote reading and make it accessible to everyone.
        </Typography>
      </AboutSection>

      <DeveloperSection>
        <Typography variant="h4" gutterBottom>
          About the Developer
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <DeveloperCard>
              <Avatar
                src="https://images.pexels.com/photos/7031697/pexels-photo-7031697.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with the actual path to your image
                alt="Temesgen Lala"
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Temesgen Lala
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Lead Developer with a passion for creating innovative solutions and a strong background in full-stack development.
              </Typography>
              <Box>
                <IconButton href="https://accounts.google.com/SignOutOptions?hl=en-GB&continue=https://mail.google.com/mail/&service=mail&ec=GBRAFw" color="primary">
                  <EmailIcon />
                </IconButton>
                <IconButton href="https://t.me/TD_lala" target="_blank" color="primary">
                  <TelegramIcon />
                </IconButton>
                <IconButton href="https://github.com/Temu-Lala" target="_blank" color="primary">
                  <GitHubIcon />
                </IconButton>
              </Box>
            </DeveloperCard>
          </Grid>
        </Grid>
      </DeveloperSection>
     
    </Container>
  );
};

export default About;
