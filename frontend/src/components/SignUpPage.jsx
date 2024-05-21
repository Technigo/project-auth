import { useState } from "react";
import { StyledHeading, SmallText } from "./StyledText.jsx";
import { StyledButton } from "./StyledButton.jsx";
import { AuthForm, Input } from "./AuthForm.jsx";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <div>
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
        <SmallText>
          Already have an account?{" "}
          <a
            href="#fffffff;"
            className="signup-link"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Login Now
          </a>
        </SmallText>
      </AuthForm>
    </div>
  );
};
