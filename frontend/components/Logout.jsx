
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Logout = () => {
  const [message, setMessage] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/logout";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Retrieve the token from session storage
      const yourToken = sessionStorage.getItem('token');
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`
        },
      });
      const data = await response.json();
      console.log(data);
      // Let's Kon-Mari that token who does not spark joy anymore. it has no purpose and is no longer worthy of our neat session storage
      sessionStorage.removeItem('token');
      setMessage("Logout successful! Please sign in.");
      navigate("/");


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}


