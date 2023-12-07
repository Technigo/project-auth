import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

console.log(apiEnv);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormFields = styled.div``;

const Buttons = styled.div``;

export const StartPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data); // Handle the success response
      localStorage.setItem("accessToken", data.response.accessToken);
      alert("You have successfully registered!");
      // Navigate to a new route after successful registration
      navigate("/secrets");
    } catch (error) {
      console.error(error); // Handle the error response
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data); // Handle the success response
      localStorage.setItem("accessToken", data.response.accessToken);
      // Navigate to a new route after successful login
      navigate("/secrets");
    } catch (error) {
      console.error(error); // Handle the error response
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Register or sign in to get access to some secret stuff</h2>
      <StyledForm>
        <FormFields>
          <input
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </FormFields>
        <FormFields>
          <input
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </FormFields>
      </StyledForm>
      <Buttons>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Log in</button>
      </Buttons>
    </div>
  );
};
