import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { user, login } from '../reducers/user'
import { Headline } from '../lib/headline'
import { Button } from '../lib/button'
import { Form, InfoDiv, Input, Register, ProfileMessage } from '../lib/form'
import { useHistory, Link } from 'react-router-dom'

export const LogIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  // If user is logged in, show profile
  useEffect(() => {
    if (accessToken) {
      history.push('/secret')
      console.log('push successful')
    }
  })
  // clean up the error message from previous page
  useEffect(() => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  }, [dispatch])
  // To log in a user.
  const handleLogin = (event) => {
    event.preventDefault()
    //dispatch thunk
    dispatch(login(name, password))
    setName('')
    setPassword('')
  }

  if (!accessToken) {
    // If user is logged out, show login form
    return (
      <div>
        <Form onSubmit={(event) => handleLogin(event)}>
          <Headline title='Log in' />
          <InfoDiv>
            <Input
              placeholder='name'
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type='password'
              placeholder='password'
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {errorMessage && <ProfileMessage>{`${errorMessage}`}</ProfileMessage>}
            <Button type='submit' title='Log in' />
            <Register>Not a member?<Link to="/">Sign up</Link></Register>
          </InfoDiv>
        </Form>
      </div>
    )
  } else {
    return (null)
  }
}

export default LogIn