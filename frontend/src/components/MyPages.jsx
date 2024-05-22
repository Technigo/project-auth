import { useEffect, useState } from "react";

export const MyPages = ({ user }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPages = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await fetch(
          "https://auth-s0og.onrender.com/my-pages",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
        } else {
          setError("Failed to fetch data. Please log in again");
        }
      } catch (error) {
        setError("An error occurred. Please try again later");
      }
    };
    fetchMyPages();
  }, []);

  {
    error && (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {user.name}</h1>
      <p>{message}</p>
    </div>
  );
};
