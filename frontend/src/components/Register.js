import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from './utils/constants';
import user from './reducers/user';
import { FormSection } from "./GlobalStyles";
import styled from "styled-components";



export const Register = () => {
    const [ username, setUsername] = useState("")
    const [ password, setPassword ] = useState("")
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    useEffect( () => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken])

//POST request for sign in and sign up
  const onFormSubmit =(event) => {
  event.preventDefault();
  
  fetch(API_URL(mode), options)
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password })
  }
  // fetch(API_URL(mode), options)
      .then(response => response.json())
      .then(data => {
          if(data.success) {
              batch(()=> {
                  dispatch(user.actions.setUsername(data.response.username));
                  dispatch(user.actions.setUserId(data.response.id))
                  dispatch(user.actions.setAccessToken(data.response.accessToken));
                  dispatch(user.actions.setError(null));
              });
          } else {
              batch (() => {
                  dispatch(user.actions.setUsername(null));
                  dispatch(user.actions.setUserId(null))
                  dispatch(user.actions.setAccessToken(null));
                  dispatch(user.actions.setError(data.response));
              });
          }
      })
}
    return (
      <FormSection>
        <PageHeader>Register</PageHeader>
        <Form onSubmit={onFormSubmit}>
            <Input 
            id='username' 
            type="text" 
            value={username}
            placeholder="Choose username"
            minLength="2"
            maxLength="20"
            onChange={(e) => setUsername(e.target.value)}/>
            <Input 
            id="password"
            type="password" 
            value={password}
            minLength="5"
            placeholder="Choose password"
            onChange={(e) => setPassword(e.target.value)}/>
        </Form>
        <Button type="submit">Create account</Button>
         
        <Text>Already a user?</Text>
        <ButtonLink to="/login">Log in</ButtonLink>   
    </FormSection>
    )
}
export const Text = styled.p`
font-weight: 600;

@media (min-width: 800px) {
    font-size:20px;
}`


export const Form = styled.form`
  display: flex;
  flex-direction: column;
`
export const ButtonLink = styled(Link)`
 color: black;
 transition: ease-out 0.2s;
 cursor: pointer;
 font-size: 15px;
 text-decoration: none;
 padding: 10px 15px;
 border-radius: 5px;
 box-shadow: 0px 0px 7px 0px #888888;
 background-color: #ECB390;

&:hover {
    transform: scale(1.1);
  }

  @media (min-width: 800px) {
    margin-bottom: 20px;
    font-size:17px;
  }
` 
export const Input = styled.input`
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
  transition: ease-out 0.2s;
  border: 1px solid black;
  min-width: 50vw;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 800px) {
  min-width: 30vw;
  padding: 7px;
  }
`
export const Button = styled.button`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  border: 0px;
  transition: ease-out 0.2s;
  background-color: #ECB390;
  border-radius: 5px;
  box-shadow: 0px 0px 7px 0px #888888;
  font-size: 15px;
  font-weight: 400;

&:hover {
    transform: scale(1.05);
  }

  @media (min-width: 800px) {
    margin: 30px;
    font-size:17px;
  }
`
export const PageHeader = styled.h1`
    font-size: 25px;
    margin: 20px;

  @media (min-width: 800px) {
    font-size: 30px;
  }
`