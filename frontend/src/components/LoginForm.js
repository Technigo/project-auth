import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'components/Button'

const Form = styled.form`
  margin: 15px;
`
const Label = styled.label`
  margin: 10px;
`
const Text = styled.p`
  color: #f5f3f5;
`
const Input = styled.input`
  border: 2px solid #576ca8;
  padding: 3px;
  font-style: italic;
`
const LoginFailed = styled.p`
  padding-top: 25px;
  font-weight: 700;
  font-style: italic;
  color: red;
`

export const LoginForm = ({ setUsername }) => {
  const history = useHistory()
  const [loginFailed, setLoginFailed] = useState(false)
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  })

  const clearInputs = () => {
    setFormValues({
      username: '',
      password: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.removeItem('accessToken')

    fetch('http://localhost:8080/sessions', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (response.status !== 200) {
          setLoginFailed(true)
          return
        }

        response.json().then((data) => {
          if (data.notFound !== true) {
            localStorage.setItem('accessToken', data.accessToken)
            setUsername(data.username)
            clearInputs()
            setLoginFailed(false)
            history.push('/memevault')
          } else {
            setLoginFailed(true)
            clearInputs()
          }
        })
      })
      .catch((err) => console.log('error:', err))
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loginFailed && <LoginFailed>Incorrect username or password</LoginFailed>}
      <Label>
        <Text>Username</Text>
        <Input
          onChange={(e) =>
            setFormValues({ ...formValues, username: e.target.value })
          }
          value={formValues.username}
          type="text"
          placeholder="enter username"
          minLength="2"
          maxLength="50"
          required
        />
      </Label>

      <Label>
        <Text>Password</Text>
        <Input
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          value={formValues.password}
          type="password"
          placeholder="**********"
          required
        />
      </Label>
      <Button type="submit" title="Login" />
    </Form>
  )
}
