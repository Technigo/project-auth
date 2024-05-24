//imports
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form } from "../reusables/Form";
import { Header } from "../reusables/Header";
import { Button } from "../reusables/Button";
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
  @media all and (min-width: 1024px) {
    width: 50%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const StyledTitle = styled.h2`
  color: var(--black);
  font-size: 1.25em;
  padding-top: 15px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 50px;
`;

const SignInTitle = styled.h1`
  color: var(--darkgreen);
  font-family: "Abril Fatface", serif;
  font-weight: 400;
  font-size: 1.75em;
  align-self: center;
`;

//component
export const SignIn = () => {
  const [message, setMessage] = useState("");
  // const apiEnv = import.meta.env.VITE_API_KEY;

  const handleSignIn = async (name, password) => {
    const response = await fetch(
      `https://project-auth-ziup.onrender.com/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      }
    );

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
        <TitleWrapper>
          <SignInTitle>Returning user? </SignInTitle>
          <SignInTitle>Login here. </SignInTitle>
        </TitleWrapper>
        <Form handleSubmit={handleSignIn} />
        <Button>Log in</Button>
        {/* shows error message */}
        {message && <p>{message}</p>}
        <TextContainer>
          <p>Don&#39;t have an account yet?</p>
          <Link to={`/registration`}>
            <StyledTitle>Register here</StyledTitle>
          </Link>
          <Link to={`/`}>
            <StyledTitle>Startpage</StyledTitle>
          </Link>
        </TextContainer>
      </FormWrapper>
    </SignInContainer>
  );
};
