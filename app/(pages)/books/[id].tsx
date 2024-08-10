// app/books/[id].tsx
"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  genre: string;
  price: string;
  author: string;
  imagepath: string;
  description: string;
  publicationdate: string;
  publisher: string;
}

const BookDetail = () => {
  const [book, setBook] = useState<Book | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch book details from backend
      fetch(`http://localhost:3001/books/${id}/`)
        .then((res) => res.json())
        .then((data) => setBook(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!book) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Image src={book.imagepath} alt={book.title} width={300} height={400} />
        <Typography variant="h4" mt={2}>
          {book.title}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {book.author}
        </Typography>
        <Typography variant="body1" mt={2}>
          {book.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: {book.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Published: {book.publicationdate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Publisher: {book.publisher}
        </Typography>
      </Box>
    </Container>
  );
};

export default BookDetail;
