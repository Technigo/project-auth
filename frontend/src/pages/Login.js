
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form, Input, Button } from 'components/Form'
import { Container } from 'components/Container'
import { H1 } from 'components/TextStyles'

const URL_LOGGIN = 'https://week20-auth-app.herokuapp.com/sessions'

export const Login = props => {
  const history = useHistory()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [failedLogin, setFailedLogin] = useState(false)

  const handleLogIn = event => {
    event.preventDefault()

    fetch(URL_LOGGIN,
      {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          if (!res.ok) {
            throw 'Could not log in, please try again.',
            setFailedLogin(true)
          }
          return res.json()
        })
      .then(({ accessToken }) => {
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
        }
      }).then(() => {
        history.push('/secret')
      })
  }

  return (
    <Container>
      <Form onSubmit={handleLogIn}>
        {!failedLogin && <H1>Log in fellow seeker!</H1>}
        {failedLogin && <H1>Fellow seeker, try again! Something was amiss...</H1>}
          <Input
            type='text'
            value={name}
            placeholder='name'
            required
            onChange={event => setName(event.target.value)}
          />
          <Input
            type='password'
            value={password}
            placeholder='password'
            required
            onChange={event => setPassword(event.target.value)} />
        <Button
          type='submit'
          onClick={handleLogIn}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

