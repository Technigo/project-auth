import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login, signUp, user } from '../reducers/user'
import { Button } from './Button'
import { Profile } from './Profile'
import { Container, Wrapper, Form, Label, InputWrapper, ButtonWrapper, Title, Input, SubTitle } from '../lib/Card'


export const Login = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [submit, setSubmit] = useState(false)
  // console.log(submit)

  const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const accessToken = useSelector((store) => store.user.login.accessToken);
  console.log(accessToken)


  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(name, email, password))
    // dispatch(user.actions.setLoggedIn())
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    dispatch(signUp(name, email, password))
    //dispatch(user.actions.setLoggedIn())
    setName('')
    setEmail('')
    setPassword('')
  }

  const signBtn = true

  // const handleSubmit = event => {
  //   event.preventDefault()
  //   setSubmit(true)
  // }

  // const handleSubmit = () => {
  //   console.log('before')
  //   dispatch(user.actions.setLoggedIn())
  //   console.log('after')
  // }

  return (
    <Container>
      <Wrapper>
        {accessToken === null ? (
          <Form>
            <Title>Log in/Sign up</Title>
            <InputWrapper>
              <Label htmlFor="name">
                Name*
            </Label>
              <Input
                type="text"
                id="name"
                required
                minLength="2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="email">
                Email*
            </Label>
              <Input
                type="email"
                id="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="password">
                Password*
            </Label>
              <Input
                type="text"
                id="password"
                required
                minLength="8"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button
                signBtn={signBtn}
                type='submit'
                onClick={handleSignUp}
                text='Sign up'
                disabled={!name || !password || !email}
              />
              <Button
                signBtn={signBtn}
                type='submit'
                onClick={handleLogin}
                text='Log in'
                disabled={!name || !password || !email}
              />
            </ButtonWrapper>
            {errorMessage && <SubTitle>{errorMessage}</SubTitle>}
          </Form>
        ) : (
            <Profile />
          )}
      </Wrapper>
    </Container>
  )
}

//- A registration form.
// Your frontend should have a registration form which POSTs to the API to create a new user
//- A sign-in form.
