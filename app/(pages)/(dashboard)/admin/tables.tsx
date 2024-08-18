'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { fetchUsers, updateUserRole } from './booksapi';
import {
    MaterialReactTable,
    MRT_Cell,
    MRT_Row,
} from 'material-react-table';
import {
    Box,
    CircularProgress,
    Snackbar,
    Typography,
    TableContainer,
    Paper,
} from '@mui/material';

interface User {
    id: number;
    username: string;
    email: string;
    location: string;
    phone: string;
    role: string;
}

const UsersTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

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

    const handleRoleChange = useCallback(async (id: number, role: string) => {
        try {
            await updateUserRole(id, role);
            setUsers(users.map(user => user.id === id ? { ...user, role } : user));
            setSuccessMessage('Role updated successfully');
        } catch (err) {
            setError('Failed to update role');
        }
    }, [users]);

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
            Cell: ({ cell, row }: { cell: MRT_Cell<User>; row: MRT_Row<User> }) => (
                <select
                    value={cell.getValue<string>()}
                    onChange={(e) => handleRoleChange(row.original.id, e.target.value)}
                    style={{ width: '100%' }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                </select>
            ),
        },
    ], [handleRoleChange]);

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
                    getRowId={(row) => row.id.toString()} // Ensure row.id is a string
                    initialState={{
                        // pagination: { pageSize: 5 },  // Set page size to 5 rows
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
