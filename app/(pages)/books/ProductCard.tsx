// app/books/ProductCard.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/books/${product.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={product.imagePath || 'https://via.placeholder.com/150'}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {product.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {product.gener}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {product.publicationdate}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
