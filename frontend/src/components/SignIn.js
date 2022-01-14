import React, { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { user } from "../reducers/user";

import Loading from "./Loading";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid black;
  max-width: 200px;
  margin: 20px auto;
`;

const TextInput = styled.input`
  position: relative;
  display: inline-block;
  margin: 10px;
  padding: 5px 5px;
  text-align: center;
  font-family: inherit;
  font-size: 12px;
  text-decoration: none;
  color: black;
  background: rgba(218, 46, 46, 0);
  transition: ease-out 0.5s;
  border: 2px solid black;
  height: 12px;

  &:active {
    transform: scale(0.9);
  }
`;

const SubmitBtn = styled.input`
  position: relative;
  display: inline-block;
  margin: 10px;
  padding: 5px 5px;
  text-align: center;
  font-family: inherit;
  font-size: 12px;
  text-decoration: none;
  color: black;
  background: rgba(218, 46, 46, 0);
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid black;
  height: 25px;

  &:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 rgba(0, 0, 0, 1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const Button = styled(Link)`
  position: relative;
  display: inline-block;
  margin: 20px 10px;
  padding: 5px 5px;
  text-align: center;
  font-family: inherit;
  font-size: 12px;
  text-decoration: none;
  color: white;
  background: rgba(0, 0, 0, 1);
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid black;
  height: 12px;

  &:hover {
    color: black;
    box-shadow: inset 0 -100px 0 0 rgba(255, 255, 255, 1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const SignIn = (props) => {
  const { nameInput, passwordInput, setNameInput, setPasswordInput } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);
  const loading = useSelector((store) => store.user.loading);

  useEffect(() => {
    if (accessToken) {
      navigate("/signedin");
    }
  }, [accessToken, navigate]);

  const onSignIn = (event) => {
    event.preventDefault();
    dispatch(user.actions.setLoading(true));

    fetch("https://technigo-project-auth.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nameInput,
        password: passwordInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setUsername(data.username));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setError(null));
          });
          setNameInput("");
          setPasswordInput("");
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          alert(data.message);
        }
      })
      .finally(dispatch(user.actions.setLoading(false)));
  };

  return (
    <>
      {loading && <Loading />}
      <Container onSubmit={onSignIn}>
        <h1>Sign in</h1>
        <label htmlFor="nameInput">Username</label>
        <TextInput
          id="nameInput"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <label htmlFor="passwordInput">Password</label>
        <TextInput
          id="passwordInput"
          type="password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        />
        <SubmitBtn type="submit" value="Sign in" />
        <Button to="/">Startpage</Button>
      </Container>
    </>
  );
};

export default SignIn;
