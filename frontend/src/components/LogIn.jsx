// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "./UserStore";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
    setAccessToken,
  } = userStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();

        setAccessToken(data.accessToken);

        setUser(data);

        localStorage.setItem("accessToken", data.accessToken);
        setUsername("");
        setPassword("");

        alert("Login successful!");
        navigate("/logged-in");
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      alert("Error during login:", error.message);
    }
  };

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  return (
    <div className="login-form">
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
