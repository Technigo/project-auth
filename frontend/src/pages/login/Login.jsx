// Importing necessary dependencies and components from React and the application
import { Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import styles from "../login/login.module.css";
import { retrieveCartFromStorage } from "../../stores/cartStore";

// Define the Login component
export const Login = () => {
  // State variables for managing username and password input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Accessing and updating isLoggedIn state from the userStore
  const isLoggedIn = userStore(state => state.isLoggedIn);
  const storeHandleLogin = userStore((state) => state.handleLogin);
  //const storeHandleLogout = userStore((state) => state.handleLogout);
  const cartRetrieved = useRef(false);

  // Redirect logic after login and handling of tempCart
  useEffect(() => {
    if (isLoggedIn && !cartRetrieved.current) {
      const userId = userStore.getState().id;
      retrieveCartFromStorage(userId);
      cartRetrieved.current = true;
      const params = new URLSearchParams(window.location.search);
      const redirectPath = params.get('redirect');
      if (redirectPath) {
        navigate(decodeURIComponent(redirectPath));
      } else {
        navigate(`/profile/${userId}`);
      }
    }
  }, [isLoggedIn, navigate]);

  // handle the login click event
  const onLoginClick = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const redirectPath = params.get('redirect');
      const loginSuccess = await storeHandleLogin(username, password, redirectPath);
      if (loginSuccess) {
        cartRetrieved.current = false; // Reset this flag to ensure cart retrieval happens after login
      }
    } catch (error) {
      alert("An error occurred during login: " + (error.message || JSON.stringify(error)));
    }
  };

  // // Handle the logout click event
  // const onLogoutClick = async () => {
  //   storeHandleLogout();
  //   alert("Log out successfull");
  //   navigate("/");
  // };

  // Handle the sign-up click event
  const signUpClick = async () => {
    // Preserve any query parameters that were passed to the login page
    const searchParams = new URLSearchParams(window.location.search);
    const redirectParam = searchParams.get('redirect');
    console.log('Redirect parameter:', redirectParam);
    if (redirectParam) {
      console.log('Redirecting to register page with redirect parameter:', redirectParam);
      navigate(`/register?redirect=${redirectParam}`);
    } else {
      console.log('Redirecting to register page without redirect parameter');
      navigate("/register");
    }
  };

  return (
    <section className={styles.section}>
      <nav className={styles.login}>
        <ul>
          {/* <Link to="/">Back</Link> */}
          {/* <li type="button" onClick={onLogoutClick}>
            Sign Out
          </li> */}
        </ul>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.loginSection}>
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
        <div className={styles.loginBtw}>
          <button onClick={onLoginClick}>Login</button>
          <button onClick={signUpClick}>Sign Up</button>
        </div>
      </div>
    </section>
  );
};
