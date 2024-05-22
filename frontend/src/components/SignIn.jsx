import { useState } from "react";
import "./SignIn.css";

export const SignIn = ({ setIsRegistering, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://auth-s0og.onrender.com/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Sign in successful!");
        // You can also save the token to localStorage or context for further authenticated requests
        localStorage.setItem("accessToken", result.accessToken);
        setUser({ id: result.userId, name: result.name });
        setIsLoading(false);
      } else {
        setMessage(result.message || "Sign in failed!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Reset isLoading after form submission is completed
    }
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {isLoading && (
        <div className="loading-container">
          <p>Signing in..</p>
        </div>
      )}
      <p>{message}</p>
      <p>
        Not a registered user?{" "}
        <a
          href="#"
          className="register-link"
          onClick={() => setIsRegistering(true)}
        >
          Register
        </a>
      </p>
      {/* <p>
        {" "}
        Not a registered user?{" "}
        <button className="register-button" onClick={() => setIsRegistering(true)}>Register</button>
      </p> */}
    </div>
  );
};
