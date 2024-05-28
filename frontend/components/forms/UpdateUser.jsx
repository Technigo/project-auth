import { useState, useEffect } from 'react';


const apiKey = import.meta.env.VITE_API_KEY;
const API = apiKey + "/admin"

export const UpdateUser = ({ getUsers }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Store the initial values
  const [initialName, setInitialName] = useState(name);
  const [initialEmail, setInitialEmail] = useState(email);
  const [initialRole, setInitialRole] = useState(role);
  const [initialPassword, setInitialPassword] = useState(password);

  // Set the initial values when the component mounts
  useEffect(() => {
    setInitialName(name);
    setInitialEmail(email);
    setInitialRole(role);
    setInitialPassword(password);
  }, []);

  const Update = async () => {
    const token = sessionStorage.getItem('token');
    let userData = {};

    // Check if any field has changed
    if (name === initialName && email === initialEmail && role === initialRole && password === initialPassword) {
      setMessage("No changes made to the form, lets try again.😅");
      return; // Stop execution if no fields have changed
    }
    if (name) userData.name = name;
    if (email) userData.email = email;
    if (role) userData.role = role;
    if (password) userData.password = password;
    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({ name, email, role, password }),
      });
      if (response.ok) {
        setMessage("User updated successfully");
getUsers();
      } else
        if (!response.ok) {
          setErrors("An error occurred while updating the user." + response.statusText);
        }

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    //check that at least one field in the form is filled in
    if (!name && !email && !password && !role) {
      errors.general = "At least one field is required for update.";
      setErrors(errors);
      return;
    }
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
      {message && <div>{message}</div>}
    </form>
  );
}