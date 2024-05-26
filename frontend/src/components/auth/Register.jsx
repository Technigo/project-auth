import { useState } from "react";
import axios from "../../api/config";
import { useNavigate } from "react-router-dom";
import "../../styling/Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/protected");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="authContainer">
      <h2 className="authTitle">Register</h2>
      <form onSubmit={handleRegister} className="authForm">
        <label htmlFor="username" className="authLabel">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="textInput"
        />
        <label htmlFor="password" className="authLabel">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="passwordInput"
        />
        <button type="submit" className="authButton">
          Register
        </button>
        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
