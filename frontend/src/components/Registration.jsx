import "./Registration.css";
import { userStore } from "../store/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Initialize the navigate function
  const navigate = useNavigate();

  // Function to handle the click event of the signup button
  const storeHandleSignup = userStore((state) => state.handleSignup);

  const storeHandleLogin = userStore((state) => state.handleLogin);

  // Combined function for handling the signup click event
  const onSignupClick = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert("Please enter email, username and password");
      return;
    }
    try {
      console.log(email, username, password);
      await storeHandleSignup(email, username, password);
      if (email && password) {
        alert("Registration successful!");
        await storeHandleLogin(email, password);
        const isLoggedIn = userStore.getState().isLoggedIn;
        if (isLoggedIn) {
          console.log("You are now logged in.");
          navigate("/authenticated");
        }
      }
    } catch (error) {
      // Handle any errors that occur during signup
      console.error("Signup error:", error);
      console.log(error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form className="registration-form">
        <label htmlFor="email">
          Email:{" "}
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="username">
          Username:{" "}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button onClick={onSignupClick}>Register</button>
      </form>
    </div>
  );
};
