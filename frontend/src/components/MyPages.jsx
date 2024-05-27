import { useEffect, useState } from "react";
import { SignOut } from "./SignOut";

export const MyPages = ({ user, setUser }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPages = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        return;
      }
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

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {user.name}</h1>
      <p>{message}</p>
      <SignOut setUser={setUser} />
    </div>
  );
};
