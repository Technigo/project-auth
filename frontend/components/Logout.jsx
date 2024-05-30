
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
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`
        },
      });
      // Let's Kon-Mari that token who does not spark joy anymore. it has no purpose and is no longer worthy of our neat session storage
      sessionStorage.removeItem('token');
      setMessage("Logout successful! Please sign in.");
      navigate("/");

    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{message}</p>
    </div>
  );
}


