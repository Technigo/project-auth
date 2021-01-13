import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const App = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [welcome, setWelcome] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(""); // use for authenticated endpoint?
  const [accessToken, setAccessToken] = useState(""); // use for authenticated endpoint? enough with thise one?

  const SIGNUP_URL = "http://localhost:8081/users";
  const LOGIN_URL = "http://localhost:8081/sessions";
  const WELCOME_URL = "http://localhost:8081/welcome"; // use for authenticated endpoint

  const signupUser = (event) => {
    event.preventDefault();
    fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not create user");
        } else {
          return res.json();
        }
      })

      .then((json) => {
        console.log(json.accessToken);
        // setUserId(json.userId);
        // setAccessToken(json.accessToken);
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
          throw new Error("Could not log in user");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        // setUserId(json.userId);
        // setAccessToken(json.accessToken);
        welcomeUser(json.accessToken);
      })
      .catch((err) => alert(err))
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  const welcomeUser = (accessToken) => {
    console.log(accessToken)
    fetch(WELCOME_URL, {
      method: "GET",
      headers: { "Authorization": accessToken },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Could not authenticate user");
      } else {
        return res.json();
      }
    })
    .then((json) => {
      console.log(json)
      setSignup(false);
      setLogin(false);
      setWelcome(true);
    })
    .catch((err) => alert(err))
  };

  return (
    <Container>
      {!signup &&
        !login &&
        !welcome && ( // startpage
          <>
            <Intro>Please join us by creating an account or log in.</Intro>
            <SignupButton onClick={() => setSignup(true)}>
              Create account
            </SignupButton>
            <LoginButton onClick={() => setLogin(true)}>Log in</LoginButton>
          </>
        )}
      {signup &&
        !login &&
        !welcome && ( // sign up page
          <>
            <Intro>You're soon a part of us.</Intro>
            <Form onSubmit={signupUser}>
              <Label>
                Create username
                <SignupInput
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  minLength="5"
                />
              </Label>
              <Label>
                Create password
                <SignupInput
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength="5"
                />
              </Label>
              <FinalSignupButton type="submit">Sign up</FinalSignupButton>
            </Form>
          </>
        )}
      {login &&
        !signup &&
        !welcome && ( // log in page
          <>
            <Intro>Log in to your account</Intro>
            <Form onSubmit={loginUser}>
              <Label>
                Name
                <LoginInput
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  minLength="5"
                />
              </Label>
              <Label>
                Password
                <LoginInput
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength="5"
                />
              </Label>
              <FinalLoginButton type="submit">Log in</FinalLoginButton>
            </Form>
          </>
        )}
      {welcome &&
        !signup &&
        !login && ( // welcome page
          <>
            <Intro>Hi!</Intro>
            <LogoutButton
              onClick={() => {
                setWelcome(false) && setLogin(true) && setAccessToken("");
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

const Intro = styled.p`
  margin-bottom: 80px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #1f4e3f;
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
`;

// Styling Startpage
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 100px 0;
  background: #608578;
`;

const SignupButton = styled.button`
  border: none;
  border-radius: 25px;
  padding: 20px;
  background: #e3e2ff;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
`;

const LoginButton = styled.button`
  margin: 20px;
  padding: 20px;
  border: none;
  border-radius: 25px;
  background: #1a7763;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
`;

// Styling Signup-page

const SignupInput = styled.input`
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  background: #e3e2ff;
`;

const FinalSignupButton = styled.button`
  margin-top: 60px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: #e3e2ff;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  color: #1f4e3f;
`;

// Styling Login-page

const LoginInput = styled.input`
  margin: 5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #1a7763;
`;

const FinalLoginButton = styled.button`
  margin-top: 60px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: #1a7763;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
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
`;
