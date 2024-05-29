import { useState } from "react";
import axiosInstance from "../axiosInstance";
import "../../styling/Auth.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("api/register", {
        username,
        password,
      });

      // Extract token from response
      const { token } = response.data;

      // Store token in local storage
      if (token) {
        localStorage.setItem("token", token);
      }

      console.log("Registration successfull");
      // Check if token is stored
      console.log("Stored token", localStorage.getItem("token"));

      navigate("/protected");
    } catch (error) {
      setError("Username already taken or server error. Please try again.");
      console.error("Registration error", error);
    }
  };

  return (
    <div className="authContainer">
      <h2 className="authTitle">Register</h2>
      <form className="authForm" onSubmit={handleRegister}>
        <label htmlFor="username" className="authLabel">
          Username
        </label>
        <input
          type="text"
          id="username"
          required
          className="textInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="authLabel">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="authButton">
          Register
        </button>
      </form>
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default Register;
