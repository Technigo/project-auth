import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userStore } from "../Stores/userStore";

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
      await storeHandleSignup(username, password, email, navigate);
      if (username && password) {
        navigate("/home"); //replace with your path
      }
    } catch (err) {
      // handle any errors that occur during signup
      console.error("Signup error:", err);
      alert("An error occurred during signup");
    }
  };

  console.log(email);
  const text = {
    heading: "SignUp Page",
    intro: "signup here...",
    loremIpsum: "Lorem ipsum dolor sit amet",
  };

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/sessions">Login</Link>
          </li>
          <li className="app-li">
            <Link to="/sessions">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.loremIpsum}</p>

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
