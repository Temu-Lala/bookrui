import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Define Book interface
interface Book {
  id: number;
  title: string;
  genre: string;
  price: number;
  author: string;
  publicationDate: string;
  publisher: string;
  description: string;
  email: string;
}

// Define function to update book
const updateBook = async (book: Book) => {
  // Implement update logic here
};

// Define function to delete book
const deleteBook = async (bookId: number) => {
  // Implement delete logic here
};

// Function to decode JWT manually
const decodeJWT = (token: string): any => {
  try {
    const base64Payload = token.split(".")[1];
    const decodedPayload = atob(
      base64Payload.replace(/_/g, "/").replace(/-/g, "+")
    ); // Handle URL-safe base64
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Validation function
const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateBook(book: Book) {
  return {
    title: !validateRequired(book.title) ? "Title is Required" : "",
    email: !validateEmail(book.email) ? "Incorrect Email Format" : "",
  };
}

const Tables: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3); // Set default rows per page to 3
  const [username, setUsername] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [descriptionPopupOpen, setDescriptionPopupOpen] =
    useState<boolean>(false);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Function to get username from token
  const getUsernameFromToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      return decoded?.username || null;
    }
    return null;
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = username || getUsernameFromToken(); // Get username from state or decode JWT

      if (!user) {
        throw new Error("Username is required");
      }

      const response = await fetch(
        `http://localhost:3001/booksusername?username=${user}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      // Directly handle array response
      const data: Book[] = await response.json();
      console.log("Raw API response:", data); // Debugging line
      setBooks(data);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const usernameFromToken = getUsernameFromToken();
    setUsername(usernameFromToken); // Set username on component mount
  }, []);

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  const handleEdit = async (book: Book) => {
    // Implement edit logic here
    const updatedBook = { ...book, title: "Updated Title" }; // Example modification
    try {
      await updateBook(updatedBook);
      fetchUserData();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (bookId: number) => {
    // Implement delete logic here
    try {
      await deleteBook(bookId);
      fetchUserData();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Table columns
  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "genre",
        header: "Genre",
        size: 120,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 150,
      },
      {
        accessorKey: "publicationDate",
        header: "Publication Date",
        size: 150,
      },
      {
        accessorKey: "publisher",
        header: "Publisher",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
        muiTableBodyCellProps: {
          sx: { cursor: "pointer" },
        },
        Cell: ({ cell }) => (
          <Typography
            variant="body2"
            onClick={() => {
              setSelectedDescription(cell.getValue() as string);
              setDescriptionPopupOpen(true);
            }}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            {cell.getValue()
              ? `${(cell.getValue() as string).slice(0, 50)}...`
              : ""}
          </Typography>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 180,
      },
    ],
    []
  );

  // CREATE action
  const handleCreateBook: MRT_TableOptions<Book>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateBook(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await fetch(`http://localhost:3001/books`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    table.setCreatingRow(null); // exit creating mode
    fetchUserData(); // Refresh data
  };

  // UPDATE action
  const handleSaveBook: MRT_TableOptions<Book>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateBook(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateBook(values);
    table.setEditingRow(null); // exit editing mode
    fetchUserData(); // Refresh data
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1000px" }}>
      <Typography variant="h6">Book Data</Typography>
      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <MaterialReactTable
            columns={columns}
            data={books}
            initialState={{
              pagination: {
                pageIndex: page,
                pageSize: rowsPerPage, // Default rows per page
              },
              columnSizing: { columnSizingMode: "auto" }, // Compact by default
              density: "compact", // Set default density to compact
            }}
            manualPagination
            onPaginationChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            pageCount={Math.ceil(books.length / rowsPerPage)}
            renderRowActions={({ row }) => (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() =>
                      handleEdit({
                        ...row.original,
                        title: "Updated Title", // Example update
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(row.original.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => {
                setExpandedRow(
                  row.original.id === expandedRow ? null : row.original.id
                );
              },
            })}
            muiTableContainerProps={{ sx: { maxHeight: 600 } }}
            muiTableHeadCellProps={{ sx: { backgroundColor: "#f5f5f5" } }}
            muiTablePaginationProps={{
              rowsPerPageOptions: [3, 10, 25],
            }}
          />
        )}
      </TableContainer>

      <Dialog
        open={descriptionPopupOpen}
        onClose={() => setDescriptionPopupOpen(false)}
      >
        <DialogTitle>Book Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDescriptionPopupOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tables />
    </QueryClientProvider>
  );
}
