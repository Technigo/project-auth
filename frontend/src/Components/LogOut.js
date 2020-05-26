import React, { useState } from 'react'

export const LogOut = ({ loggedIn, setLoggedIn }) => {

  const handleLogOut = (event) => {
    event.preventDefault()
    localStorage.clear();
    setLoggedIn(false)
  }
  
  return (
    <>
      <button type="submit" onClick={(event) => handleLogOut(event)}> Log out </button>
      {loggedIn && <p>inloggad</p>}
    </>
  )
}