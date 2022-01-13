import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 25px;
  background-color: #f7e793bf;
  padding: 50px;
  width: 250px;
  border-radius: 15px;
  box-shadow: 6px 6px 12px #f7e793bf, -6px -6px 12px #f7e793bf;
`;

const ModeTitle = styled.h1`
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  border: 3px solid #f7e79380;
  outline: none;
  border-radius: 5px;
  width: 200px;
  height: 25px;
  background-color: #ffffffd9;
  ::placeholder {
    font-style: italic;
    font-family: inherit;
  }
  :focus {
    border: 3px solid #75ceabcc;
  }
`;

export const Button = styled.button`
  border: transparent;
  font-family: inherit;
  width: 150px;
  height: 30px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  background-color: #75ceabe6;
`;

const SignUpInContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const MainContainer = styled.div`
  display: none;
`;

// const StyledRadiobutton = styled.input`
//   &.radio {
//     grid-column: 1;
//     appearance: none;
//     background-color: #fff;
//     margin: 0;
//     font: inherit;
//     color: black;
//     width: 1.5em;
//     height: 1.5em;
//     border: 0.15em solid #3f739b;
//     border-radius: 1em;
//     transform: translateY(-0.05em);
//     display: grid;
//     place-content: center;
//   }
//   &.radio::before {
//     content: "";
//     width: 1em;
//     height: 1em;
//     border-radius: 1em;
//     transform: scale(0);
//     transition: 120ms transform ease-in-out;
//     box-shadow: inset 1em 1em #3f739b;
//   }
//   &.radio:checked::before {
//     transform: scale(1);
//   }
// `;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [mode, setMode] = useState("signin");

  const accessToken = useSelector((store) => store.user.accessToken);
  const mode = useSelector((store) => store.user.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          alert(data.response);
        }
      });
  };

  return (
    <LoginContainer>
      <Link to="/"></Link>
      <Form onSubmit={onFormSubmit}>
        <ModeTitle>{mode === "signup" ? "Create Account" : "Log in"}</ModeTitle>
        <label htmlFor="username">Username:</label>
        <Input
          id="username"
          type="text"
          value={username}
          autoComplete="off"
          placeholder={mode === "signup" && "JaneDoe"}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>

        <label htmlFor="password">Password: </label>
        <Input
          id="password"
          type="password"
          value={password}
          placeholder={mode === "signup" && "Minimum 5 characters"}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>

        <Button
          type="submit"
          disabled={password.length < 5 && mode === "signup"}
        >
          {mode === "signup" ? "Sign Up" : "Log in"}
        </Button>
      </Form>

      <SignUpInContainer>
        <label htmlFor="signin">Sign In</label>
        <input
          id="signin"
          type="radio"
          checked={mode === "signin"}
          onChange={() => dispatch(user.actions.setMode("signin"))}
        />

        <label htmlFor="signup">Sign Up</label>
        <input
          id="signup"
          type="radio"
          checked={mode === "signup"}
          onChange={() => dispatch(user.actions.setMode("signup"))}
        />
      </SignUpInContainer>
    </LoginContainer>
  );
};

export default Login;
