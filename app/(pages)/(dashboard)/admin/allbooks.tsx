"use client"
import React, { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Paper,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  genre: string;
  price: number;
  imagePath: string;
  author: string;
  publicationdate: string;
  publisher: string;
}

const BookTable: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const queryClient = useQueryClient();

  // Fetching Books
  const { data: books = [], isLoading, isError } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3001/books');
      return response.data;
    },
  });

  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'genre',
        header: 'Genre',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'author',
        header: 'Author',
      },
      {
        accessorKey: 'publicationDate',
        header: 'Publication Date',
      },
      {
        accessorKey: 'publisher',
        header: 'Publisher',
      },
    ],
    [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data: books,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    state: {
      isLoading,
      showAlertBanner: isError,
    },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Book</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Book</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => deleteUser(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Failed to load data.</p>;

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const BookTableWithProviders: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BookTable />
  </QueryClientProvider>
);

export default BookTableWithProviders;
