import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { useHistory } from 'react-router-dom'

const Form = styled.form`
  margin: 15px;
`

const Label = styled.label`
  margin: 10px;
`

const Text = styled.p`
  color: #f5f3f5;
`

const GoToText = styled.p`
  font-size: 16px;
  font-style: oblique;
  color: #f5f3f5;
`

const Input = styled.input`
  border: 2px solid #576ca8;
  padding: 3px;
  font-style: italic;
`
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

export const SignUpForm = () => {
  const history = useHistory()
  const [signUpValues, setsignUpValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleClick = () => {
    history.push('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://new-project-auth.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(signUpValues),
      headers: { 'content-type': 'application/json' }
    }).then(() => {
      console.table(signUpValues)
      window.alert(`Registry complete, welcome ${signUpValues.username}!`)
      setsignUpValues({
        username: '',
        email: '',
        password: ''
      })
    })
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Label>
          <Text>Username</Text>
          <Input
            onChange={(e) =>
              setsignUpValues({ ...signUpValues, username: e.target.value })
            }
            value={signUpValues.username}
            type="text"
            placeholder="enter username"
            minLength="2"
            maxLength="20"
            required
          />
        </Label>
        <Label>
          <Text>Email</Text>
          <Input
            onChange={(e) =>
              setsignUpValues({ ...signUpValues, email: e.target.value })
            }
            value={signUpValues.email}
            type="email"
            placeholder="enter email"
            minLength="2"
            maxLength="20"
            required
          />
        </Label>
        <Label>
          <Text>Password</Text>
          <Input
            onChange={(e) =>
              setsignUpValues({ ...signUpValues, password: e.target.value })
            }
            value={signUpValues.password}
            type="password"
            placeholder="min 5 characters"
            minLength="5"
            maxLength="20"
            required
          />
        </Label>
        <Button type="submit" title="Sign-up" />
      </Form>
      <Wrapper>
        <GoToText>Already have an account?</GoToText>
        <GoToButton type="button" title="go to Login" onClick={handleClick}>
          Go to Login
        </GoToButton>
      </Wrapper>
    </Wrapper>
  )
}
