import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { users } from '../reducers/user'
import { LinkButton } from './Button'
import { InputField } from './Input'
import swal from 'sweetalert'
import styled from 'styled-components/macro'

const fetch_URL = 'https://auth-narnia.herokuapp.com/login'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const history = useHistory()

  const handleLogin = event => {
    event.preventDefault()

    fetch(fetch_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          swal({
            text: 'Something went wrong',
            icon: "error",
            button: {
              text: 'Try again'
            },
          })
        } else {
          return res.json()
        }
      })
      .then(({ accessToken }) => {
        setEmail('')
        setPassword('')
        if (accessToken) {
          dispatch(users.actions.logIn())
          dispatch(users.actions.access(accessToken))
          history.push('/narnia')
        }
      })
      .catch(err => console.log("error:", err))
  }

  return (
    <FormContainer>
      <InputContent onSubmit={handleLogin}>
        <StyledLabel> Email:
        <InputField placeholder="hey@hey.com" type="email"
            value={email} onChange={event => setEmail(event.target.value)} />
        </StyledLabel>

        <StyledLabel> Password:
        <InputField placeholder="*****" type="password"
            value={password} onChange={event => setPassword(event.target.value)} />
        </StyledLabel>

        <LinkButton type="submit" title='Login' />
      </InputContent>
    </FormContainer>
  )
}

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: 60%;
  height: 500px;
`

const InputContent = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 12px;
`