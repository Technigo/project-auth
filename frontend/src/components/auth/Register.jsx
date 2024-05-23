import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://project-auth-ws3k.onrender.com/api/auth/register",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/protected");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registerContainer">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error & <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
