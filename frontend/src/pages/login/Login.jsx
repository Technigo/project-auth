import { Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import styles from "../login/login.module.css";
export const Login = () => {
  //can use get method from the userStore
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const storeHandleLogin = userStore((state) => state.handleLogin);
  const storeHandleLogout = userStore((state) => state.handleLogout);
  // handle the login click event
  const onLoginClick = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      await storeHandleLogin(username, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      const id = userStore.getState().id;
      if (isLoggedIn) {
        navigate(`/profile/${id}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
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