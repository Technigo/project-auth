import "../../styling/Auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("Login successfull");
      navigate("/protected");
    } catch (error) {
      setError("Invalid credentials. Please try again");
      console.error("Login error", error);
    }
  };

  return (
    <div className="authContainer">
      <h1 className="authTitle">Login</h1>
      <form className="authForm" onSubmit={handleLogin}>
        <label className="authLabel">
          Username:
          <input
            type="text"
            required
            className="textInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="authLabel">
          Password:
          <input
            type="password"
            required
            className="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="authButton">
          Login
        </button>
      </form>
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default Login;
