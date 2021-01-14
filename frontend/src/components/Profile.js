import React from 'react'
import { useSelector } from 'react-redux'
import { Notes } from './Notes'
import { Button } from '../styling/form'

export const Profile = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)

  const logout = () => {}

  if (!accessToken) {
    return <></>
  }

  return (
    <section>
      <h2>Profile:</h2>
      <h4>userId:</h4>
      <p> {`${userId}`}</p>
      <h4>accessToken:</h4>
      <p> {`${accessToken}`}</p>
      <Notes />
      <Button 
        type="submit" 
        onClick={logout}
      >
        Logout
      </Button>

    </section>
  )
}
export default Profile