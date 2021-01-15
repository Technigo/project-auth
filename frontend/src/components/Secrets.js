import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Status } from './Status'
import { user } from '../reducers/user'
import { Button } from '../lib/Button'

// URL for the planned logout endpoint
// const URL = 'http://localhost:8081/users'

export const Secrets = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  
  // FUNCTIONS TO HANDLE LOGIN SUCCESS OR FAILURE WHEN USING THE LOGOUT ENDPOINT
  // const logoutSuccess = () => {
  //   dispatch(user.actions.setStatusMessage({ statusMessage: 'Logged out' }))
  //   dispatch(user.actions.setAccessToken({ accessToken: null }))
  //   dispatch(user.actions.setUserId({ userId: 0 }))
  //   // window.location.reload()
  // }

  // const logoutFailed = (logoutError) => {
  //   dispatch(user.actions.setStatusMessage({ statusMessage: logoutError }))
  // }

  const logout = () => {
    // FETCH TO THE PLANNED LOGOUT ENDPOINT
    // fetch(`${URL}/logout`, {
    //   method: 'POST',
    //   headers: { Authorization: accessToken }
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error('Failed to logout')
    //     }
    //     return res.json()
    //   })
    //   .then((json) => logoutSuccess(json))
    //   .catch((err) => logoutFailed(err))

    // FRONTEND-ONLY SOLUTION FOR LOGOUT
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Logged out' }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserId({ userId: 0 }))
  }

  if (!accessToken) {
    return <></>
  }

  return (
    <section>
      <h2>SECRETS!</h2>
      <Status />
      <h4>userId:</h4>
      <p> {`${userId}`}</p>
      <Button onClick={logout}>
        Logout
      </Button>
    </section>
  )
}