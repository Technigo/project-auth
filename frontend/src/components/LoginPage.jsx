import { useState } from "react";
import { StyledHeading, SmallText } from "./StyledText.jsx";
import { StyledButton } from "./StyledButton.jsx";
import { AuthForm, Input } from "./AuthForm.jsx";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div>
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
        <SmallText>
          Don&apos;t have an account?{" "}
          <a
            href="#fffffff;"
            className="signup-link"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Sign Up Now
          </a>
        </SmallText>
      </AuthForm>
    </div>
  );
};
