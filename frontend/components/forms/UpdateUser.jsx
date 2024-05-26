import { useState } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;
const API = apiKey + "/admin"
const token = sessionStorage.getItem('token');

export const UpdateUser = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const Update = async () => {
    console.log('Token:', token); // Log the token
    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, role, password }),
      });
      if (!response.ok) {
        console.log('Response status:', response.status); // Log the response status
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!id) errors.id = "ID is required.";
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (!role) errors.role = "Role is required.";
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      // If no errors, celebrate and send the data to the server
      Update();
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>Update user</label>
      <label>ID</label>
      <input type="text" name="id" onChange={e => setId(e.target.value.trim())} />
      {errors.id && <p>{errors.id}</p>}
      <label>Name</label>
      <input type="text" name="name" onChange={e => setName(e.target.value.trim())} />
      {errors.name && <p>{errors.name}</p>}
      <label>Email</label>
      <input type="text" name="email" onChange={e => setEmail(e.target.value.trim())} />
      {errors.email && <p>{errors.email}</p>}
      <label>Role</label>

      <select name="role" value={role} onChange={e => setRole(e.target.value)}>
        <option value="user" disabled>User</option>
        <option value="writer">Writer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      {errors.role && <p>{errors.role}</p>}
      <label>Password</label>
      <input type="password" name="password" onChange={e => setPassword(e.target.value.trim())} />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Update user</button>
    </form>
  );
}