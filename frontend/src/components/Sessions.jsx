import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sessions = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:8080/sessions", {
          credentials: "include", // Include the session cookie in the request to the backend
        });

        if (response.status === 401) navigate("/login"); // Send user back to login page if unauthorized
        if (!response.ok) throw new Error("Failed to fetch sessions", response);

        const sessions = await response.json();
        console.log(sessions);
        setUserData(sessions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessions();
  }, [navigate]);

  if (!userData) {
    // Show loading while Sessions are being fetched
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h2>Your account information</h2>
        <ul>
          <li>ID: {userData.ID} </li>
          <li>Username: {userData.name}</li>
          <li>Access Token:{userData.AccessToken} </li>
        </ul>
      </div>
    </>
  );
};
