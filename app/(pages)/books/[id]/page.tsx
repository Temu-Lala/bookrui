'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Typography, Container, Card, CardContent, CardMedia, Box, Button, Grid } from '@mui/material';
import { Product } from '../types';
import Footer  from '../../../components/footer'
import Navbar from '../../../components/navBar'
const BookDetailPage = () => {
  const [book, setBook] = useState<Product | null>(null);
  const pathname = usePathname();
  
  // Extract the ID from the URL path
  const id = pathname?.split('/').pop();

  useEffect(() => {
    // Only fetch the book if the id is available
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await fetch(`http://localhost:3001/books/${id}`);
          if (response.ok) {
            const data = await response.json();
            setBook(data);
          } else {
            console.error('Failed to fetch book details');
          }
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [id]);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  // Ensure price is treated as a number
  const formattedPrice = typeof book.price === 'number' ? book.price.toFixed(2) : '0.00';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Navbar/>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: '100%' }}>
            <CardMedia
              component="img"
              height="400"
              image={book.imagepath || '/placeholder-image.jpg'}
              alt={book.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h3" component="div" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Author: {book.author}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Genre: {book.genre}
            </Typography>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Price: ${book.price}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Publication Date: {book.publicationdate}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Publisher: {book.publisher}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {book.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" size="large">
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Grid>
        
      </Grid>
    
    </Container>
    
  );
};

export default BookDetailPage;
