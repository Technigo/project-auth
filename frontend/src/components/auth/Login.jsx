import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/config";
import "../../styling/Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Trying to log in with:", username, password);
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/protected");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="authContainer">
      <h1 className="authTitle">Login</h1>
      <form onSubmit={handleSubmit} className="authForm">
        <label className="authLabel">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="textInput"
          />
        </label>
        <label className="authLabel">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="passwordInput"
          />
        </label>
        <button type="submit" className="authButton">
          Login
        </button>
        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
