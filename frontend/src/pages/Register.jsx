import Logos from "../components/Logos";
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Register = () => {
  // TEST
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Initialize the navigate function
  const navigate = useNavigate();

  // Function to handle the click event of the signup button
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Combined function for handling the signup click event
  const onSignupClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter email, username and password");
      return;
    }
    try {
      await storeHandleSignup(username, password, email);
      if (username && password) {
        navigate("/"); // Replace with your desired path
      }
    } catch (error) {
      // Handle any errors that occur during signup
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  console.log(email);
  // Text
  const text = {
    heading: "SignUp Page",
    intro: "signup here...",
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
