import { useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const storeHandleLogin = userStore((state) => state.handleLogin);

  

  const onLoginClick = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      await storeHandleLogin(email, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      if (isLoggedIn) {
        navigate("/authenticated");
      }
    } catch (error) {
      console.error("Login error: " + error);
      alert("An error has occurred.");
    }
  };
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form">
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button onClick={onLoginClick} type="button">
          Sign In
        </button>
      </form>
    </div>
  );
};
