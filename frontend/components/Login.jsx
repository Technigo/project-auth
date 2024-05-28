import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/login";

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(API, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },

    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to log in. Please try again.");
        }
        return res.json();
      })
      .then((json) => {
        setMessage("Login successful!");
        navigate("/dashboard");
        // Store the token in session storage
        sessionStorage.setItem('token', json.accessToken);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  return (

    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Login</button>
      </form>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
    </div>
  )
};