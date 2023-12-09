import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopSecretAnimation } from "../TopSecretAnimation";
import styled from "styled-components";

const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

const StyledSecretPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 400px;
    object-fit: cover;
  }

  button {
    margin-top: 20px;
  }
`;

export const SecretPage = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [error, setError] = useState(null); // Set error to null on component mount
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set isLoggedIn to false on component mount
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching the secrets endpoint with the access token
        const response = await fetch(`${apiEnv}/secrets`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("accessToken"), // Send the access token from localStorage
          },
        });
        setLoading(false); // Set loading to false when the request is done
        if (response.status == 200) {
          // Check if the response status is 200 (OK)
          setIsLoggedIn(true); // Set isLoggedIn to true if authorized
        } else {
          // If the response status is not 200 (OK), show an alert and navigate to the start page
          setError("You are not authorized to see this page");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Pass an empty array as second argument to only run the effect on mount

  const handleLogout = () => {
    // Clear the access token from localStorage and navigate to the start page
    localStorage.removeItem("accessToken");
    navigate("/"); // Navigate to the start page
  };

  if (loading) {
    // If loading is true, show a loading message
    return <div>Loading...</div>;
  }

  if (error) {
    // If error is not null, show an error message
    return <div>Error: {error}</div>;
  }

  return (
    <StyledSecretPage>
      <h1>Schhh! This is super duper</h1>
      <TopSecretAnimation />
      <img src="/puppy.jpg" alt="Puppy" />
      {/* If isLoggedIn is true, show a logout button */}
      {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
    </StyledSecretPage>
  );
};
