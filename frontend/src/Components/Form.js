import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../Reducers/user";
import {
  StyledForm,
  Label,
  Input,
  H1,
  Wrapper,
  FormParagraph,
  HR,
  SecretParagraph,
  ErrorText,
  SecretText,
} from "styles/Styles";

import { Button } from "./Button";

export const Form = ({ labelHeading, labelText }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = useSelector(store => store.user.login.accessToken);
  const userId = useSelector(store => store.user.login.userId);
  const secretMessage = useSelector(store => store.user.login.secretMessage);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const dispatch = useDispatch();

  const createUser = event => {
    event.preventDefault();
    // const USER_URL = "http://localhost:8080/users";
    const USER_URL = "https://user-authorisation.herokuapp.com/users";

    fetch(USER_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } //eslint-disable-next-line
        throw "Could not create user"; // we want to display error message from backend here
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        localStorage.setItem("accessToken", json.accessToken);
        setUsername("");
        setPassword("");
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };

  const loginUser = event => {
    event.preventDefault();
    // const LOGIN_URL = "http://localhost:8080/sessions";
    const LOGIN_URL = "https://user-authorisation.herokuapp.com/sessions";
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } //eslint-disable-next-line
        throw "Unable to sign in - Please ensure username and password are correct";
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        localStorage.setItem("accessToken", json.accessToken);
        setUsername("");
        setPassword("");
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };

  const revealSecret = event => {
    event.preventDefault();
    // const SECRETS_URL = "http://localhost:8080/secrets";
    const SECRETS_URL = "https://user-authorisation.herokuapp.com/secrets";
    fetch(SECRETS_URL, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } //eslint-disable-next-line
        throw "Could not get information. Make sure you are logged in and try again.";
      })
      .then(json => {
        dispatch(
          user.actions.setSecretMessage({
            secretMessage: JSON.stringify(json.secretMessage),
          })
        );
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };

  const signOut = () => {
    dispatch(user.actions.logOut());
  };

  if (!accessToken) {
    return (
      <Wrapper>
        <H1>Create account</H1>
        <StyledForm>
          <Label>
            {" "}
            {labelHeading}
            <Input
              value={username}
              onChange={event => setUsername(event.target.value)}
              type="text"
              required
            />
          </Label>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <Label>
            {" "}
            {labelText}
            <Input
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              required
            />
          </Label>
          <Button input="Create account" onClickFunction={createUser} />
          <HR />
          <FormParagraph>Already a member?</FormParagraph>
          <Button input="Log in" onClickFunction={loginUser} />
        </StyledForm>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SecretParagraph>User ID: {userId} is logged in.</SecretParagraph>
        <SecretParagraph> Click to reveal secret.</SecretParagraph>
        <Button input="View secret" onClickFunction={revealSecret} />
        <Button input="Sign out" onClickFunction={signOut} />
        {secretMessage && <SecretText>{secretMessage}</SecretText>}
      </Wrapper>
    );
  }
};
