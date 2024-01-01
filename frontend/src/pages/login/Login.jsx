import { Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import styles from "../login/login.module.css";
import { retrieveCartFromStorage } from "../../stores/cartStore";

export const Login = () => {
  //can use get method from the userStore
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = userStore(state => state.isLoggedIn);
  const storeHandleLogin = userStore((state) => state.handleLogin);
  const storeHandleLogout = userStore((state) => state.handleLogout);
  const cartRetrieved = useRef(false);

  // Redirect logic after login and handling of tempCart
  useEffect(() => {
    if (isLoggedIn && !cartRetrieved.current) {
      const userId = userStore.getState().id; // Get the user ID from the store
      retrieveCartFromStorage(userId); // Retrieve and update the cart from local storage
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



  const onLogoutClick = async () => {
    storeHandleLogout();
    alert("Log out successfull");
    navigate("/");
  };

  const signUpClick = async () => {
    navigate("/register");
  };
  return (
    <section className={styles.section}>
      <nav className={styles.login}>
        <ul>
          <Link to="/">Back</Link>
          <li type="button" onClick={onLogoutClick}>
            Sign Out
          </li>
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
