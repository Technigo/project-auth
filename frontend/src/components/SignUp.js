import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

export const StyledButton = styled.button`
  width: 200px;
  font-size: 16px;
  color: #6A7885;
  height: 50px;
  margin-bottom: 20px;
  background-color: #CAEBF2;
  border: 1px solid #9099A5;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 7px 7px white, 7px 7px 0px 1px #9099A5;
  &:hover {
    background-color: rgb(203,200,254);
  }
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
    <>
    
    <form>
    <h2>Sign Up</h2>
      <label>
        Username
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
      </label>
      <label>
        Password
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </label>
      <StyledButton onClick={onFormSubmit} type="submit">Submit</StyledButton>
    </form>

    {isSuccess ? (
        <Redirect to ="/login" />
      ) : (
        <p>{response}</p>
      )}
    </>
  )
}