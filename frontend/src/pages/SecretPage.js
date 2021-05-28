import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

const SecretPage = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector(store => store.user.accessToken)

  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])

  const onButtonClick = () => {
    batch(()=> {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
    })
  }

  return (
    <Main>
      <Title>
        Welcome in!
      </Title>
      <lottie-player
        src='https://assets4.lottiefiles.com/private_files/lf30_Xtzj7X.json' 
        background='transparent'
        speed='1'
        style={{
          width: '300x',
          height: '300px'
        }}
        loop 
        autoplay
      >
      </lottie-player>
      <ButtonOne
        onClick={onButtonClick}
      >
        LOG OUT
      </ButtonOne>
    </Main>
  )
}

export default SecretPage

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 48px;
`
const ButtonOne = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: #B4D5F0;
  color: ;
  box-shadow: 0px 8px 15px rgba(12, 20, 80, 0.5);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`