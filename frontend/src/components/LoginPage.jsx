import { useState } from "react";
import { Link } from "react-router-dom";
import { StyledHeading, SmallText, SecretText } from "./StyledText.jsx";
import { StyledButton } from "./StyledButton.jsx";
import { AuthForm, Input } from "./AuthForm.jsx";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [secretMessage, setSecretMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://project-auth-0pi0.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const { accessToken } = await response.json();
        setAccessToken(accessToken);
        setError(null); // Clear any previous errors
        fetchSecret(accessToken);
      } else {
        setError("Invalid email or password"); // Set error message
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to log in. Please try again later."); // Set generic error message
    }
  };

  const fetchSecret = async (accessToken) => {
    try {
      const response = await fetch(
        "https://project-auth-0pi0.onrender.com/secrets",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (response.ok) {
        const { secret } = await response.json();
        setSecretMessage(secret);
      } else {
        console.error("Unauthorized access to secrets");
      }
    } catch (error) {
      console.error("Failed to fetch secret:", error);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    setSecretMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {accessToken ? (
        <>
          <StyledHeading fontWeight="bold">You&apos;re in!</StyledHeading>
          <StyledHeading>
            You&apos;re in! What would you like to do first?
          </StyledHeading>
          <SecretText>{secretMessage}</SecretText>
          <StyledButton onClick={handleLogout}>Logout</StyledButton>
        </>
      ) : (
        <>
          <StyledHeading fontWeight="bold">Welcome Back!</StyledHeading>
          <StyledHeading>Ready to dive in?</StyledHeading>
          <AuthForm onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <StyledButton type="submit">Login</StyledButton>
            {error && <SmallText style={{ color: "red" }}>{error}</SmallText>}
            <SmallText>
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="signup-link"
                style={{ color: "white" }}
              >
                Sign Up Now
              </Link>
            </SmallText>
          </AuthForm>
        </>
      )}
    </div>
  );
};
