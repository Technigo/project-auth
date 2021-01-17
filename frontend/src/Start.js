import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "user";
import Profile from "Profile";
import {
  Header,
  Headline,
  SubHeadline,
  FormContainer,
  Button,
  MainContainer,
  Label,
  Paragraph,
  InputField,
  StatusMessage,
} from "./Styling/StyledComponents";

const USER_URL = "http://localhost:8080/users";
const LOGIN_URL = "http://localhost:8080/sessions";

// const USER_URL = "https://project-auth-joel-cornelia.herokuapp.com/users";
// const LOGIN_URL = "https://project-auth-joel-cornelia.herokuapp.com/sessions";

const Start = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState({});
  const [success, setSuccess] = useState();

  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: "Login Success!" })
    );
  };

  const handleLoginFail = (loginError) => {
    dispatch(user.actions.setAccessToken({ accesToken: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    fetch(USER_URL, {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setSignupMessage(json);
        setSuccess(json.success);
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        setSignupMessage("new error");
        setSuccess(error.success);
        console.log(error);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw "Login failed";
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        handleLoginSuccess(json);
        setSuccess(json.success);
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        handleLoginFail(error);
        console.log(error);
      });
  };
  if (!accessToken) {
    return (
      <>
        <MainContainer>
          <Header>
            <Headline>Welcome</Headline>
            <SubHeadline>Sign up/Log in</SubHeadline>
          </Header>
          <FormContainer>
            <Label>
              <Paragraph>Username:</Paragraph>
              <InputField
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
              />
            </Label>
            <Label>
              <Paragraph>Password:</Paragraph>
              <InputField
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </Label>
            <Button type="submit" onClick={handleSignUp}>
              Sign up
            </Button>
            <Button type="submit" onClick={handleLogin}>
              Log in
            </Button>
          </FormContainer>
          <div>
            {signupMessage && (
              <StatusMessage success={success}>
                {signupMessage.message}
              </StatusMessage>
            )}
          </div>
          <div>
            {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
          </div>
        </MainContainer>
      </>
    );
  } else {
    return <Profile />;
  }
};

export default Start;
