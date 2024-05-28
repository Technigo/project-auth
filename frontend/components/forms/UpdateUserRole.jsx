import { useState } from 'react';

export const UpdateUserRole = ({ getUsers }) => {
  const [id, setId] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/admin";



  const updateRole = async (e) => {
    const token = sessionStorage.getItem('token');
    e.preventDefault();
    const id = e.target.id.value;
    const role = e.target.role.value;

    if (!id || !role) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessage('User role updated successfully');
      getUsers();

    } catch (error) {
      setMessage('An error occurred while updating the user role');
    }
  };
  return (
    <form onSubmit={updateRole}>
      <label>Update user role</label>
      <label>ID</label>
      <input type="text" name="id" value={id} onChange={(e) => setId(e.target.value.trim())} />
      <label>Role</label>
      <select name="role" value={role} onChange={e => setRole(e.target.value)}>
        <option value="user" disabled>User</option>
        <option value="writer">Writer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Update role</button>
      {message && <p>{message}</p>}
    </form>
  );
};