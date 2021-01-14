import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSecretMessage, logout } from '../reducers/user'

import { CustomButton } from './CustomButton'
import { Title, ButtonWrapper, SubTitle } from '../styles/Style'

export const Profile = () => {
  //const [showMessage, setShowMessage] = useState(false)
  const userName = useSelector(store => store.user.login.userName)
  const secretMessage = useSelector(store => store.user.login.secretMessage)
  console.log(secretMessage)
  const dispatch = useDispatch()

  //______FÖRSVINNER INTE NÄR DEN ÄR TRUE, varför?
  // const toggleSecretMessage = () => {
  //     dispatch(getSecretMessage())
  //     //dispatch(user.actions.hideSecretMessage())
  //     //setShowMessage(false)
  //     dispatch(getSecretMessage(user.actions.setSecretMessage(null)))
  //     setShowMessage(!showMessage)
  // }
  
  // console.log(showMessage)
  

  return (
    <>
      <Title>{userName}, welcome</Title>
      {secretMessage ? <SubTitle>{secretMessage}</SubTitle> : ""}
      <ButtonWrapper>
        <CustomButton
          variant="contained"
          type='submit'
          onClick={() => dispatch(getSecretMessage())}
          //onClick={() => toggleSecretMessage()}
          text={!secretMessage ? 'Reveal secret' : 'Hide secret'}
        />
        <CustomButton
          variant="contained"
          type='submit'
          onClick={() => dispatch(logout())}
          text='Log out'
        />
      </ButtonWrapper>
    </>
  )
}