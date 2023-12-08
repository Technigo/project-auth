import Logos from "../components/Logos";
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Register = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  
  const storeHandleSignup = userStore((state) => state.handleSignup);

  
  const onSignupClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter email, username and password");
      return;
    }
    try {
      await storeHandleSignup(username, password, email);
      if (username && password) {
        navigate("/"); 
      }
    } catch (error) {
      
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  console.log(email);
  // Text
  const text = {
    heading: "SignUp Page",
    intro: "Create your account and join us!",
    welcome:
      "Welcome to our community. Sign up to discover amazing features and connect with others.",
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
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.welcome}</p>
        <div className="user-registration">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={onSignupClick}>Sign Up</button>
        </div>
      </div>
    </>
  );
};