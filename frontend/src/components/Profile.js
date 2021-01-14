import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user } from '../reducers/user'

const URL = 'https://project-auth-cla-ellen.herokuapp.com/users'
const SECRET_URL = 'https://project-auth-cla-ellen.herokuapp.com/secrets'

export const Profile = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId =  useSelector((store) => store.user.login.userId)
  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  
  const loginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secret,
      })
    )
  }

  const loginFailed = (loginError) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginError
      })
    )
  }

  const logout = () => {
    dispatch(
      user.actions.setLogout({
      userId: 0,
      accessToken: null
      })
    )
  }

  const showSecret = (event) => {
    event.preventDefault()
    fetch(`${SECRET_URL}`, {
      method: "GET",
      headers: {Authorization: accessToken},
    })
    .then((res) => {
      if (!res.ok) {
        throw 'Profile failed'
      }
      return res.json()
    })
    .then((json) => loginSuccess(json))
    .catch((err) => loginFailed(err))
  }

  return (
    <div>
      <p>Welcome! here is your profile! click for secret</p>
      <p>{`${statusMessage}`}</p>
      <button type="submit" onClick={showSecret}>
        SECRET BUTTON
      </button>
      <button type="submit" onClick={logout}>
        Log out
      </button>
    </div>
  )
}