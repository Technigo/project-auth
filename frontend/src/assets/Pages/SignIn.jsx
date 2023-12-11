import { Link } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const storeHandleLogin = userStore((state) => state.handleLogin);
  const onLoginClick = async () => {
    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }
    try {
      //Attempt to log in
      await storeHandleLogin(username, password);
      //Check if login was successful
      const isLoggedIn = userStore.getState().isLoggedIn;
      console.log("Before navigate");
      //If login is successful
      if (isLoggedIn) {
        console.log("Navigating to /home");
        navigate("/home");
      } else {
        setErrorMessage("Incorrect username or password. Please try again.");
      }
      // Additional logic after successful login can be added here
    } catch (error) {
      // Handle any errors that occur during login
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div>
      <form className="login-form">
        <h1>Login to Your Account</h1>
        <label className="username">
          UserName:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="pw">
          Password:
          <input
            type="password"
            placeholder="Password"
            name={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={onLoginClick}>Sign In</button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <h5>Haven't sign up as a member yet?</h5>
        <Link to="/">HOME</Link>
        <Link to="/register">Sign up</Link>
      </form>
    </div>
  );
};

export default SignIn;
