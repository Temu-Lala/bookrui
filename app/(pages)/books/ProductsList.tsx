'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardMedia, CardContent, Typography, Grid, CircularProgress, Container } from '@mui/material';

interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  imagepath: string;
  description: string;
  publicationdate:string;

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
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card onClick={() => handleCardClick(product.id)}  sx={{ width:'50%',height:'70%'}} style={{ cursor: 'pointer' }}>
            <CardMedia
              component="img"
              height="100"
              image={product.imagepath}
              alt={product.title}
              sx={{ width:'100%',height:'70%'}}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
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
      ))}
    </Grid>
  );
}
