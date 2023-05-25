import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";
import styled from "styled-components";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);
    useEffect(() => {
        if(accessToken) {
            navigate("/")
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    console.log(data)
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setUsername(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response))
                    setErrorMessage("Invalid credentials. Please try again.");
                }
            })
    }
    return (
      <>
      
      <Wrapper>
      <FormWrapper>
          <RadioButtonsWrapper>
              <Label>
          <RadioLabel htmlFor="register">Register</RadioLabel>
          <input
            type="radio"
            id="register"
            checked={mode === "register"}
            onChange={() => setMode("register")}
          />
          </Label>
          <Label>
          <RadioLabel htmlFor="login">Login</RadioLabel>
          <input
            type="radio"
            id="login"
            checked={mode === "login"}
            onChange={() => setMode("login")}
          />
          </Label>
          </RadioButtonsWrapper>
          <InputWrapper>
          <Form onSubmit={onFormSubmit}>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button type="submit">SUBMIT</Button>
          </Form>
        </InputWrapper>
      </FormWrapper>
      </Wrapper>
      </>
    );
}

export default Login;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fd;
  color: white;
`

const FormWrapper = styled.div`
width: 40%;
padding: 50px;
background: #F2BA52;
border-radius: 15px;
border: 1px solid black;

&:hover {
    box-shadow: 5px 5px 0 0 black;
  }

@media screen and (max-width: 400px) {
    width: 60%;
}
`

const InputWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
width: 300px;
`

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const RadioLabel = styled.label`
  font-size: 1.5rem;
`;


const RadioButtonsWrapper = styled.div`
text-align: center;
margin-bottom: 20px;
display: flex;
flex-direction: row;
justify-content: center;
color: black;
gap: 4rem;
`

const Input = styled.input`
border-radius: 15px;
padding: 8px;
border: none;
font-size: 13px;
margin-bottom: 1rem;
`

const Button = styled.button`
border-radius: 15px;
padding: 8px;
margin-top: 30px;
background-color: #F2BA52;
color: black;
border: 1px solid black;
font-family: 'Finlandica', sans-serif;
font-size: 1.1rem;

&:hover {
    background-color: white;
    color: black;
    cursor: pointer;
}

@media screen and (min-width: 400px) {
    width: 300px;
}
`

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
  text-align: center;
`;

