'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardMedia, CardContent, Typography, Grid, CircularProgress, Container, Box } from '@mui/material';

interface Product {
  id: string;
  title: string;
  author: string;
  price: string; // Changed to string for conversion handling
  genre: string;
  imagepath: string;
  description: string;
  publicationdate: string;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/books');
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (id: string) => {
    // Navigate to the book details page
    router.push(`/books/${id}`);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {products.map((product) => {
          // Convert price to number
          const price = parseFloat(product.price);
          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                onClick={() => handleCardClick(product.id)} 
                sx={{ cursor: 'pointer', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imagepath}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.author}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                    ${price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.publicationdate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
