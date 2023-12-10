import Logos from "../components/Logos";
import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const storeHandleLogin = userStore((state) => state.handleLogin);

  
  const onLoginClick = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      await storeHandleLogin(username, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      
      if (isLoggedIn) {
        navigate("/home");
      }
      
    } catch (error) {
      
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  
  const text = {
    heading: "Login",
    intro: "Welcome back! Log in to your account.",
    details: "Enter your username and password to access your account.",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    loginButtonText: "Login",
    additionalText: "Don't have an account? ",
    registrationLinkText: "Sign Up",
  };
  

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/" className="app-link">Login</Link>
          </li>
          <li className="app-li">
            <Link to="/register" className="app-link">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <Logos />
      <div className="card-container">
        <h2 className="card-heading">{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.details}</p>
        <div className="user-login">
          <input
            className="card-input"
            type="text"
            placeholder={text.usernamePlaceholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="card-input"
            type="password"
            placeholder={text.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="card-button" onClick={onLoginClick}>
            {text.loginButtonText}
          </button>
        </div>
        {/* Additional text or links */}
        <p>
          {text.additionalText}
          <Link className="card-link" to="/register">
            {text.registrationLinkText}
          </Link>
        </p>
      </div>
    </>
  );
};