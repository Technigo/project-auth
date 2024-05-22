import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledHeading, SmallText } from "./StyledText.jsx";
import { StyledButton } from "./StyledButton.jsx";
import { AuthForm, Input } from "./AuthForm.jsx";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://project-auth-0pi0.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Failed to create account. Please try again later.");
    }
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
      <StyledHeading fontWeight="bold">Create Account</StyledHeading>
      <StyledHeading>to get started now!</StyledHeading>
      <AuthForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <StyledButton type="submit">Sign Up</StyledButton>
        {error && <SmallText style={{ color: "red" }}>{error}</SmallText>}
        <SmallText>
          Already have an account?{" "}
          <Link to="/login" className="login-link" style={{ color: "white" }}>
            Login Now
          </Link>
        </SmallText>
      </AuthForm>
    </div>
  );
};
