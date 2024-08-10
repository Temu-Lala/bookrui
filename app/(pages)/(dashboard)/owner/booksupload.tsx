

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    TextField, Button, Container, Grid, Typography, Box,
} from '@mui/material';

export default function AddBook() {
    const router = useRouter();
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        publicationDate: '',
        publisher: '',
        imagePath: '',
        description:'',
    });

    const handleChange = (e) => {
        setBookDetails({
            ...bookDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookDetails),
            });

            if (response.ok) {
                router.push('/'); // Redirect to a different page or display success message
            } else {
                console.error('Failed to add book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Add a New Book
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                required
                                fullWidth
                                id="title"
                                label="Book Title"
                                value={bookDetails.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="author"
                                required
                                fullWidth
                                id="author"
                                label="Author"
                                value={bookDetails.author}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="genre"
                                required
                                fullWidth
                                id="genre"
                                label="Genre"
                                value={bookDetails.genre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="price"
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                type="number"
                                value={bookDetails.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="publicationDate"
                                required
                                fullWidth
                                id="publicationDate"
                                label="Publication Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={bookDetails.publicationdate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="publisher"
                                required
                                fullWidth
                                id="publisher"
                                label="Publisher"
                                value={bookDetails.publisher}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="imagePath"
                                required
                                fullWidth
                                id="imagePath"
                                label="Image Path"
                                value={bookDetails.imagePath}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                required
                                fullWidth
                                id="publisher"
                                label="description"
                                multiline
                                rows={4}
                                value={bookDetails.description}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Book
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
