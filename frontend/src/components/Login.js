import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components/macro";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

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
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };
  return (
    <OuterWrapper>
      <InnerWrapper>
        <Greeting>
          Hi and ho! <br/> Please login to send a Christmas greeting!
        </Greeting>
        <RadioButtonContainer>
          <RadioWrapper>
            <RadioInput
              type="radio"
              id="register"
              checked={mode === "register"}
              onChange={() => setMode("register")}
            />
            <label htmlFor="register">Register</label>
          </RadioWrapper>
          <RadioWrapper>
            <RadioInput
              type="radio"
              id="login"
              checked={mode === "login"}
              onChange={() => setMode("login")}
            />
            <label htmlFor="login">Login</label>
          </RadioWrapper>
        </RadioButtonContainer>

        <FormContainer onSubmit={onFormSubmit}>
          <label htmlFor="username">Username</label>
          <TextInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <TextInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </FormContainer>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default Login;

const OuterWrapper = styled.div`
  width: 100vw;
  display:flex;
  align-items: center;
  min-height: 100vh;
`;
const InnerWrapper = styled.div`
  margin: auto;
  width: 60vw;
  background: white;
  max-width: 700px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.3), 0 5px 15px rgba(0, 0, 0, 0.5);
  height: fit-content;
  border-radius: 50%;
  padding: 2em;
  background-color: var(--yellow);
  display: flex;
  flex-direction: column;
  align-items: center;

`;
const Greeting = styled.h2`
  margin: 3rem;
`;

const RadioButtonContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 1rem 0;
width:10rem;
`;

const RadioWrapper = styled.div`
width:fit-content;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
 
  
`;

const Button = styled.button`
margin: 20px auto;
max-width: 400px;
background-color: var(--green);
border-radius: 1rem;
padding:0.5rem 1rem;
font-family: 'Mountains of Christmas', cursive;
font-size: 16px;
cursor: pointer;
border: none;
box-shadow: 0.2rem 0.2rem 0.5rem;
letter-spacing: 1px;
`;

const TextInput = styled.input`
width:100%;
`
const RadioInput = styled.input`
margin-right: 0.5rem;
accent-color: (var(--red)) !important;
grid-column-start: 1;

  
`