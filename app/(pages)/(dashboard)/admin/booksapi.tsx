// utils/api.js
export const fetchUsers = async () => {
  const response = await fetch('http://localhost:3001/users');
  if (!response.ok) {
      throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const updateUserRole = async (id, role) => {
  const response = await fetch(`http://localhost:3001/users/${id}/role`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
  });
  if (!response.ok) {
      throw new Error('Failed to update user role');
  }
  return response.json();
};
