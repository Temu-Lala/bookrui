'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, CircularProgress, Container } from '@mui/material';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3001/books');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

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
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.imagepath} // Update to match your DB schema
                            alt={product.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.price}
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
