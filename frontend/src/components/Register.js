import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 5px;
  width: 200px;
`;

const SubmitButton = styled.input`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        // Perform any necessary actions after successful registration
      } else {
        const error = await response.json();
        console.error("Registration failed:", error);
        // Handle registration error
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      // Handle any network or other errors
    }
  };

  return (
    <FormContainer>
      <h2>Registration</h2>
      <StyledForm onSubmit={handleSubmit}>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <SubmitButton type="submit" value="Register" />
      </StyledForm>
    </FormContainer>
  );
};
