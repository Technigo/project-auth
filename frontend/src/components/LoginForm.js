import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Button } from 'components/Button'

const Form = styled.form`
`
const Label = styled.label`
`
const LabelText = styled.p`
color: #F5F3F5;
`
const Input = styled.input`
`
const LoginFailed = styled.p`
`

export const LoginForm = ({ setUsername }) => {

  const history = useHistory()
  const [loginFailed, setLoginFailed] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const clearInputs = () => {
    setFormValues({
      email: '',
      password: ''
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    localStorage.removeItem('accessToken')

    fetch('http://localhost:8080/sessions', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status !== 200) {
          setLoginFailed(true)
          return
        }

        response.json().then(data => {
          if (data.notFound !== true) {
            localStorage.setItem('accessToken', data.accessToken)
            setUsername(data.name)
            clearInputs()
            setLoginFailed(false)
            history.push('/memevault')
          } else {
            setLoginFailed(true)
            clearInputs()
          }
        })
      })
      .catch(err => console.log('error:', err)
      )}
  

  return (
    <Form onSubmit={handleSubmit}>
      {loginFailed && <LoginFailed>Incorrect username or password</LoginFailed>}
      <Label>
        <LabelText>E-mail</LabelText>
        <Input
          onChange={e =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          value={formValues.email}
          type="email"
          placeholder="Enter a valid email adress"
          minLength="4"
          maxLength="50"
          required
        />
      </Label>

      <Label>
        <LabelText>Password</LabelText>
        <Input
          onChange={e =>
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