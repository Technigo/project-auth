import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Notes } from './Notes'
import { Button } from '../styling/form'
import { user } from '../reducers/user'
import { ProfileSection } from '../styling/profile'

export const Profile = () => {
  const dispatch = useDispatch()
  const userId = useSelector((store) => store.user.login.userId)
  const loggedIn = useSelector((store) => store.user.login.loggedIn)
  const accessToken = useSelector((store) => store.user.login.accessToken)

  const logout = () => {
    dispatch(user.actions.logout())
    dispatch(user.actions.toggleLoggedState(false))
  }

  if (!accessToken) {
    return <div>Please log in</div>
  }

  return (
    <ProfileSection>
      <div>
        <h2>Profile:</h2>
        <h4>userId:</h4>
        <p> {`${userId}`}</p>
      </div>
      <Button 
        type="submit" 
        onClick={logout}
      >
        Logout
      </Button>
      <Notes />
    </ProfileSection>
  )
}
export default Profile