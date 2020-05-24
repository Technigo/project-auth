import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form } from '../components/Form'
import { Container } from '../components/Container'
import { H1 } from '../components/TextStyles'

export const Login = () => {  
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [accessToken, setAccessToken] = useState()
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
  }

  //både namn och email?
  return (
    <Container>
      <Form>
        <H1>Log in!</H1>
        <input
          type='text'
          value={name}
          onChange={event => setName(event.target.value)}
          requiered />
        <input
          type='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          requiered />
        <input
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)} reuiered />
        <button onClick={handleSubmit}>Submit</button>
      </Form>
    </Container>
  )
}