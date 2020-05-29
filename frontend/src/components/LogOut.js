import React from 'react'
import { useHistory } from 'react-router'


export const LogOut = () => {
  const history = useHistory()

  const handleLogOut = event => {
    localStorage.clear()
    history.push('/')
  }
  return <button onClick={()=> handleLogOut()}>Log out</button>
  
}


