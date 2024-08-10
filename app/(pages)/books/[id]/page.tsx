"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Typography, Container, Card, CardContent, CardMedia } from '@mui/material';
import { Product } from '../types';

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

  return (
    <Container sx={{width:'100vh', height:'100vh', display:'flex'}}>
      <Card sx={{ display:'flex', justifyContent: 'center',width:'100%',
      alignItems: 'center',}}>
        <Card sx={{flex:'1',width:'100%'}}>
        <CardMedia
          component="img"
          height="100"
          width="100"
          image={book.imagepath || 'The Image Not found '}
          alt={book.title}
        />
        </Card>
      
        <CardContent sx={{flex:'1',width:'100%'}}>
          <Typography variant="h4">title:{book.title}</Typography>
          <Typography variant="h6">Author: {book.author}</Typography>
          <Typography variant="h6">Genre: {book.genre}</Typography>
          <Typography variant="h6">Price: ${book.price}</Typography>
          <Typography variant="h6">Publication Date: {book.publicationdate}</Typography>
          <Typography variant="h6">Publisher: {book.publisher}</Typography>
          <Typography variant="h6">Description: {book.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetailPage;
