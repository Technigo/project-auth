import React from 'react'
import { useHistory } from "react-router-dom"

export const LogOut = ({ setLoggedIn }) => {
  const history = useHistory()
  const handleLogOut = (event) => {
    localStorage.clear();
    setLoggedIn(false)
    history.push('/')
  }

  return (
    <>
      <button onClick={() => handleLogOut()}> Log out </button>
    </>
  )
}