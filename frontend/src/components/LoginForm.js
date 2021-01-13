import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { user } from '../reducers/user'

const URL = 'https://project-auth-cla-ellen.herokuapp.com/sessions'

export const LoginForm = () => {
    
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.login.accessToken);

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

// Om login fungerar
  const handleLoginSuccess = (loginResponse) => {
      dispatch(
          user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
      )
      dispatch(
          user.actions.setUserId({ userId: loginResponse.userId})
      )
      dispatch(
          user.actions.setStatusMessage({ statusMessage: 'Login success!' })
      )
  }

  // Om allt går åt helvete
  const handleLoginFail = (loginError) => {
      dispatch(
          user.actions.setAccessToken({ accessToken: null })
      )
      dispatch(
          user.actions.setStatusMessage({ statusMessage: loginError})
      )
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({name, password}),
      headers: { "Content-Type" : "application/json" }
    })
      .then((res) => {
        if (!res.ok){
            throw 'login ERROR'
            }
            return res.json()
    })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFail(err))
  }
  if (accessToken) {
      return <></>
  }

  // FORMULÄR FÖR SIGN IN 
return (
    <FormContainer>
        <Form>
            <h1>Login!</h1>
            <label>
                Name 
                <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            </label>
            <label>
                password
                <input 
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </label> 
            <button type="submit" onClick={handleLogin}>
                Login
            </button> 
        </Form>
    </FormContainer>

)

}

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  background: pink;
  border: 2px solid black;
  border-radius: 10%;
  height: 350px;
  width: 15%;
  padding: 10px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

