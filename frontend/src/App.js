import React, { useState } from "react";
import styled from "styled-components";

export const App = () => {
  const [signupPage, setSignupPage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [welcomePage, setWelcomePage] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const SIGNUP_URL = "http://localhost:8081/users";
  const LOGIN_URL = "http://localhost:8081/sessions";
  const WELCOME_URL = "http://localhost:8081/welcome";

  const signupUser = (event) => {
    event.preventDefault();
    fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Could not create account. Please try another username."
          );
        } else {
          return res.json();
        }
      })
      .then((json) => {
        welcomeUser(json.accessToken);
      })
      .catch((err) => alert(err))
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  const loginUser = (event) => {
    event.preventDefault();
    fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not log in. Please try again!");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        welcomeUser(json.accessToken);
      })
      .catch((err) => alert(err))
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  const welcomeUser = (accessToken) => {
    fetch(WELCOME_URL, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not find your account.");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        setSignupPage(false);
        setLoginPage(false);
        setWelcomePage(true);
        setWelcomeMessage(json.welcomeMessage);
      })
      .catch((err) => alert(err));
  };

  return (
    <Container>
      {!signupPage && // startpage, doesn't show any other page
        !loginPage &&
        !welcomePage && (
          <>
            <Intro>Please join us by creating an account or log in.</Intro>
            <SignupButton onClick={() => setSignupPage(true)}>
              Create account
            </SignupButton>
            <LoginButton onClick={() => setLoginPage(true)}>Log in</LoginButton>
          </>
        )}
      {signupPage && // shows the sign up page
        !loginPage &&
        !welcomePage && (
          <>
            <Intro>You're soon a part of us.</Intro>
            <Form onSubmit={signupUser}>
              <Label>
                Create username
                <SignupInput
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Minimum 5 letters"
                />
              </Label>
              <Label>
                Create password
                <SignupInput
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 5 letters"
                />
              </Label>
              <FinalSignupButton type="submit">Sign up</FinalSignupButton>
            </Form>
          </>
        )}
      {loginPage && // shows the log in page
        !signupPage &&
        !welcomePage && (
          <>
            <Intro>Log in to your account</Intro>
            <Form onSubmit={loginUser}>
              <Label>
                Name
                <LoginInput
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Label>
              <Label>
                Password
                <LoginInput
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Label>
              <FinalLoginButton type="submit">Log in</FinalLoginButton>
            </Form>
          </>
        )}
      {welcomePage && // shows the welcome page
        !signupPage &&
        !loginPage && (
          <>
            <Intro>{welcomeMessage}</Intro>
            <LogoutButton
              onClick={() => {
                setWelcomePage(false) && setLoginPage(true);
              }}
            >
              Log out
            </LogoutButton>
          </>
        )}
    </Container>
  );
};

// General styling

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 100px 0;
  background: #105c63;
`;

const Intro = styled.p`
  margin-bottom: 80px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #188c96;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

// Styling Start-page

const SignupButton = styled.button`
  border: none;
  border-radius: 25px;
  padding: 20px;
  background: #b5bcff;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: #3c4a6b;
  }
`;

const LoginButton = styled.button`
  margin: 20px;
  padding: 20px;
  border: none;
  border-radius: 25px;
  background: #188c96;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: #3c4a6b;
  }
`;

// Styling Signup-page

const SignupInput = styled.input`
  margin: 15px 5px 5px 5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #b5bcff;
`;

const FinalSignupButton = styled.button`
  margin-top: 60px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: #b5bcff;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;

  &:hover {
    background: #3c4a6b;
  }
`;

// Styling Login-page

const LoginInput = styled.input`
  margin: 15px 5px 5px 5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #188c96;
`;

const FinalLoginButton = styled.button`
  margin-top: 60px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: #188c96;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: #3c4a6b;
  }
`;

// Styling Welcome-page

const LogoutButton = styled.button`
  margin-top: 60px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: #1a7763;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: #3c4a6b;
  }
`;
