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
const GoToText = styled.p`
  font-size: 16px;
  font-style: oblique;
  color: #f5f3f5;
`

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const GoToButton = styled.button`
  display: flex;
  height: 20px;
  width: 100px;
  margin-left: 15px;
  background: #576ca8;
  font-size: 12px;
  font-style: oblique;
  &:hover {
    background: #274690;
    cursor: pointer;
    transition: 0.7s;
  }
  &:focus {
    border: 3px solid #f5f3f5;
  }
`

export const LoginForm = ({ setUsername }) => {
  const history = useHistory()
  const [loginFailed, setLoginFailed] = useState(false)
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  })

  const handleClick = () => {
    history.push('/')
  }

  const clearInputs = () => {
    setFormValues({
      username: '',
      password: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.removeItem('accessToken')

    fetch('https://new-project-auth.herokuapp.com/sessions', {
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
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        {loginFailed && (
          <LoginFailed>Incorrect username or password</LoginFailed>
        )}
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
      <Wrapper>
        <GoToText>Don't have an account yet?</GoToText>

        <GoToButton type="button" title="go to Sign up" onClick={handleClick}>
          Go to Sign up
        </GoToButton>
      </Wrapper>
    </Wrapper>
  )
}
