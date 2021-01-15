import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSecretMessage, logout } from '../reducers/user'

import { CustomButton } from './CustomButton'
import { Title, ButtonWrapper, SubTitle } from '../styles/Style'

export const Profile = () => {
  const userName = useSelector(store => store.user.login.userName)
  const secretMessage = useSelector(store => store.user.login.secretMessage)
  const dispatch = useDispatch()

  return (
    <>
      <Title>{userName}, welcome</Title>
      {secretMessage ? <SubTitle>{secretMessage}</SubTitle> : ""}
      <ButtonWrapper>
        <CustomButton
          variant="contained"
          type="submit"
          onClick={() => dispatch(getSecretMessage())}
          text="Reveal secret"
        />
        <CustomButton
          variant="contained"
          type="submit"
          onClick={() => dispatch(logout())}
          text="Log out"
        />
      </ButtonWrapper>
    </>
  )
}