'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers, updateUserRole } from './booksapi';
import {
    MaterialReactTable,
} from 'material-react-table';
import {
    Box,
    CircularProgress,
    Snackbar,
    Typography,
    TableContainer,
    Paper,
} from '@mui/material';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRoleChange = async (id: number, role: string) => {
        try {
            await updateUserRole(id, role);
            setUsers(users.map(user => user.id === id ? { ...user, role } : user));
            setSuccessMessage('Role updated successfully');
        } catch (err) {
            setError('Failed to update role');
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', enableEditing: false, size: 60 },
        { accessorKey: 'username', header: 'Username', enableEditing: false, size: 150 },
        { accessorKey: 'email', header: 'Email', enableEditing: false, size: 200 },
        { accessorKey: 'location', header: 'Location', enableEditing: false, size: 150 },
        { accessorKey: 'phone', header: 'Phone', enableEditing: false, size: 120 },
        {
            accessorKey: 'role',
            header: 'Role',
            size: 120,
            Cell: ({ cell }) => (
                <select
                    value={cell.getValue()}
                    onChange={(e) => handleRoleChange(cell.row.original.id, e.target.value)}
                    style={{ width: '100%' }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                </select>
            ),
        },
    ], [users]);

    if (loading) return <CircularProgress />;
    if (error) return <p>{error}</p>;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Users</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                <MaterialReactTable
                    columns={columns}
                    data={users}
                    enableEditing
                    getRowId={(row) => row.id}
                    initialState={{
                        pagination: { pageSize: 5 },  // Set page size to 5 rows
                        density: 'compact',           // Set density to 'compact'
                    }}
                    muiTableProps={{
                        sx: {
                            '& .MuiTableCell-root': {
                                padding: '8px', // Reduce padding for compact view
                            },
                            '& .MuiTableHead-root': {
                                backgroundColor: '#f5f5f5',
                            },
                        },
                    }}
                    muiTableBodyCellProps={{ sx: { p: 1 } }} // Adjust cell padding for compact view
                    muiTableHeadCellProps={{ sx: { fontWeight: 'bold', p: 1 } }} // Adjust header cell padding
                />
            </TableContainer>
            <Snackbar
                open={!!successMessage}
                onClose={() => setSuccessMessage('')}
                message={successMessage}
                autoHideDuration={3000}
            />
        </Box>
    );
};

export default UsersTable;
