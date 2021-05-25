import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { StyledButton } from '../components/StyledBtn'

const Wrapper = styled.div`
  border: 1px solid #9099A5;
  border-radius: 2px;
  box-shadow: 7px 7px #CAEBF2, 7px 7px 0px 1px #9099A5;
  background-color: white;
  margin: 30px;
  width: 500px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  margin: 7px;
`

export const LogIn = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ response, setResponse ] = useState('')
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  
  const onLogIn = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'User not found') {
          setResponse('User not found')
          setUsername('')
          setPassword('')
        } else {
          setIsLoggedIn(true)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setUsername('')
        setPassword('')
      })
  }

  return (
    <Wrapper>
      <Form>
        <h2>Log In</h2>
        <label>
          Username
          <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" />
        </label>
        <label>
          Password
          <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
        </label>
        <StyledButton onClick={onLogIn} type="submit">Log in</StyledButton>
      </Form>
      {isLoggedIn ? (
        <Redirect to ="/content" />
      ) : (
          <p>{response}</p>

      )}
    </Wrapper>
  )
}