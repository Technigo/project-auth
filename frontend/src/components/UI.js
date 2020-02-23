import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'

export const BtnLogOut = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogOut = () => {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('userId')
    dispatch(auth.actions.logout())
    history.push('/')
  }

  return (
    <button type="button" onClick={handleLogOut}>Log Out</button>
  )
}