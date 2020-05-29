import React from 'react'
import { useHistory } from 'react-router'
import { Button } from 'components/Form'


export const LogOut = () => {
  const history = useHistory()

  const handleLogOut = event => {
    localStorage.clear()
    history.push('/')
  }
  return <Button onClick={()=> handleLogOut()}>Log out</Button>
  
}


