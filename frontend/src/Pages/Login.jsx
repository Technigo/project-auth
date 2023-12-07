import { Link } from "react-router-dom";
import { userStore } from "../Stores/userStore";
import { useNavigate } from "react-router-dom";

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
      alert("An error occurred during login");
    }
  };

  // Text for UI
  const text = {
    heading: "Login Page",
    intro: "login here...",
    loremIpsum: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  };

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/sessions">Login</Link>
          </li>
          <li className="app-li">
            <Link to="/users">Sign Up</Link>
          </li>
        </ul>
      </nav>
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
