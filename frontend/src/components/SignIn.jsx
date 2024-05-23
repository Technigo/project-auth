//imports
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form } from "../reusables/Form";
import { Header } from "../reusables/Header";
import { useState } from "react";

//styling
const SignInContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  @media all and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const StyledTitle = styled.h1`
  color: var(--darkgreen);
  font-family: "Abril Fatface", serif;
  font-weight: 400;
  font-size: 1.75em;
  padding-top: 15px;
`;

//component
export const SignIn = () => {
  const [message, setMessage] = useState("");
  const apiEnv = import.meta.env.VITE_API_KEY;

  const handleSignIn = async (name, password) => {
    const response = await fetch(`${apiEnv}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setMessage("Sign-in successful!");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
    } else {
      setMessage("Sign-in failed: Invalid name or password");
    }
  };

  return (
    <SignInContainer>
      <Header />
      <FormWrapper>
        <Form handleSubmit={handleSignIn} />
        {message && <p>{message}</p>}
        <TextContainer>
          <p>Don&#39;t have an account yet?</p>
          <Link to={`/registration`}>
            <StyledTitle>Register here</StyledTitle>
          </Link>
        </TextContainer>
      </FormWrapper>
    </SignInContainer>
  );
};
