import React, {useState} from 'react'
import { useHistory } from 'react-router'
import { Container } from '../components/Container'
import { Form} from '../components/Form'
import { H1 } from '../components/TextStyles'

const URL_AUTH = 'http://localhost:8080/users'
//const URL_AUTH = 'https://week20-auth-app.herokuapp.com/'

export const SignUp = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [accessToken, setAccessToken] = useState()
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()

    fetch(URL_AUTH,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password })
      }
    ).then((res) => res.json())
    .then((userData) => {
      console.log(userData)
      history.push('/secret')
    })
  }

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <H1>Sign Up!</H1>
      <input
        type='text'
        value={name}
        placeholder='name'
        onChange={event => setName(event.target.value)}
        requiered
      />
      <input
        type='email'
        value={email}
        placeholder='email'
        onChange={event => setEmail(event.target.value)}
        requiered />
      <input
        type='password'
        value={password}
        placeholder='password'
        onChange={event => setPassword(event.target.value)} reuiered />
      <button onClick={handleSubmit}>Submit</button>
    </Form>
    </Container>
  )
  }
