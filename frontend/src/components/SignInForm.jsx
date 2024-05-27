import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  // State to manage user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle sign in

  const handleSignIn = async (event) => {
    event.preventDefault();

    // POST request to autheticate the user
    try {
      const response = await fetch(
        "https://project-auth-irev.onrender.com/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      //If authetication ok, call onLogin and redirect to logged in page
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        navigate("/loggedin");
      } else {
        // If login fails, update error state
        const errorData = await response.json();
        setError(`Login failed: ${errorData.error}`);

        if (
          response.status === 401 &&
          errorData.error === "Invalid email or password, please try again"
        ) {
          //Error message if user writes wrong email or password
          setError("Invalid email or password, please try again");
        } else {
          // Display general error message
          setError(`Login failed: ${errorData.error}`);
        }
      }
    } catch (error) {
      // If unexpected error
      setError(`Error during login: ${error.message}`);
    }
  };

  return (
    <>
      <form>
        <h3>Sign in here:</h3>

        <label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email here"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSignIn}>
          SIGN IN
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
