import { useState } from "react";

export const DeleteUser = ({ getUsers }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/admin";
  const token = sessionStorage.getItem('token');
  const [message, setMessage] = useState(""); // Move this line inside the DeleteUser component

  const Delete = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    try {
      await fetch(`${API}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      setMessage('User deleted successfully');
      getUsers();
    }
    catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred.');
    }
  }
  return (
    <form onSubmit={Delete}>
      <label>Delete user</label>
      <label>ID</label>
      <input type="text" name="id" />
      <button type="submit">Delete user</button>
      {message && <p>{message}</p>}
    </form>
  );
};
