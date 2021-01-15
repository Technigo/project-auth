import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { user } from '../reducers/user'
import { Button } from '../lib/Button'
import giphy from '../img/confetti.gif'

// URL for the planned logout endpoint
// const URL = 'http://localhost:8081/users'

const Title = styled.h1`
  font-size: 55px;
  color: #85ad99;
`
const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400;
`

export const Secrets = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)

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
    <>
      <Title>
        Oh, hello!
      </Title>
      <Paragraph>
        Hooray! You&#39;ve reached the password protected page!
      </Paragraph>
      <img
        alt="confetti giphy"
        src={`${giphy}`} />
      <Button
        onClick={logout}>
        Logout
      </Button>
    </>
  )
}