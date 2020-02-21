import React from 'react'
import { useHistory } from 'react-router-dom'

export const BtnLogOut = () => {
  const history = useHistory()

  const handleLogOut = () => {
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("userId")
    history.push("/login")
  }

  return (
    <button type="button" onClick={handleLogOut}>Log Out</button>
  )
}