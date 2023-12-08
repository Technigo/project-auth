//import { Link } from "react-router-dom";
import { userStore } from "../Stores/userStore";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../assets/Animation.json";


export const Login = () => {
  const navigate = useNavigate();

  // Access state and actions from userStore
  const { setUsername, setPassword, handleLogin, username, password } =
    userStore((state) => ({
      setUsername: state.setUsername,
      setPassword: state.setPassword,
      handleLogin: state.handleLogin,
      username: state.username,
      password: state.password,
    }));

  // Function to handle the click event of the login button
  const onLoginClick = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      await handleLogin(username, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      if (isLoggedIn) {
        navigate("/home"); // Redirect to home on successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid username or password");
    }
  };

  const handleSignUpClick = () => {
    navigate("/users");
  };

  // Text for UI
  const text = {
    heading: "Login Page",
    intro: "login here...",
    loremIpsum: "Login to see the super secret page!",
  };

  return (
    <>
      <div className="login-content">
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
          <button className="app-li" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
        {/* Lottie Animation */}
        <div style={{ width: 300, height: 300 }}>
          <Lottie animationData={Animation} />
        </div>
      </div>
    </>
  );
};
