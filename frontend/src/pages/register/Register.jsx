// Importing necessary dependencies and components from React, React Router, and the application
import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../register/register.module.css";
import { Logo } from "../../components/logo/Logo";

// Define the Register component
export const Register = () => {
  // State variables for managing username, email, and password input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Access the navigate function from React Router
  const navigate = useNavigate();
  // Accessing the handleSignup function from the userStore
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the click event of the signup button
  const onSignupClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter email, username, and password");
      return;
    }

    // Password validation using Regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 6 characters and include lowercase, uppercase, and a number."
      );
      return;
    }

    try {
      console.log("Attempting signup with:", { username, email });
      // Call the handleSignup function from the store
      const signupResult = await storeHandleSignup(username, password, email);

      if (signupResult) {
        console.log("Signup successful!");

        // Check if we have a redirect URL, and navigate there after successful signup
        const searchParams = new URLSearchParams(window.location.search);
        const redirectUrl = searchParams.get('redirect') || '/login';
        console.log("Redirecting to:", decodeURIComponent(redirectUrl));
        navigate(decodeURIComponent(redirectUrl));
      } else {
        // Handle case where signup was not successful
        console.log("Signup was not successful.");
        alert("Signup was not successful. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occur during signup
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <section className={styles.section}>
      <nav className={styles.register}>
        <ul>
          <Link to="/">Back</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.signUp}>
        <h2 className={styles.title}>Sign Up</h2>
        <input
          type="email"
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
        <p className={styles.firstText}>
          Password (must be 6 characters or more, including both uppercase,
          lowercase letters and a number).
        </p>
        <p className={styles.secondText}>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our private policy.
        </p>
        <button onClick={onSignupClick}>Sign Up</button>
      </div>
    </section>
  );
};
