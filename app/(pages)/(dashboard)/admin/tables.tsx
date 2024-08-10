'use client';

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
  TextField, TablePagination, Divider, Box, Typography, IconButton
} from '@mui/material';
import { Edit, Delete, NavigateNext, NavigateBefore } from '@mui/icons-material';
import { fetchAllBooks, Book, deleteBook, updateBook } from './booksapi'; // Ensure you update this path correctly

const Tables: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2); // Show 2 rows per page

  const fetchBooks = async (search: string, pageNum: number, pageSize: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/books?page=${pageNum}&limit=${pageSize}`, {
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
    fetchBooks(searchTerm, page + 1, rowsPerPage);
  }, [page, rowsPerPage, searchTerm]);

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
    const updatedBook = { ...book, title: 'Updated Title' }; // Example modification
    try {
      await updateBook(updatedBook);
      fetchBooks(searchTerm, page + 1, rowsPerPage);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      fetchBooks(searchTerm, page + 1, rowsPerPage);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Box sx={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
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
          sx={{ height: '40px' }} // Adjust search bar height
        />
      </Box>
      <Divider sx={{ marginBottom: '1rem' }} />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto' }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                {['Title', 'Genre', 'Price', 'Author', 'Publication Date', 'Publisher', 'Description', 'Email', 'Actions'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.length > 0 ? books.map((book, index) => (
                <TableRow
                  key={book.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                    height: '48px',
                  }}
                >
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.title}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.genre}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.price}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.author}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.publicationdate}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.publisher}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.description}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{book.email}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(book)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(book.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">No books found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[2]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={() => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton
                  onClick={(e) => handleChangePage(e, page - 1)}
                  disabled={page === 0}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  onClick={(e) => handleChangePage(e, page + 1)}
                  disabled={books.length < rowsPerPage}
                >
                  <NavigateNext />
                </IconButton>
              </Box>
            )}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default Tables;
