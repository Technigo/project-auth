import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Link, useHistory } from 'react-router-dom'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
    a {
      text-decoration: none;
    }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
    label {
      margin: 10px;
      color:  #254b62;
    }
    input {
      width: 100%;
      height: 20px;
      border-radius: 6px;
    }
`

const Header = styled.h1`
  color:  #254b62;
  text-shadow: 2px 2px #cff532;
  font-size: 40px;
  margin-top: 40px;
`

const Text = styled.h2`
  color:  #254b62;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 1px;
`

export const Login = () => {
  const [signInValues, setSignInValues] = useState({
    email: '',
    password: ''
  })
  const history = useHistory()
  const [error, setError] = useState('')
  const url = 'https://anna-project-auth.herokuapp.com/sessions'

  // Posts email and password to the api
  const handleLogin = event => {
    event.preventDefault()
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(signInValues),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not find your user.')
        }
        res.json().then(data => {
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
            history.push('/MemberPage')
             
          }
        })
      })
      .catch((err) => {
        setError(err.message)
      })
      .then(() => {
        setSignInValues({
          email: '',
          password: ''
        })
      })
  }

  return (
    <Section>
      <Header> Welcome</Header>
      <Form onSubmit={handleLogin} >
        <label for='email'>Email
        <input type='email' id='email' name='email' required value={signInValues.email} onChange={event => setSignInValues({ ...signInValues, email: event.target.value })} />
        </label>
        <label for='password'>Password
        <input type='password' id='password' name='password' required minLength='6' value={signInValues.password} onChange={event => setSignInValues({ ...signInValues, password: event.target.value })} />
        </label>

        <Button type='submit' title='Login' />

        <Text>New user? Sign up here. </Text>
        <Link to={'/signup'}>
          <Button title='Register' />
        </Link>
        {error && <p>{error}</p>}
      </Form>
    </Section >
  )
}