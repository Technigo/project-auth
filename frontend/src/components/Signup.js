import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './Button'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

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

export const Signup = () => {
  const [signUpValues, setSignUpValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const history = useHistory()
  const url = 'https://anna-project-auth.herokuapp.com/users'

  // Creates new user
  const handleSignup = event => {
    event.preventDefault()
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(signUpValues),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not register new user. Please fill in a unique name and email.')
        }
        res.json().then(data => {
          if (data.notFound !== true) {
            history.push('/')
          }
        })
      })
      .catch((err) => {
        setError(err.message)
      })
      .then(() => {
        setSignUpValues({
          name: '',
          email: '',
          password: ''
        })
      })
  }

  return (
    <Section>
      <Header> Sign up below</Header>
      <Form onSubmit={handleSignup}>
        <label for='name'>Name
        <input type='text' id='name' name='name' required value={signUpValues.name} onChange={event => setSignUpValues({ ...signUpValues, name: event.target.value })} />
        </label>
        <label for='email'>Email
        <input type='email' id='email' name='email' required value={signUpValues.email} onChange={event => setSignUpValues({ ...signUpValues, email: event.target.value })} />
        </label>
        <label for='password'>Password
        <input type='password' id='password' name='password' required minLength='6' value={signUpValues.password} onChange={event => setSignUpValues({ ...signUpValues, password: event.target.value })} />
        </label>
        <Button type='submit' title='Register' />
        {error && <p>{error}</p>}
      </Form>
    </Section>
  )
}