// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const apiEnv = "https://project-auth-3.onrender.com"; // Backend API URL
      const url = `${apiEnv}/register`; // Construct the complete URL

      console.log("URL:", url); // Log the constructed URL
      console.log("Request Body:", { email, username, password });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        alert("Signup was successful, please log in!");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        const data = await response.json();
        console.log(data);
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      alert("Error during registration: " + error.message);
    }
  };

  return (
    <div className="signup-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
  );
};

/*
//const apiEnv = import.meta.env.VITE_BACKEND_API;

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  `${apiEnv}
  const handleSignup = async () => {
    try {
      
  

      const apiEnv = "https://project-auth-3.onrender.com"; // Backend API URL

    const url = `${apiEnv}/register`; // Construct the complete URL

    console.log("URL:", url); // Log the constructed URL

      console.log("Request Body:", { email, username, password });

      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        alert("Signup was successful, please log in!");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        const data = await response.json();
        console.log(data);
        alert("Signup failed:" + data.message);
      }
    } catch (error) {
      alert("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
*/
