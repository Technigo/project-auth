import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 5px;
  width: 200px;
`;

const SubmitButton = styled.input`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/success");
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("https://project-auth-d77e5zoeyq-lz.a.run.app/register", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Registration successful
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setError(null));
          console.log("Registration successful");
        } else {
          // Registration failed
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
          console.log("fail");
        }
      });
  };

  return (
    <FormContainer>
      <h2>Registration</h2>
      <StyledForm onSubmit={onFormSubmit}>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <SubmitButton type="submit" value="Register" />
      </StyledForm>
    </FormContainer>
  );
};
