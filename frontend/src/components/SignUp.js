import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { StyledButton } from '../components/StyledBtn'

//maybe add two input fields for password for extra check

const Wrapper = styled.div`
  border: 1px solid #9099A5;
  border-radius: 2px;
  box-shadow: 7px 7px #CAEBF2, 7px 7px 0px 1px #9099A5;
  background-color: white;
  margin: 30px;
  width: 500px;
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

export const SignUp = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ response, setResponse ] = useState('')
  const [ isSuccess, setIsSuccess ] = useState(false)

  const onFormSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/signup', {
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
        if (data.message === 'Invalid request') {
          setResponse('Username already exsist, try again!')
        } else {
          setIsSuccess(true)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setResponse('Something went wrong')
      })
  }

  return (
    <Wrapper>
    <Form>
    <h2>Sign up</h2>
      <label>
        Username
        <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" />
      </label>
      <label>
        Password 
        <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
      </label>
      <StyledButton onClick={onFormSubmit} type="submit">Submit</StyledButton>
    </Form>

    {isSuccess ? (
          <Redirect to ="/login" />
      ) : (
        <p>{response}</p>
      )}
    </Wrapper>
  )
}