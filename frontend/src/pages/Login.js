import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form } from 'components/Form'
import { Container } from 'components/Container'
import { H1 } from 'components/TextStyles'
//import { Input } from 'components/Input'
//import { Button } from '../components/Form/Button'
import styled from 'styled-components'

const URL = 'http://localhost:8081/sessions'
//const URL_SIGNUP = 'https://week20-auth-app.herokuapp.com/'

export const Login = props => {  
  const history = useHistory()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [accessToken, setAccessToken] = useState()
  
  const handleLogIn = event => {
    event.preventDefault()
  
    fetch(URL,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      }
      ).then((res) => res.json())
      .then((userData) => {
        console.log(userData)
        history.push('/secret')
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }
  
  //både namn och email? Jag tog bort namn nu. Visst skulle vi göra det?
  return (
    <Container>
      <Form onSubmit={handleLogIn}>
        <H1>Log in fellow seeker!</H1>
        <label>
          <Input
            type='email'
            value={email}
            placeholder="email"
            required
            onChange={event => setEmail(event.target.value)}
            />
         </label>  
        <label>
          <Input
            type='password'
            value={password}
            placeholder="password"
            required
            onChange={event => setPassword(event.target.value)} />
        </label>          
        <Button 
          type="submit" 
          onClick={handleLogIn}>
          Submit
        </Button>
      </Form>
      {errorMessage && <div>{errorMessage}</div>}
    </Container>
  )
}
export const Button = styled.button`
text-decoration: none;
border: solid 1px black;
border-radius: 25px;
color: black;
padding: 15px;
margin-top: 20px;
font-size: 25px;
font-wight: bold;
cursor: pointer;
background-color: blue;
`
export const Input = styled.input `
padding: 5px;
border-radius; 5 px;
margin-bottom: 10px;
cursor: pointer;
background-color: white;
font-size: 30px;
color: black;
`