import { useState } from "react";
import { userStore } from "../../store/userStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle the click event of the signup button
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Combined function for handling the signup click event
  const onSignupClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter email, username and password");
      return;
    }

    // Handle password length and special requirement
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 6 characters and include lowercase, uppercase, and a number."
      );
      return;
    }

    try {
      await storeHandleSignup(username, password, email);
      if (username && password) {
        //Once the user has successfully sign up, the user will be directed to the log in page
        navigate("/");
      }
    } catch (error) {
      // Handle any errors that occur during signup
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div>
      <div>
        <h2>Sign up to receive the latest promotion!</h2>
      </div>
      <form className="login-form">
        <label className="username">
          UserName:
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="pw">
          Password:
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label className="email">
          E-mail:
          <input
            type="text"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button onClick={onSignupClick}>Sign up</button>
      </form>
      <h5>Already a user?</h5>
      <Link to="/">HOME</Link>
      <Link to="/signin">LOGIN</Link>
    </div>
  );
};

export default Registration;
