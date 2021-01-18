import React, { useState } from "react";
import styled from "styled-components";

export const App = () => {
  const [signupPage, setSignupPage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [welcomePage, setWelcomePage] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const SIGNUP_URL = "https://auth-project-annika-caroline.herokuapp.com/users";
  const LOGIN_URL = "https://auth-project-annika-caroline.herokuapp.com/sessions";
  const WELCOME_URL = "https://auth-project-annika-caroline.herokuapp.com/welcome";

  const signupUser = (event) => {
    event.preventDefault();
    setErrorMessage("")
    fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Please try another username."
          );
        } else {
          return res.json();
        }
      })
      .then((json) => {
        welcomeUser(json.accessToken);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  const loginUser = (event) => {
    event.preventDefault();
    setErrorMessage("")
    fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Please try again!");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        welcomeUser(json.accessToken);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
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
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <Container>
      {!signupPage && // startpage, doesn't show any other page
        !loginPage &&
        !welcomePage && (
          <>
            <Intro>Please join us by creating an account or log in.</Intro>
            <Button
              className="signupButton"
              onClick={() => setSignupPage(true)}
            >
              Create account
            </Button>
            <Button className="loginButton" onClick={() => setLoginPage(true)}>
              Log in
            </Button>
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
                <Input
                  required
                  minlength="5"
                  placeholder="Minimum 5 letters"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Label>
              <Label>
                Create password
                <Input
                  className="signupInput"
                  type="password"
                  name="password"
                  required
                  minlength="5"
                  placeholder="Minimum 5 letters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Label>
              <Button className="signupButton" type="submit">
                Sign up
              </Button>
              <ErrorMessage>{errorMessage}</ErrorMessage>
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
                <Input
                  className="loginInput"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  minlength="5"
                />
              </Label>
              <Label>
                Password
                <Input
                  className="loginInput"
                  type="password"
                  name="password"
                  required
                  minlength="5"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Label>
              <Button className="loginButton" type="submit">
                Log in
              </Button>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </Form>
          </>
        )}
      {welcomePage && // shows the welcome page
        !signupPage &&
        !loginPage && (
          <>
            <Intro>{welcomeMessage}</Intro>
            <Button
              className="logoutButton"
              onClick={() => {
                setWelcomePage(false) && setLoginPage(true);
              }}
            >
              Log out
            </Button>
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
  padding: 0 20px;
  font-family: "Karla", sans-serif;
  font-size: 36px;
  font-weight: 400;
  text-align: center;
  color: #188c96;
`;

const ErrorMessage = styled.p`
  font-family: "Karla", sans-serif;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 15px 5px 5px 5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #b5bcff;

  &.signupInput {
    background: #b5bcff;
  }

  &.loginInput {
    background: #188c96;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-family: "Karla", sans-serif;
  font-size: 20px;
  font-weight: 500;
`;

const Button = styled.button`
  margin-top: 60px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  font-family: "Karla", sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;

  &:hover {
    background: #3c4a6b;
  }

  &.signupButton {
    background: #b5bcff;
  }

  &.loginButton,
  &.logoutButton {
    background: #188c96;
  }
`;
