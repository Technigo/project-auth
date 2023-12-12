/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storeHandleLogin = userStore((state) => state.handleLogin);

  const onLoginClick = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }
    try {
      setLoading(true);
      //Attempt to log in
      await storeHandleLogin(username, password);
      //Check if login was successful
      const isLoggedIn = userStore.getState().isLoggedIn;
      console.log("Before navigate");
      //If login is successful
      if (isLoggedIn) {
        navigate("/items");
      } else {
        setErrorMessage("Incorrect username or password. Please try again.");
      }
      // Additional logic after successful login can be added here
    } catch (error) {
      // Handle any errors that occur during login
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setLoading(false); // Set loading back to false, regardless of login success or failure
    }
  };

  return (
    <div className="login-page">
      <Link to="/">
        <img src="./home-icon.png" alt="home-icon" className="home-icon" />
        <img />
      </Link>

      <form onSubmit={onLoginClick}>
        <h1 className="login-title">Login to Your Account</h1>
        <label className="username">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="pw">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading} className="signin-btn">
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <h5 className="login-memeber">Haven't sign up as a member yet?</h5>

        <Link to="/register">Sign up</Link>
      </form>
    </div>
  );
};

export default SignIn;
