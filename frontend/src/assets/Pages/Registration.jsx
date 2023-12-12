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
  const onSignupClick = async (event) => {
    event.preventDefault();
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
        console.log("Signup successful. Navigating to /home");
        navigate("/home");
      }
    } catch (error) {
      // Handle any errors that occur during signup
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="reg-page">
      <Link to="/">
        <img src="./home-icon.png" alt="home-icon" className="home-icon" />
        <img />
      </Link>
      <div>
        <h2>Sign up to check out the latest Christmas promotion!</h2>
      </div>
      <form>
        <label className="username">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button onClick={onSignupClick} className="sign-up-btn">
          Submit
        </button>
      </form>
      <h5>Already a user?</h5>
      <Link to="/signin">Sign in</Link>
    </div>
  );
};

export default Registration;
