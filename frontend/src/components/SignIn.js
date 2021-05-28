import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusables/urls'

const SignInForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect (() => {
      if (accessToken) {
        history.push('/secret')
      }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL(status), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
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
    <Wrapper>
      <Header>Sign in</Header>
      <Form onSubmit={onFormSubmit}>
        <Input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
        />
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='•••••'
        />
        <Button type='submit' onClick={() => setStatus('signin')}>
          Sign in
        </Button>
      </Form>
      <SignUpText>Not a user yet? Create an account</SignUpText>
      <Button>
        <Link
          to='/signup'
          style={{ color: 'white', textDecoration: 'none'}}
        >
          Sign up
        </Link>
      </Button>
    </Wrapper>
  )
}

export default SignInForm

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;

  @media (min-width: 767px){
    width: 50%;
    margin-top: 35px;
  }

  @media (min-width: 1024px) {
    width: 500px;
  }
`
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
const Header = styled.h2`
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 40px;

  @media (min-width: 1024px) {
    font-size: 50px;
  }
`
const SignUpText = styled.h3`
  color: white;
  text-align: center;
`
const Input = styled.input`
  width: 100%;
  border-radius: 50px;
  outline: none;
  border: none;
  padding: 10px 20px;
  margin-bottom: 10px;

  @media (min-width: 767px){
  font-size: 17px;
}
`
const Button = styled.button`
  border-radius: 8px;
  background-color: #006cde;
  background-image: linear-gradient(90deg, #006cde 0%, #FC00FF 100%);
  padding: 10px 20px;
  border: solid #FFF 1.5px;
  border-radius: 50px;
  outline: none;
  width: 100%;
  color: #FFF;
  font-size: 17px;

  :hover {
    background-color: #FC00FF;
    background-image: linear-gradient(90deg, #FC00FF 0%, #006cde 100%);
  }

  :active {
    background-color: #006cde;
  }

  @media (min-width: 767px){
    font-size: 19px;
  }
`
