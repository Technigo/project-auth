import { useState } from "react";
import axios from "axios";
import "../../styling/Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username,
        password,
      });
      console.log("Registration successfull");
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
