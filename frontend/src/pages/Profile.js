import React from 'react'
import { user } from '../reducers/user'
import { logout, getSecretMessage } from '../reducers/user'
import { Headline } from '../lib/headline'
import { TestButton } from '../lib/button'
import { ProfileMessage, ProfileDiv, ProfileInfo } from '../lib/form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const dispatch = useDispatch()
  const secretMessage = useSelector((store) => store.user.login.secretMessage)
  const userName = useSelector((store) => store.user.login.userName)

  return (
    <ProfileInfo>
      <Headline title='profile' />
      <ProfileDiv>
        {secretMessage && <ProfileMessage>{`${secretMessage}`}</ProfileMessage>}
        <ProfileMessage>Welcome {userName}!</ProfileMessage>
        <input type='submit' onClick={() => dispatch(getSecretMessage())} value='Show Secret' />
        <Link to='/login'><input type='submit' onClick={() => dispatch(logout())} value='Log Out' /></Link>
      </ProfileDiv>
    </ProfileInfo>
  )
}

export default Profile