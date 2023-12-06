import Logos from "../components/Logos";
import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle the click event of the login button
  const storeHandleLogin = userStore((state) => state.handleLogin);

  // Combined function for handling the login click event
  const onLoginClick = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      await storeHandleLogin(username, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      //console.log(storeIsLoggedIn);
      if (isLoggedIn) {
        navigate("/home");
      }
      // Additional logic after successful login can be added here
    } catch (error) {
      // Handle any errors that occur during login
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  // Text
  const text = {
    heading: "Login Page",
    intro: "login here...",
    loremIpsum:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
  };

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/">Login</Link>
          </li>
          <li className="app-li">
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <Logos />
      <div>
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.loremIpsum}</p>
        <div className="user-login">
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
          <button onClick={onLoginClick}>Login</button>
        </div>
      </div>
    </>
  );
};
