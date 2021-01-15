import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Status } from './Status'
import { user } from '../reducers/user'

// some kind of easter egg type reward for logging in
const URL = 'http://localhost:8080/users'

export const Secrets = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)

  const logoutSuccess = () => {
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Logged out' }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
  }

  const logoutFailed = (logoutError) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: logoutError }))
  }

  const logout = () => {
    fetch(`${URL}/logout`, {
      method: 'POST',
      headers: { Authorization: accessToken }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to logout')
        }
        return res.json()
      })
      .then((json) => logoutSuccess(json))
      .catch((err) => logoutFailed(err))
  }

  return (
    <section>
      <h2>SECRETS!</h2>
      <Status />
      {/* // some tests */}
      <h4>userId:</h4>
      <p> {`${userId}`}</p>
      <h4>accessToken:</h4>
      {/* <p> {`${accessToken}`}</p> */}
      {/* <input type="submit" onClick={getSecrets} value="Test Secret Endpoint" /> */}
      <input type="submit" onClick={logout} value="Test Logout" />
    </section>
  )
}