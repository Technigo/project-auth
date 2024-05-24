import { useNavigate } from "react-router-dom"
import { Logout } from "./Logout"
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/role";
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${API}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
          return res.json();
        })
        .then((json) => {
          setIsAdmin(json.role === 'admin');
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
  }
    , [token, API]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>This is a page you have to be logged into see!</p>
      
      <Logout />
      {isAdmin ? (
        <button onClick={() => navigate('/admin')}>Log in to admin</button>
      ) : (
        <button onClick={() => navigate('/home')}>Back home</button>
      )}
    </>
  );
}