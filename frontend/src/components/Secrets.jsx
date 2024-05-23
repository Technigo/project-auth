import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Secrets = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await fetch("http://localhost:8080/secrets", {
          credentials: "include", // Include the session cookie in the request to the backend
        });

        if (response.status === 401) navigate("/login"); // Send user back to login page if unauthorized
        if (!response.ok) throw new Error("Failed to fetch secrets", response);

        const secrets = await response.json();
        console.log(secrets);
        setUserData(secrets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSecrets();
  }, [navigate]);

  if (!userData) {
    // Show loading while secrets are being fetched
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
