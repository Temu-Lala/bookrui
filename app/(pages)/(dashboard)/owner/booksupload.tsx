'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    TextField, Button, Container, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert
} from '@mui/material';
import {jwtDecode} from 'jwt-decode'; 

const genres = [
    "Science Fiction", "Fantasy", "Horror", "Mystery", "Thriller", "Romance",
    "Historical Fiction", "Dystopian", "Utopian", "Young Adult (YA)", "Children's Literature",
    "Graphic Novels", "Biography", "Autobiography", "History", "Science", "Technology",
    "Self-Help", "Psychology", "Philosophy", "Religion", "Politics", "Economics",
    "Cookbooks", "Travel Guides", "True Crime", "Poetry", "Drama", "Essay"
];

export default function AddBook() {
    const router = useRouter();
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        publicationdate: '',
        publisher: '',
        imagePath: '',
        description: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State for controlling the success toast

    const handleChange = (e) => {
        setBookDetails({
            ...bookDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            setError('No token found. Please log in.');
            return;
        }

        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'owner') {
            console.error('Unauthorized: Only owners can upload books');
            setError('You are not authorized to upload books.');
            return;
        }

        const bookDataWithUser = {
            ...bookDetails,
            username: decodedToken.username, // Add username to book details
            email: decodedToken.email,       // Add email to book details
        };

        try {
            const response = await axios.post('http://localhost:3001/books', bookDataWithUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });

            if (response.status === 201) {
                setSuccess(true); // Show success toast
                router.push('/'); // Redirect to a different page after 2 seconds
            } else {
                console.error('Failed to add book');
                setError('Failed to add book.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding the book.');
        }
    };

    const handleClose = () => {
        setSuccess(false); // Close the toast
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column',  }}>
                <Typography component="h1" variant="h5">
                    Add a New Book
                </Typography>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
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
                            <FormControl fullWidth required>
                                <InputLabel id="genre-label">Genre</InputLabel>
                                <Select
                                    labelId="genre-label"
                                    id="genre"
                                    name="genre"
                                    value={bookDetails.genre}
                                    onChange={handleChange}
                                    label="Genre"
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre} value={genre}>
                                            {genre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                name="publicationdate"
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
                                id="description"
                                label="Description"
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
                {/* Success Snackbar */}
                <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Successfully uploaded!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
}
