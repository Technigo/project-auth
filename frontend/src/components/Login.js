import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    if (accessToken) {
        history.push('/')
    }
}, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
    }
    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }


  return (
    <Form onSubmit={onFormSubmit}>
    <Title>Log in form </Title>
      <label htmlFor='loginEmail'>Email</label>
      <Input
        id='loginEmail'
        type=''
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='loginPassword'>Password</label>
      <Input
        id='loginPassword'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type='submit'
        onClick={() => setMode('signin')}>
        LOGIN
      </Button>
    </Form>
  )
}

export default Login

const Title = styled.h1`
  margin: 0px;
  padding: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #939b62;
  width: 20%;
  padding: 30px 25px;
  border-radius: 10px;
`

const Button = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  color: ;
  box-shadow: 0px 8px 15px rgba(100, 80, 18, 0.6);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
`