'use client';

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
  TextField, TablePagination, Divider, Box, Typography, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { fetchAllBooks, Book, deleteBook, updateBook } from './booksapi'; // Ensure you update this path correctly
import jwt_decode from 'jwt-decode';

const Tables: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [username, setUsername] = useState<string | null>(null);

  // Function to decode JWT and get username
  const getUsernameFromToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt_decode(token);
        return decoded.username;
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
    return null;
  };

  const fetchBooks = async (search: string, pageNum: number, pageSize: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = username || getUsernameFromToken(); // Get username from state or decode JWT
      const response = await fetch(`http://localhost:3001/books?username=${user}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUsername(getUsernameFromToken()); // Set username on component mount
  }, []);

  useEffect(() => {
    fetchBooks(searchTerm, page + 1, rowsPerPage);
  }, [page, rowsPerPage, searchTerm, username]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = async (book: Book) => {
    // Implement edit logic here
    const updatedBook = { ...book, title: 'Updated Title' }; // Example modification
    try {
      await updateBook(updatedBook);
      fetchBooks(searchTerm, page + 1, rowsPerPage);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (bookId: number) => {
    // Implement delete logic here
    try {
      await deleteBook(bookId);
      fetchBooks(searchTerm, page + 1, rowsPerPage);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Box
        sx={{
          marginBottom: '1rem',
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Book Search
        </Typography>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Divider sx={{ marginBottom: '1rem' }} />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Genre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Author</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Publication Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Publisher</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow
                  key={book.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                  }}
                >
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publicationDate}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>{book.email}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(book)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(book.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length} // This should be replaced with the total count of books if available
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default Tables;
