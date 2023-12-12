import { useState, useEffect } from "react";

// Getting the backend API URL from environment variables
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Funcitonal component definition for the sign-up page
export const SignUp = () => {
    // State variables for user input (name, username, password)
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the sign-up process
  const handleSignup = async () => {
    try {
      console.log("URL:", `${apiEnv}/signup`);
      console.log("Request Body:", { name, userName: username, password });
        // Making a POST request to the backend signup endpoint
      const response = await fetch(`${apiEnv}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sending user input in the request body
        body: JSON.stringify({ name, userName: username, password }),

      });

      // Checking if the signup was successful (status code 200)
      if (response.ok) {
        alert("Signup was successful, please log in!");
        setName("")
        setUsername("")
        setPassword("")
      } else {
        const data = await response.json();
        console.log(data)
        alert("Signup failed:" + data.message);
      }
    } catch (error) {
        // Handling any errors that occur during the signup process
      alert("Error during registration:", error);
    }
  };


  // Rendering the sign-up form with input fields and a sign-up button
  return (
    <>
      <div className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </>
  );
};
