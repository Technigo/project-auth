
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form } from 'components/Form'
import { Container } from 'components/Container'
import { H1 } from 'components/TextStyles'
//import { Input } from 'components/Input'
//import { Button } from '../components/Form/Button'
import styled from 'styled-components'

const URL_SIGNUP = 'http://localhost:8081/sessions'
//const URL_SIGNUP = 'https://week20-auth-app.herokuapp.com/'

export const Login = props => {
  const history = useHistory()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [accessToken, setAccessToken] = useState()

  const handleLogIn = event => {
    event.preventDefault()

    fetch(URL_SIGNUP,
      {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          if (!res.ok) {
            throw 'Could not log in, please try again.'
          }
          return res.json()
        })
        .then((json) => {
          console.log(json)
          history.push('/secret')
        })
  }


  //både namn och email? Jag tog bort namn nu. Visst skulle vi göra det?
  return (
    <Container>
      <Form onSubmit={handleLogIn}>
        <H1>Log in fellow seeker!</H1>
        <label>
          <Input
            type='text'
            value={name}
            placeholder='name'
            onChange={event => setName(event.target.value)}
            required
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
export const Input = styled.input`
padding: 5px;
border-radius; 5 px;
margin-bottom: 10px;
cursor: pointer;
background-color: white;
font-size: 30px;
color: black;
`