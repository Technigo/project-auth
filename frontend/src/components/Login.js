import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from 'reducers/user';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  `

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;


export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [mode, setMode] = useState("login")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(store => store.user.accessToken);

  // If the access-token is present, redirects to /secret page.
  useEffect(() => {
    if (accessToken) {
      navigate("/secrets")
    }
  }, [accessToken])

  // Function: On submit, username and password will posted,
  // and the data-response (access-token, id, username, error) is 
  // stored in the global state.
  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    }
    fetch('https://project-auth-d77e5zoeyq-lz.a.run.app/login', options)
      .then((response) => response.json())
      .then((loginData) => {
        if(loginData.success) {
          console.log(loginData)
          dispatch(user.actions.setAccessToken(loginData.response.accessToken))
          dispatch(user.actions.setUsername(loginData.response.username))
          dispatch(user.actions.setUserId(loginData.response.id))
          dispatch(user.actions.setError(null))
        } else {
          // set to null to prevent "leftover" values from prev users
          dispatch(user.actions.setAccessToken(null))
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setUserId(null))
          dispatch(user.actions.setError(loginData.response))
        }
      })
  }  
    return (
      <Wrapper>
          <h2>Log in:</h2>
          <Form onSubmit={onFormSubmit}>
            <Label>
              Username:
              <input 
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              />
            </Label>
            <Label>
              Password:
              <input 
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              />
            </Label>
            <Button type="submit">Submit</Button>
          </Form>
      </Wrapper>
    )
}

// Add a "Not a user? Click here to register" under log in form.