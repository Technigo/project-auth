import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "reducers/user";

import { API_URL } from "utils/utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [mode, setMode] = useState("register");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/main");
    }
  }, [accessToken]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const userTaken = () => {
    if (username.success === false) {
      return (
        <div>
          <h3>Username Taken</h3>
        </div>
      );
    }
  };

  const wrongPassword = () => {
    if (!accessToken) {
      return (
        <div>
          <h2>password dont match</h2>
        </div>
      );
    }
  };

  const passwordIcon = () => {
    if (!passwordShown) {
      return (
        <>
          <HidePassword>{"\u2600"}</HidePassword>
        </>
      );
    } else {
      return (
        <>
          <ShowPassword>{"\u2601"}</ShowPassword>
        </>
      );
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
          });
        }
      });
  };

  return (
    <MainWrapper>
      <CardWrapper>
        <InputsWrapper>
          <RadioBtns>
            <Register>
              <LabelReg htmlFor="register">Register</LabelReg>
              <input
                type="radio"
                id="register"
                checked={mode === "register"}
                onChange={() => setMode("register")}
              />
            </Register>

            <LoginWrap>
              <LabelLogin htmlFor="login">Login</LabelLogin>
              <input
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}
              />
            </LoginWrap>
          </RadioBtns>

          <LabelUser htmlFor="username">Username</LabelUser>
          <Form onSubmit={onFormSubmit}>
            <UserInput
              type="text"
              id="username"
              minLength={5}
              maxLength={20}
              required={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form>

          <ShowWrapper>
            <LabelPassword htmlFor="password">Password</LabelPassword>
            <ShowPassword onClick={togglePassword}>
              {passwordIcon()}
            </ShowPassword>
          </ShowWrapper>
          <Form>
            <PasswordInput
              type={passwordShown ? "text" : "password"}
              id="password"
              minLength={8}
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form>

          <Form onSubmit={onFormSubmit}>
            <LoginBtn type="submit">Go!</LoginBtn>
          </Form>
        </InputsWrapper>

        <LinkWrapper>
          <LinkHome to="/">Home</LinkHome>
        </LinkWrapper>
      </CardWrapper>

      {/* <div>
        <h2>{wrongPassword()}</h2>
      </div> */}
      {/* <div>
        <h3>{userTaken()}</h3>
      </div> */}
    </MainWrapper>
  );
};

/////////// Styled components

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 60px;
`;

const RadioBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Register = styled.div``;
const LoginWrap = styled.div``;

const ShowWrapper = styled.div`
  display: flex;
  margin: 10px 0 0 0;
  padding: 0;
  /* border: 2px solid red; */
`;
const ShowPassword = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  margin: 2px 0 0 0;
  padding: 0;
`;

const HidePassword = styled(ShowPassword)``;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80vw;
  min-height: 45vh;
  padding: 20px 10px 10px 10px;
  background-color: #fcf9e8;
  border: 1px solid black;
  box-shadow: 5px 5px 0 0 black;
  margin-top: 60px;

  &:hover {
    box-shadow: 5px 5px 0 0 #00936e;
  }

  @media (min-width: 768px) {
    min-width: 45vw;
  }

  @media (min-width: 992px) {
    min-width: 20vw;
  }
`;

const LinkHome = styled(Link)`
  font-family: "League Spartan", sans-serif;
  font-weight: 300;
  text-decoration: none;
  color: black;

  &:active {
    color: black;
  }
`;

const InputsWrapper = styled.div`
  /* margin-top: 20px;
margin-bottom: 30px;
margin-left: 50px; */
  /* border: 1px solid red; */
  width: 60vw;

  @media (min-width: 768px) {
    width: 40vw;
  }

  @media (min-width: 992px) {
    width: 16vw;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const LabelUser = styled.label`
  font-family: "League Spartan", sans-serif;
  font-weight: 700;
  margin: 10px 0 10px 0;
`;

const LabelPassword = styled(LabelUser)`
  margin: 10px 20px 0 0;
  padding: 0;
`;
const LabelReg = styled(LabelUser)`
  margin: 0;
  color: darkgoldenrod;
`;
const LabelLogin = styled(LabelUser)`
  margin: 0;
  color: darkorchid;
`;

const UserInput = styled.input`
  font-family: "League Spartan", sans-serif;
  width: inherit;
  background: none;
  border-top: none;
  border-right: none;
  border-bottom: 1px solid black;
  border-left: none;
  font-size: 20px;
`;

const PasswordInput = styled(UserInput)`
  margin-bottom: 5px;
`;

const LoginBtn = styled.button`
  font-family: "League Spartan", sans-serif;
  width: inherit;
  height: 40px;
  background: none;
  border: none;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        transform: scale(0.95);
      }

      70% {
        transform: scale(1.4);
        color: #e204ab;
      }

      100% {
        transform: scale(0.95);
      }
    }
  }
`;

export default Login;
