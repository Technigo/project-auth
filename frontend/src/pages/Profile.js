import React from 'react'
import { user } from '../reducers/user'
import { logout } from '../reducers/user'
import { Headline } from '../lib/headline'
import { InputButton, ProfileImg } from '../lib/button'
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
        {secretMessage && <ProfileMessage> {secretMessage} </ProfileMessage>}
        <ProfileMessage>Welcome {userName}!</ProfileMessage>
        <ProfileImg src='https://www.fillmurray.com/200/300' alt='profile picture' />
        {/* <InputButton type='submit' onClick={() => dispatch(getSecretMessage())} value='Setting' /> */}
        <Link to='/login'><InputButton type='submit' onClick={() => dispatch(logout())} value='Log Out' /></Link>
      </ProfileDiv>
    </ProfileInfo>
  )
}

export default Profile